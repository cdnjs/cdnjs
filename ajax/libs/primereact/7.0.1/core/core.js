this.primereact = this.primereact || {};
this.primereact.utils = (function (exports, React) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

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

  function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _unsupportedIterableToArray$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
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

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
          var width = el.offsetWidth || el.getBoundingClientRect().width;

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
          var height = el.offsetHeight || el.getBoundingClientRect().height;

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
      key: "getClientWidth",
      value: function getClientWidth(el, margin) {
        if (el) {
          var width = el.clientWidth;

          if (margin) {
            var style = getComputedStyle(el);
            width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
          }

          return width;
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
      key: "removeMultipleClasses",
      value: function removeMultipleClasses(element, className) {
        if (element && className) {
          if (element.classList) {
            var styles = className.split(' ');

            for (var i = 0; i < styles.length; i++) {
              element.classList.remove(styles[i]);
            }
          } else {
            var _styles2 = className.split(' ');

            for (var _i2 = 0; _i2 < _styles2.length; _i2++) {
              element.className = element.className.replace(new RegExp('(^|\\b)' + _styles2[_i2].split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
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
        var calculateMinWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

        if (overlay && target) {
          if (appendTo === 'self') {
            this.relativePosition(overlay, target);
          } else {
            calculateMinWidth && (overlay.style.minWidth = DomHandler.getOuterWidth(target) + 'px');
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
            var styleDeclaration = node ? getComputedStyle(node) : null;
            return styleDeclaration && (overflowRegex.test(styleDeclaration.getPropertyValue('overflow')) || overflowRegex.test(styleDeclaration.getPropertyValue('overflowX')) || overflowRegex.test(styleDeclaration.getPropertyValue('overflowY')));
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
      key: "isExist",
      value: function isExist(element) {
        return element !== null && typeof element !== 'undefined' && element.nodeName;
      }
    }, {
      key: "getFocusableElements",
      value: function getFocusableElements(element) {
        var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var focusableElements = DomHandler.find(element, "button:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])".concat(selector, ",\n                [href][clientHeight][clientWidth]:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                input:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                select:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                textarea:not([tabindex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                [tabIndex]:not([tabIndex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector, ",\n                [contenteditable]:not([tabIndex = \"-1\"]):not([disabled]):not([style*=\"display:none\"]):not([hidden])").concat(selector));
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
      value: function getFirstFocusableElement(element, selector) {
        var focusableElements = DomHandler.getFocusableElements(element, selector);
        return focusableElements.length > 0 ? focusableElements[0] : null;
      }
    }, {
      key: "getLastFocusableElement",
      value: function getLastFocusableElement(element, selector) {
        var focusableElements = DomHandler.getFocusableElements(element, selector);
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
    }, {
      key: "invokeElementMethod",
      value: function invokeElementMethod(element, methodName, args) {
        element[methodName].apply(element, args);
      }
    }, {
      key: "isClickable",
      value: function isClickable(element) {
        var targetNode = element.nodeName;
        var parentNode = element.parentElement && element.parentElement.nodeName;
        return targetNode === 'INPUT' || targetNode === 'TEXTAREA' || targetNode === 'BUTTON' || targetNode === 'A' || parentNode === 'INPUT' || parentNode === 'TEXTAREA' || parentNode === 'BUTTON' || parentNode === 'A' || this.hasClass(element, 'p-button') || this.hasClass(element.parentElement, 'p-button') || this.hasClass(element.parentElement, 'p-checkbox') || this.hasClass(element.parentElement, 'p-radiobutton');
      }
    }, {
      key: "applyStyle",
      value: function applyStyle(element, style) {
        if (typeof style === 'string') {
          element.style.cssText = this.style;
        } else {
          for (var prop in this.style) {
            element.style[prop] = style[prop];
          }
        }
      }
    }, {
      key: "exportCSV",
      value: function exportCSV(csv, filename) {
        var blob = new Blob([csv], {
          type: 'application/csv;charset=utf-8;'
        });

        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveOrOpenBlob(blob, filename + '.csv');
        } else {
          var link = document.createElement("a");

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

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
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
    options = _objectSpread$1(_objectSpread$1({}, defaultOptions), options);
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
      key: "getPropValue",
      value: function getPropValue(obj) {
        for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          params[_key2 - 1] = arguments[_key2];
        }

        return this.isFunction(obj) ? obj.apply(void 0, params) : obj;
      }
    }, {
      key: "getRefElement",
      value: function getRefElement(ref) {
        if (ref) {
          return _typeof(ref) === 'object' && ref.hasOwnProperty('current') ? ref.current : ref;
        }

        return null;
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
        return value === null || value === undefined || value === '' || Array.isArray(value) && value.length === 0 || !(value instanceof Date) && _typeof(value) === 'object' && Object.keys(value).length === 0;
      }
    }, {
      key: "isNotEmpty",
      value: function isNotEmpty(value) {
        return !this.isEmpty(value);
      }
    }]);

    return ObjectUtils;
  }();

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  var IconUtils = /*#__PURE__*/function () {
    function IconUtils() {
      _classCallCheck(this, IconUtils);
    }

    _createClass(IconUtils, null, [{
      key: "getJSXIcon",
      value: function getJSXIcon(icon, iconProps, options) {
        var content = null;

        if (icon) {
          var iconType = _typeof(icon);

          var className = classNames(iconProps.className, iconType === 'string' && icon);
          content = /*#__PURE__*/React__default["default"].createElement("span", _extends({}, iconProps, {
            className: className
          }));

          if (iconType !== 'string') {
            var defaultContentOptions = _objectSpread({
              iconProps: iconProps,
              element: content
            }, options);

            return ObjectUtils.getJSXElement(icon, defaultContentOptions);
          }
        }

        return content;
      }
    }]);

    return IconUtils;
  }();

  var lastId = 0;
  function UniqueComponentId () {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'pr_id_';
    lastId++;
    return "".concat(prefix).concat(lastId);
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
  }

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
      set: function set(key, el, autoZIndex, baseZIndex) {
        if (el) {
          el.style.zIndex = String(generateZIndex(key, autoZIndex, baseZIndex));
        }
      },
      clear: function clear(el) {
        if (el) {
          revertZIndex(ZIndexUtils.get(el));
          el.style.zIndex = '';
        }
      },
      getCurrent: function getCurrent(key, autoZIndex) {
        return getCurrentZIndex(key, autoZIndex);
      }
    };
  }

  var ZIndexUtils = handler();

  exports.ConnectedOverlayScrollHandler = ConnectedOverlayScrollHandler;
  exports.DomHandler = DomHandler;
  exports.EventBus = EventBus;
  exports.IconUtils = IconUtils;
  exports.ObjectUtils = ObjectUtils;
  exports.UniqueComponentId = UniqueComponentId;
  exports.ZIndexUtils = ZIndexUtils;
  exports.classNames = classNames;
  exports.mask = mask;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React);

this.primereact = this.primereact || {};
this.primereact.api = (function (exports, utils) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

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

  var FilterMatchMode = Object.freeze({
    STARTS_WITH: 'startsWith',
    CONTAINS: 'contains',
    NOT_CONTAINS: 'notContains',
    ENDS_WITH: 'endsWith',
    EQUALS: 'equals',
    NOT_EQUALS: 'notEquals',
    IN: 'in',
    LESS_THAN: 'lt',
    LESS_THAN_OR_EQUAL_TO: 'lte',
    GREATER_THAN: 'gt',
    GREATER_THAN_OR_EQUAL_TO: 'gte',
    BETWEEN: 'between',
    DATE_IS: 'dateIs',
    DATE_IS_NOT: 'dateIsNot',
    DATE_BEFORE: 'dateBefore',
    DATE_AFTER: 'dateAfter',
    CUSTOM: 'custom'
  });

  var PrimeReact = function PrimeReact() {
    _classCallCheck(this, PrimeReact);
  };

  _defineProperty(PrimeReact, "ripple", false);

  _defineProperty(PrimeReact, "inputStyle", 'outlined');

  _defineProperty(PrimeReact, "locale", 'en');

  _defineProperty(PrimeReact, "appendTo", null);

  _defineProperty(PrimeReact, "autoZIndex", true);

  _defineProperty(PrimeReact, "zIndex", {
    modal: 1100,
    overlay: 1000,
    menu: 1000,
    tooltip: 1100,
    toast: 1200
  });

  _defineProperty(PrimeReact, "filterMatchModeOptions", {
    text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
    numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
    date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
  });

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  var locales = {
    'en': {
      startsWith: 'Starts with',
      contains: 'Contains',
      notContains: 'Not contains',
      endsWith: 'Ends with',
      equals: 'Equals',
      notEquals: 'Not equals',
      noFilter: 'No Filter',
      lt: 'Less than',
      lte: 'Less than or equal to',
      gt: 'Greater than',
      gte: 'Greater than or equal to',
      dateIs: 'Date is',
      dateIsNot: 'Date is not',
      dateBefore: 'Date is before',
      dateAfter: 'Date is after',
      custom: 'Custom',
      clear: 'Clear',
      apply: 'Apply',
      matchAll: 'Match All',
      matchAny: 'Match Any',
      addRule: 'Add Rule',
      removeRule: 'Remove Rule',
      accept: 'Yes',
      reject: 'No',
      choose: 'Choose',
      upload: 'Upload',
      cancel: 'Cancel',
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      today: 'Today',
      weekHeader: 'Wk',
      firstDayOfWeek: 0,
      dateFormat: 'mm/dd/yy',
      weak: 'Weak',
      medium: 'Medium',
      strong: 'Strong',
      passwordPrompt: 'Enter a password',
      emptyFilterMessage: 'No results found',
      emptyMessage: 'No available options'
    }
  };

  function locale(locale) {
    locale && (PrimeReact.locale = locale);
    return {
      locale: PrimeReact.locale,
      options: locales[PrimeReact.locale]
    };
  }

  function addLocale(locale, options) {
    locales[locale] = _objectSpread(_objectSpread({}, locales['en']), options);
  }

  function updateLocaleOption(key, value, locale) {
    localeOptions(locale)[key] = value;
  }

  function updateLocaleOptions(options, locale) {
    var _locale = locale || PrimeReact.locale;

    locales[_locale] = _objectSpread(_objectSpread({}, locales[_locale]), options);
  }

  function localeOption(key, locale) {
    var _locale = locale || PrimeReact.locale;

    try {
      return localeOptions(_locale)[key];
    } catch (error) {
      throw new Error("The ".concat(key, " option is not found in the current locale('").concat(_locale, "')."));
    }
  }

  function localeOptions(locale) {
    var _locale = locale || PrimeReact.locale;

    return locales[_locale];
  }

  var PrimeIcons = Object.freeze({
    ALIGN_CENTER: 'pi pi-align-center',
    ALIGN_JUSTIFY: 'pi pi-align-justify',
    ALIGN_LEFT: 'pi pi-align-left',
    ALIGN_RIGHT: 'pi pi-align-right',
    AMAZON: 'pi pi-amazon',
    ANDROID: 'pi pi-android',
    ANGLE_DOUBLE_DOWN: 'pi pi-angle-double-down',
    ANGLE_DOUBLE_LEFT: 'pi pi-angle-double-left',
    ANGLE_DOUBLE_RIGHT: 'pi pi-angle-double-right',
    ANGLE_DOUBLE_UP: 'pi pi-angle-double-up',
    ANGLE_DOWN: 'pi pi-angle-down',
    ANGLE_LEFT: 'pi pi-angle-left',
    ANGLE_RIGHT: 'pi pi-angle-right',
    ANGLE_UP: 'pi pi-angle-up',
    APPLE: 'pi pi-apple',
    ARROW_CIRCLE_DOWN: 'pi pi-arrow-circle-down',
    ARROW_CIRCLE_LEFT: 'pi pi-arrow-circle-left',
    ARROW_CIRCLE_RIGHT: 'pi pi-arrow-circle-right',
    ARROW_CIRCLE_UP: 'pi pi-arrow-circle-up',
    ARROW_DOWN: 'pi pi-arrow-down',
    ARROW_DOWN_LEFT: 'pi pi-arrow-down-left',
    ARROW_DOWN_RIGHT: 'pi pi-arrow-down-right',
    ARROW_LEFT: 'pi pi-arrow-left',
    ARROW_RIGHT: 'pi pi-arrow-right',
    ARROW_UP: 'pi pi-arrow-up',
    ARROW_UP_LEFT: 'pi pi-arrow-up-left',
    ARROW_UP_RIGHT: 'pi pi-arrow-up-right',
    ARROW_H: 'pi pi-arrow-h',
    ARROW_V: 'pi pi-arrow-v',
    AT: 'pi pi-at',
    BACKWARD: 'pi pi-backward',
    BAN: 'pi pi-ban',
    BARS: 'pi pi-bars',
    BELL: 'pi pi-bell',
    BOLT: 'pi pi-bolt',
    BOOK: 'pi pi-book',
    BOOKMARK: 'pi pi-bookmark',
    BOOKMARK_FILL: 'pi pi-bookmark-fill',
    BOX: 'pi pi-box',
    BRIEFCASE: 'pi pi-briefcase',
    BUILDING: 'pi pi-building',
    CALENDAR: 'pi pi-calendar',
    CALENDAR_MINUS: 'pi pi-calendar-minus',
    CALENDAR_PLUS: 'pi pi-calendar-plus',
    CALENDAR_TIMES: 'pi pi-calendar-times',
    CAMERA: 'pi pi-camera',
    CAR: 'pi pi-car',
    CARET_DOWN: 'pi pi-caret-down',
    CARET_LEFT: 'pi pi-caret-left',
    CARET_RIGHT: 'pi pi-caret-right',
    CARET_UP: 'pi pi-caret-up',
    CHART_BAR: 'pi pi-chart-bar',
    CHART_LINE: 'pi pi-chart-line',
    CHART_PIE: 'pi pi-chart-pie',
    CHECK: 'pi pi-check',
    CHECK_CIRCLE: 'pi pi-check-circle',
    CHECK_SQUARE: 'pi pi-check-square',
    CHEVRON_CIRCLE_DOWN: 'pi pi-chevron-circle-down',
    CHEVRON_CIRCLE_LEFT: 'pi pi-chevron-circle-left',
    CHEVRON_CIRCLE_RIGHT: 'pi pi-chevron-circle-right',
    CHEVRON_CIRCLE_UP: 'pi pi-chevron-circle-up',
    CHEVRON_DOWN: 'pi pi-chevron-down',
    CHEVRON_LEFT: 'pi pi-chevron-left',
    CHEVRON_RIGHT: 'pi pi-chevron-right',
    CHEVRON_UP: 'pi pi-chevron-up',
    CIRCLE: 'pi pi-circle',
    CIRCLE_FILL: 'pi pi-circle-fill',
    CLOCK: 'pi pi-clock',
    CLONE: 'pi pi-clone',
    CLOUD: 'pi pi-cloud',
    CLOUD_DOWNLOAD: 'pi pi-cloud-download',
    CLOUD_UPLOAD: 'pi pi-cloud-upload',
    CODE: 'pi pi-code',
    COG: 'pi pi-cog',
    COMMENT: 'pi pi-comment',
    COMMENTS: 'pi pi-comments',
    COMPASS: 'pi pi-compass',
    COPY: 'pi pi-copy',
    CREDIT_CARD: 'pi pi-credit-card',
    DATABASE: 'pi pi-database',
    DESKTOP: 'pi pi-desktop',
    DIRECTIONS: 'pi pi-directions',
    DIRECTIONS_ALT: 'pi pi-directions-alt',
    DISCORD: 'pi pi-discord',
    DOLLAR: 'pi pi-dollar',
    DOWNLOAD: 'pi pi-download',
    EJECT: 'pi pi-eject',
    ELLIPSIS_H: 'pi pi-ellipsis-h',
    ELLIPSIS_V: 'pi pi-ellipsis-v',
    ENVELOPE: 'pi pi-envelope',
    EURO: 'pi pi-euro',
    EXCLAMATION_CIRCLE: 'pi pi-exclamation-circle',
    EXCLAMATION_TRIANGLE: 'pi pi-exclamation-triangle',
    EXTERNAL_LINK: 'pi pi-external-link',
    EYE: 'pi pi-eye',
    EYE_SLASH: 'pi pi-eye-slash',
    FACEBOOK: 'pi pi-facebook',
    FAST_BACKWARD: 'pi pi-fast-backward',
    FAST_FORWARD: 'pi pi-fast-forward',
    FILE: 'pi pi-file',
    FILE_EXCEL: 'pi pi-file-excel',
    FILE_PDF: 'pi pi-file-pdf',
    FILTER: 'pi pi-filter',
    FILTER_FILL: 'pi pi-filter-fill',
    FILTER_SLASH: 'pi pi-filter-slash',
    FLAG: 'pi pi-flag',
    FLAG_FILL: 'pi pi-flag-fill',
    FOLDER: 'pi pi-folder',
    FOLDER_OPEN: 'pi pi-folder-open',
    FORWARD: 'pi pi-forward',
    GITHUB: 'pi pi-github',
    GLOBE: 'pi pi-globe',
    GOOGLE: 'pi pi-google',
    HASHTAG: 'pi pi-hashtag',
    HEART: 'pi pi-heart',
    HEART_FILL: 'pi pi-heart-fill',
    HISTORY: 'pi pi-history',
    HOME: 'pi pi-home',
    ID_CARD: 'pi pi-id-card',
    IMAGE: 'pi pi-image',
    IMAGES: 'pi pi-images',
    INBOX: 'pi pi-inbox',
    INFO: 'pi pi-info',
    INFO_CIRCLE: 'pi pi-info-circle',
    INSTAGRAM: 'pi pi-instagram',
    KEY: 'pi pi-key',
    LINK: 'pi pi-link',
    LINKEDIN: 'pi pi-linkedin',
    LIST: 'pi pi-list',
    LOCK: 'pi pi-lock',
    LOCK_OPEN: 'pi pi-lock-open',
    MAP: 'pi pi-map',
    MAP_MARKER: 'pi pi-map-marker',
    MICROSOFT: 'pi pi-microsoft',
    MINUS: 'pi pi-minus',
    MINUS_CIRCLE: 'pi pi-minus-circle',
    MOBILE: 'pi pi-mobile',
    MONEY_BILL: 'pi pi-money-bill',
    MOON: 'pi pi-moon',
    PALETTE: 'pi pi-palette',
    PAPERCLIP: 'pi pi-paperclip',
    PAUSE: 'pi pi-pause',
    PAYPAL: 'pi pi-paypal',
    PENCIL: 'pi pi-pencil',
    PERCENTAGE: 'pi pi-percentage',
    PHONE: 'pi pi-phone',
    PLAY: 'pi pi-play',
    PLUS: 'pi pi-plus',
    PLUS_CIRCLE: 'pi pi-plus-circle',
    POUND: 'pi pi-pound',
    POWER_OFF: 'pi pi-power-off',
    PRIME: 'pi pi-prime',
    PRINT: 'pi pi-print',
    QRCODE: 'pi pi-qrcode',
    QUESTION: 'pi pi-question',
    QUESTION_CIRCLE: 'pi pi-question-circle',
    REDDIT: 'pi pi-reddit',
    REFRESH: 'pi pi-refresh',
    REPLAY: 'pi pi-replay',
    REPLY: 'pi pi-reply',
    SAVE: 'pi pi-save',
    SEARCH: 'pi pi-search',
    SEARCH_MINUS: 'pi pi-search-minus',
    SEARCH_PLUS: 'pi pi-search-plus',
    SEND: 'pi pi-send',
    SERVER: 'pi pi-server',
    SHARE_ALT: 'pi pi-share-alt',
    SHIELD: 'pi pi-shield',
    SHOPPING_BAG: 'pi pi-shopping-bag',
    SHOPPING_CART: 'pi pi-shopping-cart',
    SIGN_IN: 'pi pi-sign-in',
    SIGN_OUT: 'pi pi-sign-out',
    SITEMAP: 'pi pi-sitemap',
    SLACK: 'pi pi-slack',
    SLIDERS_H: 'pi pi-sliders-h',
    SLIDERS_V: 'pi pi-sliders-v',
    SORT: 'pi pi-sort',
    SORT_ALPHA_DOWN: 'pi pi-sort-alpha-down',
    SORT_ALPHA_ALT_DOWN: 'pi pi-sort-alpha-alt-down',
    SORT_ALPHA_UP: 'pi pi-sort-alpha-up',
    SORT_ALPHA_ALT_UP: 'pi pi-sort-alpha-alt-up',
    SORT_ALT: 'pi pi-sort-alt',
    SORT_ALT_SLASH: 'pi pi-sort-slash',
    SORT_AMOUNT_DOWN: 'pi pi-sort-amount-down',
    SORT_AMOUNT_DOWN_ALT: 'pi pi-sort-amount-down-alt',
    SORT_AMOUNT_UP: 'pi pi-sort-amount-up',
    SORT_AMOUNT_UP_ALT: 'pi pi-sort-amount-up-alt',
    SORT_DOWN: 'pi pi-sort-down',
    SORT_NUMERIC_DOWN: 'pi pi-sort-numeric-down',
    SORT_NUMERIC_ALT_DOWN: 'pi pi-sort-numeric-alt-down',
    SORT_NUMERIC_UP: 'pi pi-sort-numeric-up',
    SORT_NUMERIC_ALT_UP: 'pi pi-sort-numeric-alt-up',
    SORT_UP: 'pi pi-sort-up',
    SPINNER: 'pi pi-spinner',
    STAR: 'pi pi-star',
    STAR_FILL: 'pi pi-star-fill',
    STEP_BACKWARD: 'pi pi-step-backward',
    STEP_BACKWARD_ALT: 'pi pi-step-backward-alt',
    STEP_FORWARD: 'pi pi-step-forward',
    STEP_FORWARD_ALT: 'pi pi-step-forward-alt',
    STOP: 'pi pi-stop',
    STOP_CIRCLE: 'pi pi-stop-circle',
    SUN: 'pi pi-sun',
    SYNC: 'pi pi-sync',
    TABLE: 'pi pi-table',
    TABLET: 'pi pi-tablet',
    TAG: 'pi pi-tag',
    TAGS: 'pi pi-tags',
    TELEGRAM: 'pi pi-telegram',
    TH_LARGE: 'pi pi-th-large',
    THUMBS_DOWN: 'pi pi-thumbs-down',
    THUMBS_UP: 'pi pi-thumbs-up',
    TICKET: 'pi pi-ticket',
    TIMES: 'pi pi-times',
    TIMES_CIRCLE: 'pi pi-times-circle',
    TRASH: 'pi pi-trash',
    TWITTER: 'pi pi-twitter',
    UNDO: 'pi pi-undo',
    UNLOCK: 'pi pi-unlock',
    UPLOAD: 'pi pi-upload',
    USER: 'pi pi-user',
    USER_EDIT: 'pi pi-user-edit',
    USER_MINUS: 'pi pi-user-minus',
    USER_PLUS: 'pi pi-user-plus',
    USERS: 'pi pi-users',
    VIDEO: 'pi pi-video',
    VIMEO: 'pi pi-vimeo',
    VOLUME_DOWN: 'pi pi-volume-down',
    VOLUME_OFF: 'pi pi-volume-off',
    VOLUME_UP: 'pi pi-volume-up',
    WALLET: 'pi pi-wallet',
    WHATSAPP: 'pi pi-whatsapp',
    WIFI: 'pi pi-wifi',
    WINDOW_MAXIMIZE: 'pi pi-window-maximize',
    WINDOW_MINIMIZE: 'pi pi-window-minimize',
    YOUTUBE: 'pi pi-youtube'
  });

  var MessageSeverity = Object.freeze({
    SUCCESS: 'success',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error'
  });

  var FilterOperator = Object.freeze({
    AND: 'and',
    OR: 'or'
  });

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  var FilterService = {
    filter: function filter(value, fields, filterValue, filterMatchMode, filterLocale) {
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
                var fieldValue = utils.ObjectUtils.resolveFieldData(item, field);

                if (this.filters[filterMatchMode](fieldValue, filterValue, filterLocale)) {
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
    filters: {
      startsWith: function startsWith(value, filter, filterLocale) {
        if (filter === undefined || filter === null || filter.trim() === '') {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        var filterValue = utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
        var stringValue = utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
        return stringValue.slice(0, filterValue.length) === filterValue;
      },
      contains: function contains(value, filter, filterLocale) {
        if (filter === undefined || filter === null || typeof filter === 'string' && filter.trim() === '') {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        var filterValue = utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
        var stringValue = utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
        return stringValue.indexOf(filterValue) !== -1;
      },
      notContains: function notContains(value, filter, filterLocale) {
        if (filter === undefined || filter === null || typeof filter === 'string' && filter.trim() === '') {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        var filterValue = utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
        var stringValue = utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
        return stringValue.indexOf(filterValue) === -1;
      },
      endsWith: function endsWith(value, filter, filterLocale) {
        if (filter === undefined || filter === null || filter.trim() === '') {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        var filterValue = utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
        var stringValue = utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
        return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
      },
      equals: function equals(value, filter, filterLocale) {
        if (filter === undefined || filter === null || typeof filter === 'string' && filter.trim() === '') {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        if (value.getTime && filter.getTime) return value.getTime() === filter.getTime();else return utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) === utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
      },
      notEquals: function notEquals(value, filter, filterLocale) {
        if (filter === undefined || filter === null || typeof filter === 'string' && filter.trim() === '') {
          return false;
        }

        if (value === undefined || value === null) {
          return true;
        }

        if (value.getTime && filter.getTime) return value.getTime() !== filter.getTime();else return utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) !== utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
      },
      in: function _in(value, filter) {
        if (filter === undefined || filter === null || filter.length === 0) {
          return true;
        }

        for (var i = 0; i < filter.length; i++) {
          if (utils.ObjectUtils.equals(value, filter[i])) {
            return true;
          }
        }

        return false;
      },
      between: function between(value, filter) {
        if (filter == null || filter[0] == null || filter[1] == null) {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        if (value.getTime) return filter[0].getTime() <= value.getTime() && value.getTime() <= filter[1].getTime();else return filter[0] <= value && value <= filter[1];
      },
      lt: function lt(value, filter) {
        if (filter === undefined || filter === null) {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        if (value.getTime && filter.getTime) return value.getTime() < filter.getTime();else return value < filter;
      },
      lte: function lte(value, filter) {
        if (filter === undefined || filter === null) {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        if (value.getTime && filter.getTime) return value.getTime() <= filter.getTime();else return value <= filter;
      },
      gt: function gt(value, filter) {
        if (filter === undefined || filter === null) {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        if (value.getTime && filter.getTime) return value.getTime() > filter.getTime();else return value > filter;
      },
      gte: function gte(value, filter) {
        if (filter === undefined || filter === null) {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        if (value.getTime && filter.getTime) return value.getTime() >= filter.getTime();else return value >= filter;
      },
      dateIs: function dateIs(value, filter) {
        if (filter === undefined || filter === null) {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        return value.toDateString() === filter.toDateString();
      },
      dateIsNot: function dateIsNot(value, filter) {
        if (filter === undefined || filter === null) {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        return value.toDateString() !== filter.toDateString();
      },
      dateBefore: function dateBefore(value, filter) {
        if (filter === undefined || filter === null) {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        return value.getTime() < filter.getTime();
      },
      dateAfter: function dateAfter(value, filter) {
        if (filter === undefined || filter === null) {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        return value.getTime() > filter.getTime();
      }
    },
    register: function register(rule, fn) {
      this.filters[rule] = fn;
    }
  };

  exports.FilterMatchMode = FilterMatchMode;
  exports.FilterOperator = FilterOperator;
  exports.FilterService = FilterService;
  exports.MessageSeverity = MessageSeverity;
  exports.PrimeIcons = PrimeIcons;
  exports.addLocale = addLocale;
  exports["default"] = PrimeReact;
  exports.locale = locale;
  exports.localeOption = localeOption;
  exports.localeOptions = localeOptions;
  exports.updateLocaleOption = updateLocaleOption;
  exports.updateLocaleOptions = updateLocaleOptions;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, primereact.utils);

this.primereact = this.primereact || {};
this.primereact.ripple = (function (exports, React, utils, PrimeReact) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

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

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var Ripple = /*#__PURE__*/function (_Component) {
    _inherits(Ripple, _Component);

    var _super = _createSuper(Ripple);

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

        utils.DomHandler.removeClass(this.ink, 'p-ink-active');

        if (!utils.DomHandler.getHeight(this.ink) && !utils.DomHandler.getWidth(this.ink)) {
          var d = Math.max(utils.DomHandler.getOuterWidth(this.target), utils.DomHandler.getOuterHeight(this.target));
          this.ink.style.height = d + 'px';
          this.ink.style.width = d + 'px';
        }

        var offset = utils.DomHandler.getOffset(this.target);
        var x = event.pageX - offset.left + document.body.scrollTop - utils.DomHandler.getWidth(this.ink) / 2;
        var y = event.pageY - offset.top + document.body.scrollLeft - utils.DomHandler.getHeight(this.ink) / 2;
        this.ink.style.top = y + 'px';
        this.ink.style.left = x + 'px';
        utils.DomHandler.addClass(this.ink, 'p-ink-active');
      }
    }, {
      key: "onAnimationEnd",
      value: function onAnimationEnd(event) {
        utils.DomHandler.removeClass(event.currentTarget, 'p-ink-active');
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

        return PrimeReact__default["default"].ripple ? /*#__PURE__*/React__default["default"].createElement("span", {
          ref: function ref(el) {
            return _this2.ink = el;
          },
          className: "p-ink",
          onAnimationEnd: this.onAnimationEnd
        }) : null;
      }
    }]);

    return Ripple;
  }(React.Component);

  exports.Ripple = Ripple;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils, primereact.api);

this.primereact = this.primereact || {};
this.primereact.csstransition = (function (exports, React, reactTransitionGroup) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

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

        return /*#__PURE__*/React__default["default"].createElement(reactTransitionGroup.CSSTransition, props, this.props.children);
      }
    }]);

    return CSSTransition;
  }(React.Component);

  exports.CSSTransition = CSSTransition;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, ReactTransitionGroup);

this.primereact = this.primereact || {};
this.primereact.portal = (function (exports, react, ReactDOM, PrimeReact) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);
  var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

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

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

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

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var Portal = /*#__PURE__*/function (_Component) {
    _inherits(Portal, _Component);

    var _super = _createSuper(Portal);

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
        var element = this.props.element || this.props.children;

        if (element && this.state.mounted) {
          var appendTo = this.props.appendTo || PrimeReact__default["default"].appendTo || document.body;
          return appendTo === 'self' ? element : /*#__PURE__*/ReactDOM__default["default"].createPortal(element, appendTo);
        }

        return null;
      }
    }]);

    return Portal;
  }(react.Component);

  _defineProperty(Portal, "defaultProps", {
    element: null,
    appendTo: null,
    visible: false,
    onMounted: null,
    onUnmounted: null
  });

  exports.Portal = Portal;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, ReactDOM, primereact.api);

this.primereact = this.primereact || {};
this.primereact.keyfilter = (function (exports, utils) {
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
        k = utils.DomHandler.getBrowser().safari ? KeyFilter.SAFARI_KEYS[k] || k : k;
        return k >= 33 && k <= 40 || k === KeyFilter.KEYS.RETURN || k === KeyFilter.KEYS.TAB || k === KeyFilter.KEYS.ESC;
      }
    }, {
      key: "isSpecialKey",
      value: function isSpecialKey(e) {
        var k = e.keyCode;
        return k === 9 || k === 13 || k === 27 || k === 16 || k === 17 || k >= 18 && k <= 20 || utils.DomHandler.getBrowser().opera && !e.shiftKey && (k === 8 || k >= 33 && k <= 35 || k >= 36 && k <= 39 || k >= 44 && k <= 45);
      }
    }, {
      key: "getKey",
      value: function getKey(e) {
        var k = e.keyCode || e.charCode;
        return utils.DomHandler.getBrowser().safari ? KeyFilter.SAFARI_KEYS[k] || k : k;
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
        var browser = utils.DomHandler.getBrowser();

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

  exports.KeyFilter = KeyFilter;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, primereact.utils);

this.primereact = this.primereact || {};
this.primereact.tooltip = (function (exports, React, ReactDOM, utils, portal, PrimeReact) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);
  var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

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

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

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

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  function tip(props) {
    var appendTo = props.appendTo || document.body;
    var tooltipWrapper = document.createDocumentFragment();
    utils.DomHandler.appendChild(tooltipWrapper, appendTo);
    props = _objectSpread(_objectSpread({}, props), props.options);
    var tooltipEl = /*#__PURE__*/React__default["default"].createElement(Tooltip, props);
    ReactDOM__default["default"].render(tooltipEl, tooltipWrapper);

    var updateTooltip = function updateTooltip(newProps) {
      props = _objectSpread(_objectSpread({}, props), newProps);
      ReactDOM__default["default"].render( /*#__PURE__*/React__default["default"].cloneElement(tooltipEl, props), tooltipWrapper);
    };

    return {
      destroy: function destroy() {
        ReactDOM__default["default"].unmountComponentAtNode(tooltipWrapper);
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

    var _super = _createSuper(Tooltip);

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
            if (_this2.props.autoZIndex && !utils.ZIndexUtils.get(_this2.containerEl)) {
              utils.ZIndexUtils.set('tooltip', _this2.containerEl, PrimeReact__default["default"].autoZIndex, _this2.props.baseZIndex || PrimeReact__default["default"].zIndex['tooltip']);
            }

            _this2.containerEl.style.left = '';
            _this2.containerEl.style.top = '';

            if (_this2.isMouseTrack(_this2.currentTarget) && !_this2.containerSize) {
              _this2.containerSize = {
                width: utils.DomHandler.getOuterWidth(_this2.containerEl),
                height: utils.DomHandler.getOuterHeight(_this2.containerEl)
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

            utils.DomHandler.addClass(_this2.currentTarget, _this2.getTargetOption(_this2.currentTarget, 'classname'));
          });
        }
      }
    }, {
      key: "hide",
      value: function hide(e) {
        var _this3 = this;

        this.clearTimeouts();

        if (this.state.visible) {
          utils.DomHandler.removeClass(this.currentTarget, this.getTargetOption(this.currentTarget, 'classname'));
          this.sendCallback(this.props.onBeforeHide, {
            originalEvent: e,
            target: this.currentTarget
          });
          this.applyDelay('hideDelay', function () {
            utils.ZIndexUtils.clear(_this3.containerEl);
            utils.DomHandler.removeClass(_this3.containerEl, 'p-tooltip-active');

            if (!_this3.isAutoHide() && _this3.allowHide === false) {
              return;
            }

            _this3.setState({
              visible: false,
              position: _this3.props.position
            }, function () {
              if (_this3.tooltipTextEl) {
                ReactDOM__default["default"].unmountComponentAtNode(_this3.tooltipTextEl);
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
            width: utils.DomHandler.getOuterWidth(this.containerEl),
            height: utils.DomHandler.getOuterHeight(this.containerEl)
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
          utils.DomHandler.addClass(this.containerEl, 'p-tooltip-active');
        } else {
          var pos = utils.DomHandler.findCollisionPosition(this.state.position);
          var my = this.getTargetOption(target, 'my') || this.props.my || pos.my;
          var at = this.getTargetOption(target, 'at') || this.props.at || pos.at;
          this.containerEl.style.padding = '0px';
          utils.DomHandler.flipfitCollision(this.containerEl, target, my, at, function (currentPosition) {
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

              utils.DomHandler.addClass(_this4.containerEl, 'p-tooltip-active');
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
          if (!utils.DomHandler.isAndroid()) {
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
          this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.currentTarget, function (e) {
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
          if (utils.DomHandler.isElement(target)) {
            this[operation](target);
          } else {
            var setEvent = function setEvent(target) {
              var element = utils.DomHandler.find(document, target);
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

        utils.ZIndexUtils.clear(this.containerEl);
      }
    }, {
      key: "renderElement",
      value: function renderElement() {
        var _this9 = this;

        var tooltipClassName = utils.classNames('p-tooltip p-component', _defineProperty({}, "p-tooltip-".concat(this.state.position), true), this.props.className);
        var isTargetContentEmpty = this.isTargetContentEmpty(this.currentTarget);
        return /*#__PURE__*/React__default["default"].createElement("div", {
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
        }, /*#__PURE__*/React__default["default"].createElement("div", {
          className: "p-tooltip-arrow"
        }), /*#__PURE__*/React__default["default"].createElement("div", {
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
          return /*#__PURE__*/React__default["default"].createElement(portal.Portal, {
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

  exports.Tooltip = Tooltip;
  exports.tip = tip;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, ReactDOM, primereact.utils, primereact.portal, primereact.api);

this.primereact = this.primereact || {};
this.primereact.virtualscroller = (function (exports, React, utils) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

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

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var VirtualScroller = /*#__PURE__*/function (_Component) {
    _inherits(VirtualScroller, _Component);

    var _super = _createSuper(VirtualScroller);

    function VirtualScroller(props) {
      var _this;

      _classCallCheck(this, VirtualScroller);

      _this = _super.call(this, props);

      var isBoth = _this.isBoth();

      _this.state = {
        first: isBoth ? {
          rows: 0,
          cols: 0
        } : 0,
        last: isBoth ? {
          rows: 0,
          cols: 0
        } : 0,
        numItemsInViewport: isBoth ? {
          rows: 0,
          cols: 0
        } : 0,
        numToleratedItems: props.numToleratedItems,
        loading: props.loading,
        loaderArr: []
      };
      _this.onScroll = _this.onScroll.bind(_assertThisInitialized(_this));
      _this.lastScrollPos = isBoth ? {
        top: 0,
        left: 0
      } : 0;
      return _this;
    }

    _createClass(VirtualScroller, [{
      key: "scrollTo",
      value: function scrollTo(options) {
        this.el && this.el.scrollTo(options);
      }
    }, {
      key: "scrollToIndex",
      value: function scrollToIndex(index) {
        var _this2 = this;

        var behavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'auto';
        var isBoth = this.isBoth();
        var isHorizontal = this.isHorizontal();
        var first = this.state.first;
        var numToleratedItems = this.state.numToleratedItems;
        var itemSize = this.props.itemSize;
        var contentPos = this.getContentPosition();

        var calculateFirst = function calculateFirst() {
          var _index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

          var _numT = arguments.length > 1 ? arguments[1] : undefined;

          return _index <= _numT ? 0 : _index;
        };

        var calculateCoord = function calculateCoord(_first, _size, _cpos) {
          return _first * _size + _cpos;
        };

        var scrollTo = function scrollTo() {
          var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          return _this2.scrollTo({
            left: left,
            top: top,
            behavior: behavior
          });
        };

        if (isBoth) {
          var newFirst = {
            rows: calculateFirst(index[0], numToleratedItems[0]),
            cols: calculateFirst(index[1], numToleratedItems[1])
          };

          if (newFirst.rows !== first.rows || newFirst.cols !== first.cols) {
            scrollTo(calculateCoord(newFirst.cols, itemSize[1], contentPos.left), calculateCoord(newFirst.rows, itemSize[0], contentPos.top));
            this.setState({
              first: newFirst
            });
          }
        } else {
          var _newFirst = calculateFirst(index, numToleratedItems);

          if (_newFirst !== first) {
            isHorizontal ? scrollTo(calculateCoord(_newFirst, itemSize, contentPos.left), 0) : scrollTo(0, calculateCoord(_newFirst, itemSize, contentPos.top));
            this.setState({
              first: _newFirst
            });
          }
        }
      }
    }, {
      key: "scrollInView",
      value: function scrollInView(index, to) {
        var _this3 = this;

        var behavior = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'auto';

        if (to) {
          var isBoth = this.isBoth();
          var isHorizontal = this.isHorizontal();

          var _this$getRenderedRang = this.getRenderedRange(),
              first = _this$getRenderedRang.first,
              viewport = _this$getRenderedRang.viewport;

          var itemSize = this.props.itemSize;

          var scrollTo = function scrollTo() {
            var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            return _this3.scrollTo({
              left: left,
              top: top,
              behavior: behavior
            });
          };

          var isToStart = to === 'to-start';
          var isToEnd = to === 'to-end';

          if (isToStart) {
            if (isBoth) {
              if (viewport.first.rows - first.rows > index[0]) {
                scrollTo(viewport.first.cols * itemSize, (viewport.first.rows - 1) * itemSize);
              } else if (viewport.first.cols - first.cols > index[1]) {
                scrollTo((viewport.first.cols - 1) * itemSize, viewport.first.rows * itemSize);
              }
            } else {
              if (viewport.first - first > index) {
                var pos = (viewport.first - 1) * itemSize;
                isHorizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
              }
            }
          } else if (isToEnd) {
            if (isBoth) {
              if (viewport.last.rows - first.rows <= index[0] + 1) {
                scrollTo(viewport.first.cols * itemSize, (viewport.first.rows + 1) * itemSize);
              } else if (viewport.last.cols - first.cols <= index[1] + 1) {
                scrollTo((viewport.first.cols + 1) * itemSize, viewport.first.rows * itemSize);
              }
            } else {
              if (viewport.last - first <= index + 1) {
                var _pos2 = (viewport.first + 1) * itemSize;

                isHorizontal ? scrollTo(_pos2, 0) : scrollTo(0, _pos2);
              }
            }
          }
        } else {
          this.scrollToIndex(index, behavior);
        }
      }
    }, {
      key: "getRows",
      value: function getRows() {
        return this.state.loading ? this.props.loaderDisabled ? this.state.loaderArr : [] : this.loadedItems();
      }
    }, {
      key: "getColumns",
      value: function getColumns() {
        if (this.props.columns) {
          var isBoth = this.isBoth();
          var isHorizontal = this.isHorizontal();

          if (isBoth || isHorizontal) {
            return this.state.loading && this.props.loaderDisabled ? isBoth ? this.state.loaderArr[0] : this.state.loaderArr : this.props.columns.slice(isBoth ? this.state.first.cols : this.state.first, isBoth ? this.state.last.cols : this.state.last);
          }
        }

        return this.props.columns;
      }
    }, {
      key: "getRenderedRange",
      value: function getRenderedRange() {
        var isBoth = this.isBoth();
        var isHorizontal = this.isHorizontal();
        var _this$state = this.state,
            first = _this$state.first,
            last = _this$state.last,
            numItemsInViewport = _this$state.numItemsInViewport;
        var itemSize = this.props.itemSize;

        var calculateFirstInViewport = function calculateFirstInViewport(_pos, _size) {
          return Math.floor(_pos / (_size || _pos));
        };

        var firstInViewport = first;
        var lastInViewport = 0;

        if (this.el) {
          var scrollTop = this.el.scrollTop;
          var scrollLeft = this.el.scrollLeft;

          if (isBoth) {
            firstInViewport = {
              rows: calculateFirstInViewport(scrollTop, itemSize[0]),
              cols: calculateFirstInViewport(scrollLeft, itemSize[1])
            };
            lastInViewport = {
              rows: firstInViewport.rows + numItemsInViewport.rows,
              cols: firstInViewport.cols + numItemsInViewport.cols
            };
          } else {
            var scrollPos = isHorizontal ? scrollLeft : scrollTop;
            firstInViewport = calculateFirstInViewport(scrollPos, itemSize);
            lastInViewport = firstInViewport + numItemsInViewport;
          }
        }

        return {
          first: first,
          last: last,
          viewport: {
            first: firstInViewport,
            last: lastInViewport
          }
        };
      }
    }, {
      key: "isVertical",
      value: function isVertical() {
        return this.props.orientation === 'vertical';
      }
    }, {
      key: "isHorizontal",
      value: function isHorizontal() {
        return this.props.orientation === 'horizontal';
      }
    }, {
      key: "isBoth",
      value: function isBoth() {
        return this.props.orientation === 'both';
      }
    }, {
      key: "calculateOptions",
      value: function calculateOptions() {
        var _this4 = this;

        var isBoth = this.isBoth();
        var isHorizontal = this.isHorizontal();
        var first = this.state.first;
        var itemSize = this.props.itemSize;
        var contentPos = this.getContentPosition();
        var contentWidth = this.el ? this.el.offsetWidth - contentPos.left : 0;
        var contentHeight = this.el ? this.el.offsetHeight - contentPos.top : 0;

        var calculateNumItemsInViewport = function calculateNumItemsInViewport(_contentSize, _itemSize) {
          return Math.ceil(_contentSize / (_itemSize || _contentSize));
        };

        var calculateNumToleratedItems = function calculateNumToleratedItems(_numItems) {
          return Math.ceil(_numItems / 2);
        };

        var numItemsInViewport = isBoth ? {
          rows: calculateNumItemsInViewport(contentHeight, itemSize[0]),
          cols: calculateNumItemsInViewport(contentWidth, itemSize[1])
        } : calculateNumItemsInViewport(isHorizontal ? contentWidth : contentHeight, itemSize);
        var numToleratedItems = this.state.numToleratedItems || (isBoth ? [calculateNumToleratedItems(numItemsInViewport.rows), calculateNumToleratedItems(numItemsInViewport.cols)] : calculateNumToleratedItems(numItemsInViewport));

        var calculateLast = function calculateLast(_first, _num, _numT, _isCols) {
          return _this4.getLast(_first + _num + (_first < _numT ? 2 : 3) * _numT, _isCols);
        };

        var last = isBoth ? {
          rows: calculateLast(first.rows, numItemsInViewport.rows, numToleratedItems[0]),
          cols: calculateLast(first.cols, numItemsInViewport.cols, numToleratedItems[1], true)
        } : calculateLast(first, numItemsInViewport, numToleratedItems);
        var state = {
          numItemsInViewport: numItemsInViewport,
          last: last,
          numToleratedItems: numToleratedItems
        };

        if (this.props.showLoader) {
          state['loaderArr'] = isBoth ? Array.from({
            length: numItemsInViewport.rows
          }).map(function () {
            return Array.from({
              length: numItemsInViewport.cols
            });
          }) : Array.from({
            length: numItemsInViewport
          });
        }

        this.setState(state, function () {
          if (_this4.props.lazy) {
            _this4.props.onLazyLoad && _this4.props.onLazyLoad({
              first: _this4.state.first,
              last: _this4.state.last
            });
          }
        });
      }
    }, {
      key: "getLast",
      value: function getLast() {
        var last = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var isCols = arguments.length > 1 ? arguments[1] : undefined;

        if (this.props.items) {
          return Math.min(isCols ? (this.props.columns || this.props.items[0]).length : this.props.items.length, last);
        }

        return 0;
      }
    }, {
      key: "getContentPosition",
      value: function getContentPosition() {
        if (this.content) {
          var style = getComputedStyle(this.content);
          var left = parseInt(style.paddingLeft, 10) + Math.max(parseInt(style.left, 10), 0);
          var right = parseInt(style.paddingRight, 10) + Math.max(parseInt(style.right, 10), 0);
          var top = parseInt(style.paddingTop, 10) + Math.max(parseInt(style.top, 10), 0);
          var bottom = parseInt(style.paddingBottom, 10) + Math.max(parseInt(style.bottom, 10), 0);
          return {
            left: left,
            right: right,
            top: top,
            bottom: bottom,
            x: left + right,
            y: top + bottom
          };
        }

        return {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          x: 0,
          y: 0
        };
      }
    }, {
      key: "setSize",
      value: function setSize() {
        var _this5 = this;

        if (this.el) {
          var isBoth = this.isBoth();
          var isHorizontal = this.isHorizontal();
          var parentElement = this.el.parentElement;
          var width = this.props.scrollWidth || "".concat(this.el.offsetWidth || parentElement.offsetWidth, "px");
          var height = this.props.scrollHeight || "".concat(this.el.offsetHeight || parentElement.offsetHeight, "px");

          var setProp = function setProp(_name, _value) {
            return _this5.el.style[_name] = _value;
          };

          if (isBoth || isHorizontal) {
            setProp('height', height);
            setProp('width', width);
          } else {
            setProp('height', height);
          }
        }
      }
    }, {
      key: "setSpacerSize",
      value: function setSpacerSize() {
        var _this6 = this;

        var items = this.props.items;

        if (this.spacer && items) {
          var isBoth = this.isBoth();
          var isHorizontal = this.isHorizontal();
          var itemSize = this.props.itemSize;
          var contentPos = this.getContentPosition();

          var setProp = function setProp(_name, _value, _size) {
            var _cpos = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

            return _this6.spacer.style[_name] = (_value || []).length * _size + _cpos + 'px';
          };

          if (isBoth) {
            setProp('height', items, itemSize[0], contentPos.y);
            setProp('width', this.props.columns || items[1], itemSize[1], contentPos.x);
          } else {
            isHorizontal ? setProp('width', this.props.columns || items, itemSize, contentPos.x) : setProp('height', items, itemSize, contentPos.y);
          }
        }
      }
    }, {
      key: "setContentPosition",
      value: function setContentPosition(pos) {
        var _this7 = this;

        if (this.content) {
          var isBoth = this.isBoth();
          var isHorizontal = this.isHorizontal();
          var first = pos ? pos.first : this.state.first;
          var itemSize = this.props.itemSize;

          var calculateTranslateVal = function calculateTranslateVal(_first, _size) {
            return _first * _size;
          };

          var setTransform = function setTransform() {
            var _x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            var _y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            _this7.sticky && (_this7.sticky.style.top = "-".concat(_y, "px"));
            _this7.content.style.transform = "translate3d(".concat(_x, "px, ").concat(_y, "px, 0)");
          };

          if (isBoth) {
            setTransform(calculateTranslateVal(first.cols, itemSize[1]), calculateTranslateVal(first.rows, itemSize[0]));
          } else {
            var translateVal = calculateTranslateVal(first, itemSize);
            isHorizontal ? setTransform(translateVal, 0) : setTransform(0, translateVal);
          }
        }
      }
    }, {
      key: "onScrollPositionChange",
      value: function onScrollPositionChange(event) {
        var _this8 = this;

        var target = event.target;
        var isBoth = this.isBoth();
        var isHorizontal = this.isHorizontal();
        var _this$state2 = this.state,
            first = _this$state2.first,
            last = _this$state2.last,
            numItemsInViewport = _this$state2.numItemsInViewport,
            numToleratedItems = _this$state2.numToleratedItems;
        var itemSize = this.props.itemSize;
        var contentPos = this.getContentPosition();

        var calculateScrollPos = function calculateScrollPos(_pos, _cpos) {
          return _pos ? _pos > _cpos ? _pos - _cpos : _pos : 0;
        };

        var calculateCurrentIndex = function calculateCurrentIndex(_pos, _size) {
          return Math.floor(_pos / (_size || _pos));
        };

        var calculateTriggerIndex = function calculateTriggerIndex(_currentIndex, _first, _last, _num, _numT, _isScrollDownOrRight) {
          return _currentIndex <= _numT ? _numT : _isScrollDownOrRight ? _last - _num - _numT : _first + _numT - 1;
        };

        var calculateFirst = function calculateFirst(_currentIndex, _triggerIndex, _first, _last, _num, _numT, _isScrollDownOrRight) {
          if (_currentIndex <= _numT) return 0;else return _isScrollDownOrRight ? _currentIndex < _triggerIndex ? _first : _currentIndex - _numT : _currentIndex > _triggerIndex ? _first : _currentIndex - 2 * _numT;
        };

        var calculateLast = function calculateLast(_currentIndex, _first, _last, _num, _numT, _isCols) {
          var lastValue = _first + _num + 2 * _numT;

          if (_currentIndex >= _numT) {
            lastValue += _numT + 1;
          }

          return _this8.getLast(lastValue, _isCols);
        };

        var scrollTop = calculateScrollPos(target.scrollTop, contentPos.top);
        var scrollLeft = calculateScrollPos(target.scrollLeft, contentPos.left);
        var newFirst = 0;
        var newLast = last;
        var isRangeChanged = false;

        if (isBoth) {
          var isScrollDown = this.lastScrollPos.top <= scrollTop;
          var isScrollRight = this.lastScrollPos.left <= scrollLeft;
          var currentIndex = {
            rows: calculateCurrentIndex(scrollTop, itemSize[0]),
            cols: calculateCurrentIndex(scrollLeft, itemSize[1])
          };
          var triggerIndex = {
            rows: calculateTriggerIndex(currentIndex.rows, first.rows, last.rows, numItemsInViewport.rows, numToleratedItems[0], isScrollDown),
            cols: calculateTriggerIndex(currentIndex.cols, first.cols, last.cols, numItemsInViewport.cols, numToleratedItems[1], isScrollRight)
          };
          newFirst = {
            rows: calculateFirst(currentIndex.rows, triggerIndex.rows, first.rows, last.rows, numItemsInViewport.rows, numToleratedItems[0], isScrollDown),
            cols: calculateFirst(currentIndex.cols, triggerIndex.cols, first.cols, last.cols, numItemsInViewport.cols, numToleratedItems[1], isScrollRight)
          };
          newLast = {
            rows: calculateLast(currentIndex.rows, newFirst.rows, last.rows, numItemsInViewport.rows, numToleratedItems[0]),
            cols: calculateLast(currentIndex.cols, newFirst.cols, last.cols, numItemsInViewport.cols, numToleratedItems[1], true)
          };
          isRangeChanged = newFirst.rows !== first.rows && newLast.rows !== last.rows || newFirst.cols !== first.cols && newLast.cols !== last.cols;
          this.lastScrollPos = {
            top: scrollTop,
            left: scrollLeft
          };
        } else {
          var scrollPos = isHorizontal ? scrollLeft : scrollTop;
          var isScrollDownOrRight = this.lastScrollPos <= scrollPos;

          var _currentIndex2 = calculateCurrentIndex(scrollPos, itemSize);

          var _triggerIndex2 = calculateTriggerIndex(_currentIndex2, first, last, numItemsInViewport, numToleratedItems, isScrollDownOrRight);

          newFirst = calculateFirst(_currentIndex2, _triggerIndex2, first, last, numItemsInViewport, numToleratedItems, isScrollDownOrRight);
          newLast = calculateLast(_currentIndex2, newFirst, last, numItemsInViewport, numToleratedItems);
          isRangeChanged = newFirst !== first && newLast !== last;
          this.lastScrollPos = scrollPos;
        }

        return {
          first: newFirst,
          last: newLast,
          isRangeChanged: isRangeChanged
        };
      }
    }, {
      key: "onScrollChange",
      value: function onScrollChange(event) {
        var _this9 = this;

        var _this$onScrollPositio = this.onScrollPositionChange(event),
            first = _this$onScrollPositio.first,
            last = _this$onScrollPositio.last,
            isRangeChanged = _this$onScrollPositio.isRangeChanged;

        if (isRangeChanged) {
          var newState = {
            first: first,
            last: last
          };
          this.setContentPosition(newState);
          this.setState(newState, function () {
            _this9.props.onScrollIndexChange && _this9.props.onScrollIndexChange(newState);

            if (_this9.props.lazy) {
              _this9.props.onLazyLoad && _this9.props.onLazyLoad(newState);
            }
          });
        }
      }
    }, {
      key: "onScroll",
      value: function onScroll(event) {
        var _this10 = this;

        this.props.onScroll && this.props.onScroll(event);

        if (this.props.delay) {
          if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
          }

          if (!this.state.loading && this.props.showLoader) {
            var _this$onScrollPositio2 = this.onScrollPositionChange(event),
                changed = _this$onScrollPositio2.isRangeChanged;

            changed && this.setState({
              loading: true
            });
          }

          this.scrollTimeout = setTimeout(function () {
            _this10.onScrollChange(event);

            if (_this10.state.loading && _this10.props.showLoader && !_this10.props.lazy) {
              _this10.setState({
                loading: false
              });
            }
          }, this.props.delay);
        } else {
          this.onScrollChange(event);
        }
      }
    }, {
      key: "getOptions",
      value: function getOptions(renderedIndex) {
        var first = this.state.first;
        var count = (this.props.items || []).length;
        var index = this.isBoth() ? first.rows + renderedIndex : first + renderedIndex;
        return {
          index: index,
          count: count,
          first: index === 0,
          last: index === count - 1,
          even: index % 2 === 0,
          odd: index % 2 !== 0,
          props: this.props
        };
      }
    }, {
      key: "loaderOptions",
      value: function loaderOptions(index, extOptions) {
        var count = this.state.loaderArr.length;
        return _objectSpread({
          index: index,
          count: count,
          first: index === 0,
          last: index === count - 1,
          even: index % 2 === 0,
          odd: index % 2 !== 0,
          props: this.props
        }, extOptions);
      }
    }, {
      key: "loadedItems",
      value: function loadedItems() {
        var _this11 = this;

        var items = this.props.items;

        if (items && !this.state.loading) {
          var isBoth = this.isBoth();
          var isHorizontal = this.isHorizontal();
          var _this$state3 = this.state,
              first = _this$state3.first,
              last = _this$state3.last;
          if (isBoth) return items.slice(first.rows, last.rows).map(function (item) {
            return _this11.props.columns ? item : item.slice(first.cols, last.cols);
          });else if (isHorizontal && this.props.columns) return items;else return items.slice(first, last);
        }

        return [];
      }
    }, {
      key: "init",
      value: function init() {
        this.setSize();
        this.calculateOptions();
        this.setSpacerSize();
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.init();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        if (!utils.ObjectUtils.equals(prevProps.itemSize, this.props.itemSize) || !prevProps.items || prevProps.items.length !== (this.props.items || []).length) {
          this.init();
        }

        if (this.props.lazy && prevProps.loading !== this.props.loading && this.state.loading !== this.props.loading) {
          this.setState({
            loading: this.props.loading
          });
        }

        if (prevProps.orientation !== this.props.orientation) {
          this.lastScrollPos = this.isBoth() ? {
            top: 0,
            left: 0
          } : 0;
        }
      }
    }, {
      key: "renderLoaderItem",
      value: function renderLoaderItem(index) {
        var extOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var options = this.loaderOptions(index, extOptions);
        var content = utils.ObjectUtils.getJSXElement(this.props.loadingTemplate, options);
        return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, {
          key: index
        }, content);
      }
    }, {
      key: "renderLoader",
      value: function renderLoader() {
        var _this12 = this;

        if (!this.props.loaderDisabled && this.props.showLoader && this.state.loading) {
          var className = utils.classNames('p-virtualscroller-loader', {
            'p-component-overlay': !this.props.loadingTemplate
          });
          var content = /*#__PURE__*/React__default["default"].createElement("i", {
            className: "p-virtualscroller-loading-icon pi pi-spinner pi-spin"
          });

          if (this.props.loadingTemplate) {
            var isBoth = this.isBoth();
            var numItemsInViewport = this.state.numItemsInViewport;
            content = this.state.loaderArr.map(function (_, index) {
              return _this12.renderLoaderItem(index, isBoth && {
                numCols: numItemsInViewport.cols
              });
            });
          }

          return /*#__PURE__*/React__default["default"].createElement("div", {
            className: className
          }, content);
        }

        return null;
      }
    }, {
      key: "renderSpacer",
      value: function renderSpacer() {
        var _this13 = this;

        if (this.props.showSpacer) {
          return /*#__PURE__*/React__default["default"].createElement("div", {
            ref: function ref(el) {
              return _this13.spacer = el;
            },
            className: "p-virtualscroller-spacer"
          });
        }

        return null;
      }
    }, {
      key: "renderItem",
      value: function renderItem(item, index) {
        var options = this.getOptions(index);
        var content = utils.ObjectUtils.getJSXElement(this.props.itemTemplate, item, options);
        return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, {
          key: options.index
        }, content);
      }
    }, {
      key: "renderItems",
      value: function renderItems(loadedItems) {
        var _this14 = this;

        return loadedItems.map(function (item, index) {
          return _this14.renderItem(item, index);
        });
      }
    }, {
      key: "renderContent",
      value: function renderContent() {
        var _this15 = this;

        var loadedItems = this.loadedItems();
        var items = this.renderItems(loadedItems);
        var className = utils.classNames('p-virtualscroller-content', {
          'p-virtualscroller-loading': this.state.loading
        });
        var content = /*#__PURE__*/React__default["default"].createElement("div", {
          className: className,
          ref: function ref(el) {
            return _this15.content = el;
          }
        }, items);

        if (this.props.contentTemplate) {
          var defaultOptions = {
            className: className,
            contentRef: function contentRef(el) {
              return _this15.content = el;
            },
            spacerRef: function spacerRef(el) {
              return _this15.spacer = el;
            },
            stickyRef: function stickyRef(el) {
              return _this15.sticky = el;
            },
            items: loadedItems,
            getItemOptions: function getItemOptions(index) {
              return _this15.getOptions(index);
            },
            children: items,
            element: content,
            props: this.props,
            loading: this.state.loading,
            getLoaderOptions: function getLoaderOptions(index, ext) {
              return _this15.loaderOptions(index, ext);
            },
            loadingTemplate: this.props.loadingTemplate,
            itemSize: this.props.itemSize,
            rows: this.getRows(),
            columns: this.getColumns(),
            vertical: this.isVertical(),
            horizontal: this.isHorizontal(),
            both: this.isBoth()
          };
          return utils.ObjectUtils.getJSXElement(this.props.contentTemplate, defaultOptions);
        }

        return content;
      }
    }, {
      key: "render",
      value: function render() {
        var _this16 = this;

        if (this.props.disabled) {
          var content = utils.ObjectUtils.getJSXElement(this.props.contentTemplate, {
            items: this.props.items,
            rows: this.props.items,
            columns: this.props.columns
          });
          return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, this.props.children, content);
        } else {
          var isBoth = this.isBoth();
          var isHorizontal = this.isHorizontal();
          var className = utils.classNames('p-virtualscroller', {
            'p-both-scroll': isBoth,
            'p-horizontal-scroll': isHorizontal
          }, this.props.className);
          var loader = this.renderLoader();

          var _content = this.renderContent();

          var spacer = this.renderSpacer();
          return /*#__PURE__*/React__default["default"].createElement("div", {
            ref: function ref(el) {
              return _this16.el = el;
            },
            className: className,
            tabIndex: 0,
            style: this.props.style,
            onScroll: this.onScroll
          }, _content, spacer, loader);
        }
      }
    }]);

    return VirtualScroller;
  }(React.Component);

  _defineProperty(VirtualScroller, "defaultProps", {
    id: null,
    style: null,
    className: null,
    items: null,
    itemSize: 0,
    scrollHeight: null,
    scrollWidth: null,
    orientation: 'vertical',
    numToleratedItems: null,
    delay: 0,
    lazy: false,
    disabled: false,
    loaderDisabled: false,
    columns: null,
    loading: false,
    showSpacer: true,
    showLoader: false,
    loadingTemplate: null,
    itemTemplate: null,
    contentTemplate: null,
    onScroll: null,
    onScrollIndexChange: null,
    onLazyLoad: null
  });

  exports.VirtualScroller = VirtualScroller;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils);

this.primereact = this.primereact || {};
this.primereact.terminalservice = (function (exports, utils) {
	'use strict';

	var TerminalService = utils.EventBus();

	exports.TerminalService = TerminalService;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

})({}, primereact.utils);

this.primereact = this.primereact || {};
this.primereact.overlayservice = (function (exports, utils) {
	'use strict';

	var OverlayService = utils.EventBus();

	exports.OverlayService = OverlayService;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

})({}, primereact.utils);

this.primereact = this.primereact || {};
this.primereact.checkbox = (function (exports, React, utils, tooltip) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

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

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var Checkbox = /*#__PURE__*/function (_Component) {
    _inherits(Checkbox, _Component);

    var _super = _createSuper(Checkbox);

    function Checkbox(props) {
      var _this;

      _classCallCheck(this, Checkbox);

      _this = _super.call(this, props);
      _this.state = {
        focused: false
      };
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
      _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
      _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
      _this.inputRef = /*#__PURE__*/React.createRef(_this.props.inputRef);
      return _this;
    }

    _createClass(Checkbox, [{
      key: "onClick",
      value: function onClick(e) {
        if (!this.props.disabled && !this.props.readOnly && this.props.onChange) {
          var value = this.isChecked() ? this.props.falseValue : this.props.trueValue;
          this.props.onChange({
            originalEvent: e,
            value: this.props.value,
            checked: value,
            stopPropagation: function stopPropagation() {},
            preventDefault: function preventDefault() {},
            target: {
              type: 'checkbox',
              name: this.props.name,
              id: this.props.id,
              value: this.props.value,
              checked: value
            }
          });
          this.inputRef.current.checked = !this.isChecked();
          this.inputRef.current.focus();
          e.preventDefault();
        }
      }
    }, {
      key: "updateInputRef",
      value: function updateInputRef() {
        var ref = this.props.inputRef;

        if (ref) {
          if (typeof ref === 'function') {
            ref(this.inputRef.current);
          } else {
            ref.current = this.inputRef.current;
          }
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.updateInputRef();

        if (this.props.tooltip) {
          this.renderTooltip();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.tooltip) {
          this.tooltip.destroy();
          this.tooltip = null;
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        this.inputRef.current.checked = this.isChecked();

        if (prevProps.tooltip !== this.props.tooltip || prevProps.tooltipOptions !== this.props.tooltipOptions) {
          if (this.tooltip) this.tooltip.update(_objectSpread({
            content: this.props.tooltip
          }, this.props.tooltipOptions || {}));else this.renderTooltip();
        }
      }
    }, {
      key: "onFocus",
      value: function onFocus() {
        this.setState({
          focused: true
        });
      }
    }, {
      key: "onBlur",
      value: function onBlur() {
        this.setState({
          focused: false
        });
      }
    }, {
      key: "onKeyDown",
      value: function onKeyDown(event) {
        if (event.key === 'Enter') {
          this.onClick(event);
          event.preventDefault();
        }
      }
    }, {
      key: "renderTooltip",
      value: function renderTooltip() {
        this.tooltip = tooltip.tip({
          target: this.element,
          content: this.props.tooltip,
          options: this.props.tooltipOptions
        });
      }
    }, {
      key: "isChecked",
      value: function isChecked() {
        return this.props.checked === this.props.trueValue;
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var checked = this.isChecked();
        var containerClass = utils.classNames('p-checkbox p-component', {
          'p-checkbox-checked': checked,
          'p-checkbox-disabled': this.props.disabled,
          'p-checkbox-focused': this.state.focused
        }, this.props.className);
        var boxClass = utils.classNames('p-checkbox-box', {
          'p-highlight': checked,
          'p-disabled': this.props.disabled,
          'p-focus': this.state.focused
        });
        var icon = checked && this.props.icon;
        return /*#__PURE__*/React__default["default"].createElement("div", {
          ref: function ref(el) {
            return _this2.element = el;
          },
          id: this.props.id,
          className: containerClass,
          style: this.props.style,
          onClick: this.onClick,
          onContextMenu: this.props.onContextMenu,
          onMouseDown: this.props.onMouseDown
        }, /*#__PURE__*/React__default["default"].createElement("div", {
          className: "p-hidden-accessible"
        }, /*#__PURE__*/React__default["default"].createElement("input", {
          ref: this.inputRef,
          type: "checkbox",
          "aria-labelledby": this.props.ariaLabelledBy,
          id: this.props.inputId,
          name: this.props.name,
          tabIndex: this.props.tabIndex,
          defaultChecked: checked,
          onKeyDown: this.onKeyDown,
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          disabled: this.props.disabled,
          readOnly: this.props.readOnly,
          required: this.props.required
        })), /*#__PURE__*/React__default["default"].createElement("div", {
          className: boxClass,
          ref: function ref(el) {
            return _this2.box = el;
          },
          role: "checkbox",
          "aria-checked": checked
        }, utils.IconUtils.getJSXIcon(icon, {
          className: 'p-checkbox-icon p-c'
        }, {
          props: this.props,
          checked: checked
        })));
      }
    }]);

    return Checkbox;
  }(React.Component);

  _defineProperty(Checkbox, "defaultProps", {
    id: null,
    inputRef: null,
    inputId: null,
    value: null,
    name: null,
    checked: false,
    trueValue: true,
    falseValue: false,
    style: null,
    className: null,
    disabled: false,
    required: false,
    readOnly: false,
    tabIndex: null,
    icon: 'pi pi-check',
    tooltip: null,
    tooltipOptions: null,
    ariaLabelledBy: null,
    onChange: null,
    onMouseDown: null,
    onContextMenu: null
  });

  exports.Checkbox = Checkbox;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils, primereact.tooltip);

this.primereact = this.primereact || {};
this.primereact.button = (function (exports, React, utils, tooltip, ripple) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
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

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

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

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var ButtonComponent = /*#__PURE__*/function (_Component) {
    _inherits(ButtonComponent, _Component);

    var _super = _createSuper(ButtonComponent);

    function ButtonComponent(props) {
      var _this;

      _classCallCheck(this, ButtonComponent);

      _this = _super.call(this, props);
      _this.elementRef = /*#__PURE__*/React.createRef(_this.props.forwardRef);
      return _this;
    }

    _createClass(ButtonComponent, [{
      key: "updateForwardRef",
      value: function updateForwardRef() {
        var ref = this.props.forwardRef;

        if (ref) {
          if (typeof ref === 'function') {
            ref(this.elementRef.current);
          } else {
            ref.current = this.elementRef.current;
          }
        }
      }
    }, {
      key: "isDisabled",
      value: function isDisabled() {
        return this.props.disabled || this.props.loading;
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.updateForwardRef();

        if (this.props.tooltip) {
          this.renderTooltip();
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (prevProps.tooltip !== this.props.tooltip || prevProps.tooltipOptions !== this.props.tooltipOptions) {
          if (this.tooltip) this.tooltip.update(_objectSpread({
            content: this.props.tooltip
          }, this.props.tooltipOptions || {}));else this.renderTooltip();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.tooltip) {
          this.tooltip.destroy();
          this.tooltip = null;
        }
      }
    }, {
      key: "renderTooltip",
      value: function renderTooltip() {
        this.tooltip = tooltip.tip({
          target: this.elementRef.current,
          content: this.props.tooltip,
          options: this.props.tooltipOptions
        });
      }
    }, {
      key: "renderIcon",
      value: function renderIcon() {
        var icon = this.props.loading ? this.props.loadingIcon : this.props.icon;
        var className = utils.classNames('p-button-icon p-c', {
          'p-button-loading-icon': this.props.loading,
          'p-button-icon-left': this.props.iconPos === 'left' && this.props.label,
          'p-button-icon-right': this.props.iconPos === 'right' && this.props.label,
          'p-button-icon-top': this.props.iconPos === 'top' && this.props.label,
          'p-button-icon-bottom': this.props.iconPos === 'bottom' && this.props.label
        });
        return utils.IconUtils.getJSXIcon(icon, {
          className: className
        }, {
          props: this.props
        });
      }
    }, {
      key: "renderLabel",
      value: function renderLabel() {
        if (this.props.label) {
          return /*#__PURE__*/React__default["default"].createElement("span", {
            className: "p-button-label p-c"
          }, this.props.label);
        }

        return !this.props.children && !this.props.label && /*#__PURE__*/React__default["default"].createElement("span", {
          className: "p-button-label p-c",
          dangerouslySetInnerHTML: {
            __html: "&nbsp;"
          }
        });
      }
    }, {
      key: "renderBadge",
      value: function renderBadge() {
        if (this.props.badge) {
          var badgeClassName = utils.classNames('p-badge', this.props.badgeClassName);
          return /*#__PURE__*/React__default["default"].createElement("span", {
            className: badgeClassName
          }, this.props.badge);
        }

        return null;
      }
    }, {
      key: "render",
      value: function render() {
        var disabled = this.isDisabled();
        var className = utils.classNames('p-button p-component', this.props.className, _defineProperty({
          'p-button-icon-only': (this.props.icon || this.props.loading && this.props.loadingIcon) && !this.props.label,
          'p-button-vertical': (this.props.iconPos === 'top' || this.props.iconPos === 'bottom') && this.props.label,
          'p-disabled': disabled,
          'p-button-loading': this.props.loading,
          'p-button-loading-label-only': this.props.loading && !this.props.icon && this.props.label
        }, "p-button-loading-".concat(this.props.iconPos), this.props.loading && this.props.loadingIcon && this.props.label));
        var icon = this.renderIcon();
        var label = this.renderLabel();
        var badge = this.renderBadge();
        var buttonProps = utils.ObjectUtils.findDiffKeys(this.props, ButtonComponent.defaultProps);
        return /*#__PURE__*/React__default["default"].createElement("button", _extends({
          ref: this.elementRef
        }, buttonProps, {
          className: className,
          disabled: disabled
        }), icon, label, this.props.children, badge, /*#__PURE__*/React__default["default"].createElement(ripple.Ripple, null));
      }
    }]);

    return ButtonComponent;
  }(React.Component);

  _defineProperty(ButtonComponent, "defaultProps", {
    label: null,
    icon: null,
    iconPos: 'left',
    badge: null,
    badgeClassName: null,
    tooltip: null,
    tooltipOptions: null,
    forwardRef: null,
    disabled: false,
    loading: false,
    loadingIcon: 'pi pi-spinner pi-spin'
  });

  var Button = /*#__PURE__*/React__default["default"].forwardRef(function (props, ref) {
    return /*#__PURE__*/React__default["default"].createElement(ButtonComponent, _extends({
      forwardRef: ref
    }, props));
  });

  exports.Button = Button;
  exports.ButtonComponent = ButtonComponent;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils, primereact.tooltip, primereact.ripple);

this.primereact = this.primereact || {};
this.primereact.inputtext = (function (exports, React, utils, keyfilter, tooltip) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
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

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

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

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var InputTextComponent = /*#__PURE__*/function (_Component) {
    _inherits(InputTextComponent, _Component);

    var _super = _createSuper(InputTextComponent);

    function InputTextComponent(props) {
      var _this;

      _classCallCheck(this, InputTextComponent);

      _this = _super.call(this, props);
      _this.onInput = _this.onInput.bind(_assertThisInitialized(_this));
      _this.onKeyPress = _this.onKeyPress.bind(_assertThisInitialized(_this));
      _this.elementRef = /*#__PURE__*/React.createRef(_this.props.forwardRef);
      return _this;
    }

    _createClass(InputTextComponent, [{
      key: "isFilled",
      value: function isFilled() {
        return this.props.value != null && this.props.value.toString().length > 0 || this.props.defaultValue != null && this.props.defaultValue.toString().length > 0 || this.elementRef && this.elementRef.current && this.elementRef.current.value != null && this.elementRef.current.value.toString().length > 0;
      }
    }, {
      key: "onKeyPress",
      value: function onKeyPress(event) {
        if (this.props.onKeyPress) {
          this.props.onKeyPress(event);
        }

        if (this.props.keyfilter) {
          keyfilter.KeyFilter.onKeyPress(event, this.props.keyfilter, this.props.validateOnly);
        }
      }
    }, {
      key: "onInput",
      value: function onInput(event) {
        var validatePattern = true;

        if (this.props.keyfilter && this.props.validateOnly) {
          validatePattern = keyfilter.KeyFilter.validate(event, this.props.keyfilter);
        }

        if (this.props.onInput) {
          this.props.onInput(event, validatePattern);
        }

        if (!this.props.onChange) {
          if (event.target.value.length > 0) utils.DomHandler.addClass(event.target, 'p-filled');else utils.DomHandler.removeClass(event.target, 'p-filled');
        }
      }
    }, {
      key: "updateForwardRef",
      value: function updateForwardRef() {
        var ref = this.props.forwardRef;

        if (ref) {
          if (typeof ref === 'function') {
            ref(this.elementRef.current);
          } else {
            ref.current = this.elementRef.current;
          }
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.updateForwardRef();

        if (this.props.tooltip) {
          this.renderTooltip();
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (prevProps.tooltip !== this.props.tooltip || prevProps.tooltipOptions !== this.props.tooltipOptions) {
          if (this.tooltip) this.tooltip.update(_objectSpread({
            content: this.props.tooltip
          }, this.props.tooltipOptions || {}));else this.renderTooltip();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.tooltip) {
          this.tooltip.destroy();
          this.tooltip = null;
        }
      }
    }, {
      key: "renderTooltip",
      value: function renderTooltip() {
        this.tooltip = tooltip.tip({
          target: this.elementRef.current,
          content: this.props.tooltip,
          options: this.props.tooltipOptions
        });
      }
    }, {
      key: "render",
      value: function render() {
        var className = utils.classNames('p-inputtext p-component', {
          'p-disabled': this.props.disabled,
          'p-filled': this.isFilled()
        }, this.props.className);
        var inputProps = utils.ObjectUtils.findDiffKeys(this.props, InputTextComponent.defaultProps);
        return /*#__PURE__*/React__default["default"].createElement("input", _extends({
          ref: this.elementRef
        }, inputProps, {
          className: className,
          onInput: this.onInput,
          onKeyPress: this.onKeyPress
        }));
      }
    }]);

    return InputTextComponent;
  }(React.Component);

  _defineProperty(InputTextComponent, "defaultProps", {
    keyfilter: null,
    validateOnly: false,
    tooltip: null,
    tooltipOptions: null,
    onInput: null,
    onKeyPress: null,
    forwardRef: null
  });

  var InputText = /*#__PURE__*/React__default["default"].forwardRef(function (props, ref) {
    return /*#__PURE__*/React__default["default"].createElement(InputTextComponent, _extends({
      forwardRef: ref
    }, props));
  });

  exports.InputText = InputText;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils, primereact.keyfilter, primereact.tooltip);

this.primereact = this.primereact || {};
this.primereact.inputnumber = (function (exports, React, inputtext, utils, tooltip, ripple) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
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

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

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

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var InputNumber = /*#__PURE__*/function (_Component) {
    _inherits(InputNumber, _Component);

    var _super = _createSuper(InputNumber);

    function InputNumber(props) {
      var _this;

      _classCallCheck(this, InputNumber);

      _this = _super.call(this, props);
      _this.state = {
        focused: false
      };

      _this.constructParser();

      _this.onInput = _this.onInput.bind(_assertThisInitialized(_this));
      _this.onInputKeyDown = _this.onInputKeyDown.bind(_assertThisInitialized(_this));
      _this.onInputKeyPress = _this.onInputKeyPress.bind(_assertThisInitialized(_this));
      _this.onInputClick = _this.onInputClick.bind(_assertThisInitialized(_this));
      _this.onInputBlur = _this.onInputBlur.bind(_assertThisInitialized(_this));
      _this.onInputFocus = _this.onInputFocus.bind(_assertThisInitialized(_this));
      _this.onPaste = _this.onPaste.bind(_assertThisInitialized(_this));
      _this.onUpButtonMouseLeave = _this.onUpButtonMouseLeave.bind(_assertThisInitialized(_this));
      _this.onUpButtonMouseDown = _this.onUpButtonMouseDown.bind(_assertThisInitialized(_this));
      _this.onUpButtonMouseUp = _this.onUpButtonMouseUp.bind(_assertThisInitialized(_this));
      _this.onUpButtonKeyDown = _this.onUpButtonKeyDown.bind(_assertThisInitialized(_this));
      _this.onUpButtonKeyUp = _this.onUpButtonKeyUp.bind(_assertThisInitialized(_this));
      _this.onDownButtonMouseLeave = _this.onDownButtonMouseLeave.bind(_assertThisInitialized(_this));
      _this.onDownButtonMouseDown = _this.onDownButtonMouseDown.bind(_assertThisInitialized(_this));
      _this.onDownButtonMouseUp = _this.onDownButtonMouseUp.bind(_assertThisInitialized(_this));
      _this.onDownButtonKeyDown = _this.onDownButtonKeyDown.bind(_assertThisInitialized(_this));
      _this.onDownButtonKeyUp = _this.onDownButtonKeyUp.bind(_assertThisInitialized(_this));
      _this.inputRef = /*#__PURE__*/React.createRef(_this.props.inputRef);
      return _this;
    }

    _createClass(InputNumber, [{
      key: "getOptions",
      value: function getOptions() {
        return {
          localeMatcher: this.props.localeMatcher,
          style: this.props.mode,
          currency: this.props.currency,
          currencyDisplay: this.props.currencyDisplay,
          useGrouping: this.props.useGrouping,
          minimumFractionDigits: this.props.minFractionDigits,
          maximumFractionDigits: this.props.maxFractionDigits
        };
      }
    }, {
      key: "constructParser",
      value: function constructParser() {
        this.numberFormat = new Intl.NumberFormat(this.props.locale, this.getOptions());

        var numerals = _toConsumableArray(new Intl.NumberFormat(this.props.locale, {
          useGrouping: false
        }).format(9876543210)).reverse();

        var index = new Map(numerals.map(function (d, i) {
          return [d, i];
        }));
        this._numeral = new RegExp("[".concat(numerals.join(''), "]"), 'g');
        this._group = this.getGroupingExpression();
        this._minusSign = this.getMinusSignExpression();
        this._currency = this.getCurrencyExpression();
        this._decimal = this.getDecimalExpression();
        this._suffix = this.getSuffixExpression();
        this._prefix = this.getPrefixExpression();

        this._index = function (d) {
          return index.get(d);
        };
      }
    }, {
      key: "escapeRegExp",
      value: function escapeRegExp(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      }
    }, {
      key: "getDecimalExpression",
      value: function getDecimalExpression() {
        var formatter = new Intl.NumberFormat(this.props.locale, _objectSpread(_objectSpread({}, this.getOptions()), {}, {
          useGrouping: false
        }));
        return new RegExp("[".concat(formatter.format(1.1).replace(this._currency, '').trim().replace(this._numeral, ''), "]"), 'g');
      }
    }, {
      key: "getGroupingExpression",
      value: function getGroupingExpression() {
        var formatter = new Intl.NumberFormat(this.props.locale, {
          useGrouping: true
        });
        this.groupChar = formatter.format(1000000).trim().replace(this._numeral, '').charAt(0);
        return new RegExp("[".concat(this.groupChar, "]"), 'g');
      }
    }, {
      key: "getMinusSignExpression",
      value: function getMinusSignExpression() {
        var formatter = new Intl.NumberFormat(this.props.locale, {
          useGrouping: false
        });
        return new RegExp("[".concat(formatter.format(-1).trim().replace(this._numeral, ''), "]"), 'g');
      }
    }, {
      key: "getCurrencyExpression",
      value: function getCurrencyExpression() {
        if (this.props.currency) {
          var formatter = new Intl.NumberFormat(this.props.locale, {
            style: 'currency',
            currency: this.props.currency,
            currencyDisplay: this.props.currencyDisplay,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          });
          return new RegExp("[".concat(formatter.format(1).replace(/\s/g, '').replace(this._numeral, '').replace(this._group, ''), "]"), 'g');
        }

        return new RegExp("[]", 'g');
      }
    }, {
      key: "getPrefixExpression",
      value: function getPrefixExpression() {
        if (this.props.prefix) {
          this.prefixChar = this.props.prefix;
        } else {
          var formatter = new Intl.NumberFormat(this.props.locale, {
            style: this.props.mode,
            currency: this.props.currency,
            currencyDisplay: this.props.currencyDisplay
          });
          this.prefixChar = formatter.format(1).split('1')[0];
        }

        return new RegExp("".concat(this.escapeRegExp(this.prefixChar || '')), 'g');
      }
    }, {
      key: "getSuffixExpression",
      value: function getSuffixExpression() {
        if (this.props.suffix) {
          this.suffixChar = this.props.suffix;
        } else {
          var formatter = new Intl.NumberFormat(this.props.locale, {
            style: this.props.mode,
            currency: this.props.currency,
            currencyDisplay: this.props.currencyDisplay,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          });
          this.suffixChar = formatter.format(1).split('1')[1];
        }

        return new RegExp("".concat(this.escapeRegExp(this.suffixChar || '')), 'g');
      }
    }, {
      key: "formatValue",
      value: function formatValue(value) {
        if (value != null) {
          if (value === '-') {
            // Minus sign
            return value;
          }

          if (this.props.format) {
            var formatter = new Intl.NumberFormat(this.props.locale, this.getOptions());
            var formattedValue = formatter.format(value);

            if (this.props.prefix) {
              formattedValue = this.props.prefix + formattedValue;
            }

            if (this.props.suffix) {
              formattedValue = formattedValue + this.props.suffix;
            }

            return formattedValue;
          }

          return value.toString();
        }

        return '';
      }
    }, {
      key: "parseValue",
      value: function parseValue(text) {
        var filteredText = text.replace(this._suffix, '').replace(this._prefix, '').trim().replace(/\s/g, '').replace(this._currency, '').replace(this._group, '').replace(this._minusSign, '-').replace(this._decimal, '.').replace(this._numeral, this._index);

        if (filteredText) {
          if (filteredText === '-') // Minus sign
            return filteredText;
          var parsedValue = +filteredText;
          return isNaN(parsedValue) ? null : parsedValue;
        }

        return null;
      }
    }, {
      key: "repeat",
      value: function repeat(event, interval, dir) {
        var _this2 = this;

        var i = interval || 500;
        this.clearTimer();
        this.timer = setTimeout(function () {
          _this2.repeat(event, 40, dir);
        }, i);
        this.spin(event, dir);
      }
    }, {
      key: "spin",
      value: function spin(event, dir) {
        if (this.inputRef && this.inputRef.current) {
          var step = this.props.step * dir;
          var currentValue = this.parseValue(this.inputRef.current.value) || 0;
          var newValue = this.validateValue(currentValue + step);
          this.updateInput(newValue, null, 'spin');
          this.updateModel(event, newValue);
          this.handleOnChange(event, currentValue, newValue);
        }
      }
    }, {
      key: "onUpButtonMouseDown",
      value: function onUpButtonMouseDown(event) {
        if (!this.props.disabled && !this.props.readOnly) {
          this.inputRef.current.focus();
          this.repeat(event, null, 1);
          event.preventDefault();
        }
      }
    }, {
      key: "onUpButtonMouseUp",
      value: function onUpButtonMouseUp() {
        if (!this.props.disabled && !this.props.readOnly) {
          this.clearTimer();
        }
      }
    }, {
      key: "onUpButtonMouseLeave",
      value: function onUpButtonMouseLeave() {
        if (!this.props.disabled && !this.props.readOnly) {
          this.clearTimer();
        }
      }
    }, {
      key: "onUpButtonKeyUp",
      value: function onUpButtonKeyUp() {
        if (!this.props.disabled && !this.props.readOnly) {
          this.clearTimer();
        }
      }
    }, {
      key: "onUpButtonKeyDown",
      value: function onUpButtonKeyDown(event) {
        if (!this.props.disabled && !this.props.readOnly && (event.keyCode === 32 || event.keyCode === 13)) {
          this.repeat(event, null, 1);
        }
      }
    }, {
      key: "onDownButtonMouseDown",
      value: function onDownButtonMouseDown(event) {
        if (!this.props.disabled && !this.props.readOnly) {
          this.inputRef.current.focus();
          this.repeat(event, null, -1);
          event.preventDefault();
        }
      }
    }, {
      key: "onDownButtonMouseUp",
      value: function onDownButtonMouseUp() {
        if (!this.props.disabled && !this.props.readOnly) {
          this.clearTimer();
        }
      }
    }, {
      key: "onDownButtonMouseLeave",
      value: function onDownButtonMouseLeave() {
        if (!this.props.disabled && !this.props.readOnly) {
          this.clearTimer();
        }
      }
    }, {
      key: "onDownButtonKeyUp",
      value: function onDownButtonKeyUp() {
        if (!this.props.disabled && !this.props.readOnly) {
          this.clearTimer();
        }
      }
    }, {
      key: "onDownButtonKeyDown",
      value: function onDownButtonKeyDown(event) {
        if (!this.props.disabled && !this.props.readOnly && (event.keyCode === 32 || event.keyCode === 13)) {
          this.repeat(event, null, -1);
        }
      }
    }, {
      key: "onInput",
      value: function onInput(event) {
        if (this.props.disabled || this.props.readOnly) {
          return;
        }

        if (this.isSpecialChar) {
          event.target.value = this.lastValue;
        }

        this.isSpecialChar = false;
      }
    }, {
      key: "onInputKeyDown",
      value: function onInputKeyDown(event) {
        if (this.props.disabled || this.props.readOnly) {
          return;
        }

        this.lastValue = event.target.value;

        if (event.shiftKey || event.altKey) {
          this.isSpecialChar = true;
          return;
        }

        var selectionStart = event.target.selectionStart;
        var selectionEnd = event.target.selectionEnd;
        var inputValue = event.target.value;
        var newValueStr = null;

        if (event.altKey) {
          event.preventDefault();
        }

        switch (event.which) {
          //up
          case 38:
            this.spin(event, 1);
            event.preventDefault();
            break;
          //down

          case 40:
            this.spin(event, -1);
            event.preventDefault();
            break;
          //left

          case 37:
            if (!this.isNumeralChar(inputValue.charAt(selectionStart - 1))) {
              event.preventDefault();
            }

            break;
          //right

          case 39:
            if (!this.isNumeralChar(inputValue.charAt(selectionStart))) {
              event.preventDefault();
            }

            break;
          //enter

          case 13:
            newValueStr = this.validateValue(this.parseValue(inputValue));
            this.inputRef.current.value = this.formatValue(newValueStr);
            this.inputRef.current.setAttribute('aria-valuenow', newValueStr);
            this.updateModel(event, newValueStr);
            break;
          //backspace

          case 8:
            event.preventDefault();

            if (selectionStart === selectionEnd) {
              var deleteChar = inputValue.charAt(selectionStart - 1);

              var _this$getDecimalCharI = this.getDecimalCharIndexes(inputValue),
                  decimalCharIndex = _this$getDecimalCharI.decimalCharIndex,
                  decimalCharIndexWithoutPrefix = _this$getDecimalCharI.decimalCharIndexWithoutPrefix;

              if (this.isNumeralChar(deleteChar)) {
                var decimalLength = this.getDecimalLength(inputValue);

                if (this._group.test(deleteChar)) {
                  this._group.lastIndex = 0;
                  newValueStr = inputValue.slice(0, selectionStart - 2) + inputValue.slice(selectionStart - 1);
                } else if (this._decimal.test(deleteChar)) {
                  this._decimal.lastIndex = 0;

                  if (decimalLength) {
                    this.inputRef.current.setSelectionRange(selectionStart - 1, selectionStart - 1);
                  } else {
                    newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                  }
                } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                  var insertedText = this.isDecimalMode() && (this.props.minFractionDigits || 0) < decimalLength ? '' : '0';
                  newValueStr = inputValue.slice(0, selectionStart - 1) + insertedText + inputValue.slice(selectionStart);
                } else if (decimalCharIndexWithoutPrefix === 1) {
                  newValueStr = inputValue.slice(0, selectionStart - 1) + '0' + inputValue.slice(selectionStart);
                  newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : '';
                } else {
                  newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                }
              }

              this.updateValue(event, newValueStr, null, 'delete-single');
            } else {
              newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
              this.updateValue(event, newValueStr, null, 'delete-range');
            }

            break;
          // del

          case 46:
            event.preventDefault();

            if (selectionStart === selectionEnd) {
              var _deleteChar = inputValue.charAt(selectionStart);

              var _this$getDecimalCharI2 = this.getDecimalCharIndexes(inputValue),
                  _decimalCharIndex = _this$getDecimalCharI2.decimalCharIndex,
                  _decimalCharIndexWithoutPrefix = _this$getDecimalCharI2.decimalCharIndexWithoutPrefix;

              if (this.isNumeralChar(_deleteChar)) {
                var _decimalLength = this.getDecimalLength(inputValue);

                if (this._group.test(_deleteChar)) {
                  this._group.lastIndex = 0;
                  newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 2);
                } else if (this._decimal.test(_deleteChar)) {
                  this._decimal.lastIndex = 0;

                  if (_decimalLength) {
                    this.$refs.input.$el.setSelectionRange(selectionStart + 1, selectionStart + 1);
                  } else {
                    newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                  }
                } else if (_decimalCharIndex > 0 && selectionStart > _decimalCharIndex) {
                  var _insertedText = this.isDecimalMode() && (this.props.minFractionDigits || 0) < _decimalLength ? '' : '0';

                  newValueStr = inputValue.slice(0, selectionStart) + _insertedText + inputValue.slice(selectionStart + 1);
                } else if (_decimalCharIndexWithoutPrefix === 1) {
                  newValueStr = inputValue.slice(0, selectionStart) + '0' + inputValue.slice(selectionStart + 1);
                  newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : '';
                } else {
                  newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                }
              }

              this.updateValue(event, newValueStr, null, 'delete-back-single');
            } else {
              newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
              this.updateValue(event, newValueStr, null, 'delete-range');
            }

            break;
        }

        if (this.props.onKeyDown) {
          this.props.onKeyDown(event);
        }
      }
    }, {
      key: "onInputKeyPress",
      value: function onInputKeyPress(event) {
        if (this.props.disabled || this.props.readOnly) {
          return;
        }

        var code = event.which || event.keyCode;
        var char = String.fromCharCode(code);
        var isDecimalSign = this.isDecimalSign(char);
        var isMinusSign = this.isMinusSign(char);

        if (48 <= code && code <= 57 || isMinusSign || isDecimalSign) {
          this.insert(event, char, {
            isDecimalSign: isDecimalSign,
            isMinusSign: isMinusSign
          });
          event.preventDefault();
        }
      }
    }, {
      key: "onPaste",
      value: function onPaste(event) {
        event.preventDefault();

        if (this.props.disabled || this.props.readOnly) {
          return;
        }

        var data = (event.clipboardData || window['clipboardData']).getData('Text');

        if (data) {
          var filteredData = this.parseValue(data);

          if (filteredData != null) {
            this.insert(event, filteredData.toString());
          }
        }
      }
    }, {
      key: "allowMinusSign",
      value: function allowMinusSign() {
        return this.props.min === null || this.props.min < 0;
      }
    }, {
      key: "isMinusSign",
      value: function isMinusSign(char) {
        if (this._minusSign.test(char) || char === '-') {
          this._minusSign.lastIndex = 0;
          return true;
        }

        return false;
      }
    }, {
      key: "isDecimalSign",
      value: function isDecimalSign(char) {
        if (this._decimal.test(char)) {
          this._decimal.lastIndex = 0;
          return true;
        }

        return false;
      }
    }, {
      key: "isDecimalMode",
      value: function isDecimalMode() {
        return this.props.mode === 'decimal';
      }
    }, {
      key: "getDecimalCharIndexes",
      value: function getDecimalCharIndexes(val) {
        var decimalCharIndex = val.search(this._decimal);
        this._decimal.lastIndex = 0;
        var filteredVal = val.replace(this._prefix, '').trim().replace(/\s/g, '').replace(this._currency, '');
        var decimalCharIndexWithoutPrefix = filteredVal.search(this._decimal);
        this._decimal.lastIndex = 0;
        return {
          decimalCharIndex: decimalCharIndex,
          decimalCharIndexWithoutPrefix: decimalCharIndexWithoutPrefix
        };
      }
    }, {
      key: "getCharIndexes",
      value: function getCharIndexes(val) {
        var decimalCharIndex = val.search(this._decimal);
        this._decimal.lastIndex = 0;
        var minusCharIndex = val.search(this._minusSign);
        this._minusSign.lastIndex = 0;
        var suffixCharIndex = val.search(this._suffix);
        this._suffix.lastIndex = 0;
        var currencyCharIndex = val.search(this._currency);
        this._currency.lastIndex = 0;
        return {
          decimalCharIndex: decimalCharIndex,
          minusCharIndex: minusCharIndex,
          suffixCharIndex: suffixCharIndex,
          currencyCharIndex: currencyCharIndex
        };
      }
    }, {
      key: "insert",
      value: function insert(event, text) {
        var sign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
          isDecimalSign: false,
          isMinusSign: false
        };
        var minusCharIndexOnText = text.search(this._minusSign);
        this._minusSign.lastIndex = 0;

        if (!this.allowMinusSign() && minusCharIndexOnText !== -1) {
          return;
        }

        var selectionStart = this.inputRef.current.selectionStart;
        var selectionEnd = this.inputRef.current.selectionEnd;
        var inputValue = this.inputRef.current.value.trim();

        var _this$getCharIndexes = this.getCharIndexes(inputValue),
            decimalCharIndex = _this$getCharIndexes.decimalCharIndex,
            minusCharIndex = _this$getCharIndexes.minusCharIndex,
            suffixCharIndex = _this$getCharIndexes.suffixCharIndex,
            currencyCharIndex = _this$getCharIndexes.currencyCharIndex;

        var newValueStr;

        if (sign.isMinusSign) {
          if (selectionStart === 0) {
            newValueStr = inputValue;

            if (minusCharIndex === -1 || selectionEnd !== 0) {
              newValueStr = this.insertText(inputValue, text, 0, selectionEnd);
            }

            this.updateValue(event, newValueStr, text, 'insert');
          }
        } else if (sign.isDecimalSign) {
          if (decimalCharIndex > 0 && selectionStart === decimalCharIndex) {
            this.updateValue(event, inputValue, text, 'insert');
          } else if (decimalCharIndex > selectionStart && decimalCharIndex < selectionEnd) {
            newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
            this.updateValue(event, newValueStr, text, 'insert');
          } else if (decimalCharIndex === -1 && this.props.maxFractionDigits) {
            newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
            this.updateValue(event, newValueStr, text, 'insert');
          }
        } else {
          var maxFractionDigits = this.numberFormat.resolvedOptions().maximumFractionDigits;
          var operation = selectionStart !== selectionEnd ? 'range-insert' : 'insert';

          if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
            if (selectionStart + text.length - (decimalCharIndex + 1) <= maxFractionDigits) {
              var charIndex = currencyCharIndex >= selectionStart ? currencyCharIndex - 1 : suffixCharIndex >= selectionStart ? suffixCharIndex : inputValue.length;
              newValueStr = inputValue.slice(0, selectionStart) + text + inputValue.slice(selectionStart + text.length, charIndex) + inputValue.slice(charIndex);
              this.updateValue(event, newValueStr, text, operation);
            }
          } else {
            newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
            this.updateValue(event, newValueStr, text, operation);
          }
        }
      }
    }, {
      key: "insertText",
      value: function insertText(value, text, start, end) {
        var textSplit = text === '.' ? text : text.split('.');

        if (textSplit.length === 2) {
          var decimalCharIndex = value.slice(start, end).search(this._decimal);
          this._decimal.lastIndex = 0;
          return decimalCharIndex > 0 ? value.slice(0, start) + this.formatValue(text) + value.slice(end) : value || this.formatValue(text);
        } else if (end - start === value.length) {
          return this.formatValue(text);
        } else if (start === 0) {
          return text + value.slice(end);
        } else if (end === value.length) {
          return value.slice(0, start) + text;
        } else {
          return value.slice(0, start) + text + value.slice(end);
        }
      }
    }, {
      key: "deleteRange",
      value: function deleteRange(value, start, end) {
        var newValueStr;
        if (end - start === value.length) newValueStr = '';else if (start === 0) newValueStr = value.slice(end);else if (end === value.length) newValueStr = value.slice(0, start);else newValueStr = value.slice(0, start) + value.slice(end);
        return newValueStr;
      }
    }, {
      key: "initCursor",
      value: function initCursor() {
        var selectionStart = this.inputRef.current.selectionStart;
        var inputValue = this.inputRef.current.value;
        var valueLength = inputValue.length;
        var index = null; // remove prefix

        var prefixLength = (this.prefixChar || '').length;
        inputValue = inputValue.replace(this._prefix, '');
        selectionStart = selectionStart - prefixLength;
        var char = inputValue.charAt(selectionStart);

        if (this.isNumeralChar(char)) {
          return selectionStart + prefixLength;
        } //left


        var i = selectionStart - 1;

        while (i >= 0) {
          char = inputValue.charAt(i);

          if (this.isNumeralChar(char)) {
            index = i + prefixLength;
            break;
          } else {
            i--;
          }
        }

        if (index !== null) {
          this.inputRef.current.setSelectionRange(index + 1, index + 1);
        } else {
          i = selectionStart;

          while (i < valueLength) {
            char = inputValue.charAt(i);

            if (this.isNumeralChar(char)) {
              index = i + prefixLength;
              break;
            } else {
              i++;
            }
          }

          if (index !== null) {
            this.inputRef.current.setSelectionRange(index, index);
          }
        }

        return index || 0;
      }
    }, {
      key: "onInputClick",
      value: function onInputClick() {
        this.initCursor();
      }
    }, {
      key: "isNumeralChar",
      value: function isNumeralChar(char) {
        if (char.length === 1 && (this._numeral.test(char) || this._decimal.test(char) || this._group.test(char) || this._minusSign.test(char))) {
          this.resetRegex();
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: "resetRegex",
      value: function resetRegex() {
        this._numeral.lastIndex = 0;
        this._decimal.lastIndex = 0;
        this._group.lastIndex = 0;
        this._minusSign.lastIndex = 0;
      }
    }, {
      key: "updateValue",
      value: function updateValue(event, valueStr, insertedValueStr, operation) {
        var currentValue = this.inputRef.current.value;
        var newValue = null;

        if (valueStr != null) {
          newValue = this.parseValue(valueStr);
          newValue = !newValue && !this.props.allowEmpty ? 0 : newValue;
          this.updateInput(newValue, insertedValueStr, operation, valueStr);
          this.handleOnChange(event, currentValue, newValue);
        }
      }
    }, {
      key: "handleOnChange",
      value: function handleOnChange(event, currentValue, newValue) {
        if (this.props.onChange && this.isValueChanged(currentValue, newValue)) {
          this.props.onChange({
            originalEvent: event,
            value: newValue
          });
        }
      }
    }, {
      key: "isValueChanged",
      value: function isValueChanged(currentValue, newValue) {
        if (newValue === null && currentValue !== null) {
          return true;
        }

        if (newValue != null) {
          var parsedCurrentValue = typeof currentValue === 'string' ? this.parseValue(currentValue) : currentValue;
          return newValue !== parsedCurrentValue;
        }

        return false;
      }
    }, {
      key: "validateValue",
      value: function validateValue(value) {
        if (value === '-' || value == null) {
          return null;
        }

        if (this.props.min !== null && value < this.props.min) {
          return this.props.min;
        }

        if (this.props.max !== null && value > this.props.max) {
          return this.props.max;
        }

        return value;
      }
    }, {
      key: "updateInput",
      value: function updateInput(value, insertedValueStr, operation, valueStr) {
        insertedValueStr = insertedValueStr || '';
        var inputEl = this.inputRef.current;
        var inputValue = inputEl.value;
        var newValue = this.formatValue(value);
        var currentLength = inputValue.length;

        if (newValue !== valueStr) {
          newValue = this.concatValues(newValue, valueStr);
        }

        if (currentLength === 0) {
          inputEl.value = newValue;
          inputEl.setSelectionRange(0, 0);
          var index = this.initCursor();
          var selectionEnd = index + insertedValueStr.length;
          inputEl.setSelectionRange(selectionEnd, selectionEnd);
        } else {
          var selectionStart = inputEl.selectionStart;
          var _selectionEnd = inputEl.selectionEnd;
          inputEl.value = newValue;
          var newLength = newValue.length;

          if (operation === 'range-insert') {
            var startValue = this.parseValue((inputValue || '').slice(0, selectionStart));
            var startValueStr = startValue !== null ? startValue.toString() : '';
            var startExpr = startValueStr.split('').join("(".concat(this.groupChar, ")?"));
            var sRegex = new RegExp(startExpr, 'g');
            sRegex.test(newValue);
            var tExpr = insertedValueStr.split('').join("(".concat(this.groupChar, ")?"));
            var tRegex = new RegExp(tExpr, 'g');
            tRegex.test(newValue.slice(sRegex.lastIndex));
            _selectionEnd = sRegex.lastIndex + tRegex.lastIndex;
            inputEl.setSelectionRange(_selectionEnd, _selectionEnd);
          } else if (newLength === currentLength) {
            if (operation === 'insert' || operation === 'delete-back-single') inputEl.setSelectionRange(_selectionEnd + 1, _selectionEnd + 1);else if (operation === 'delete-single') inputEl.setSelectionRange(_selectionEnd - 1, _selectionEnd - 1);else if (operation === 'delete-range' || operation === 'spin') inputEl.setSelectionRange(_selectionEnd, _selectionEnd);
          } else if (operation === 'delete-back-single') {
            var prevChar = inputValue.charAt(_selectionEnd - 1);
            var nextChar = inputValue.charAt(_selectionEnd);
            var diff = currentLength - newLength;

            var isGroupChar = this._group.test(nextChar);

            if (isGroupChar && diff === 1) {
              _selectionEnd += 1;
            } else if (!isGroupChar && this.isNumeralChar(prevChar)) {
              _selectionEnd += -1 * diff + 1;
            }

            this._group.lastIndex = 0;
            inputEl.setSelectionRange(_selectionEnd, _selectionEnd);
          } else if (inputValue === '-' && operation === 'insert') {
            inputEl.setSelectionRange(0, 0);

            var _index = this.initCursor();

            var _selectionEnd2 = _index + insertedValueStr.length + 1;

            inputEl.setSelectionRange(_selectionEnd2, _selectionEnd2);
          } else {
            _selectionEnd = _selectionEnd + (newLength - currentLength);
            inputEl.setSelectionRange(_selectionEnd, _selectionEnd);
          }
        }

        inputEl.setAttribute('aria-valuenow', value);
      }
    }, {
      key: "updateInputValue",
      value: function updateInputValue(newValue) {
        newValue = !newValue && !this.props.allowEmpty ? 0 : newValue;
        var inputEl = this.inputRef.current;
        var value = inputEl.value;
        var formattedValue = this.formattedValue(newValue);

        if (value !== formattedValue) {
          inputEl.value = formattedValue;
          inputEl.setAttribute('aria-valuenow', newValue);
        }
      }
    }, {
      key: "formattedValue",
      value: function formattedValue(val) {
        var newVal = !val && !this.props.allowEmpty ? 0 : val;
        return this.formatValue(newVal);
      }
    }, {
      key: "concatValues",
      value: function concatValues(val1, val2) {
        if (val1 && val2) {
          var decimalCharIndex = val2.search(this._decimal);
          this._decimal.lastIndex = 0;
          return decimalCharIndex !== -1 ? val1.split(this._decimal)[0] + val2.slice(decimalCharIndex) : val1;
        }

        return val1;
      }
    }, {
      key: "getDecimalLength",
      value: function getDecimalLength(value) {
        if (value) {
          var valueSplit = value.split(this._decimal);

          if (valueSplit.length === 2) {
            return valueSplit[1].replace(this._suffix, '').trim().replace(/\s/g, '').replace(this._currency, '').length;
          }
        }

        return 0;
      }
    }, {
      key: "updateModel",
      value: function updateModel(event, value) {
        if (this.props.onValueChange) {
          this.props.onValueChange({
            originalEvent: event,
            value: value,
            stopPropagation: function stopPropagation() {},
            preventDefault: function preventDefault() {},
            target: {
              name: this.props.name,
              id: this.props.id,
              value: value
            }
          });
        }
      }
    }, {
      key: "onInputFocus",
      value: function onInputFocus(event) {
        var _this3 = this;

        event.persist();
        this.setState({
          focused: true
        }, function () {
          if (_this3.props.onFocus) {
            _this3.props.onFocus(event);
          }
        });
      }
    }, {
      key: "onInputBlur",
      value: function onInputBlur(event) {
        var _this4 = this;

        event.persist();
        this.setState({
          focused: false
        }, function () {
          var currentValue = _this4.inputRef.current.value;

          if (_this4.isValueChanged(currentValue, _this4.props.value)) {
            var newValue = _this4.validateValue(_this4.parseValue(currentValue));

            _this4.updateInputValue(newValue);

            _this4.updateModel(event, newValue);
          }

          if (_this4.props.onBlur) {
            _this4.props.onBlur(event);
          }
        });
      }
    }, {
      key: "clearTimer",
      value: function clearTimer() {
        if (this.timer) {
          clearInterval(this.timer);
        }
      }
    }, {
      key: "isStacked",
      value: function isStacked() {
        return this.props.showButtons && this.props.buttonLayout === 'stacked';
      }
    }, {
      key: "isHorizontal",
      value: function isHorizontal() {
        return this.props.showButtons && this.props.buttonLayout === 'horizontal';
      }
    }, {
      key: "isVertical",
      value: function isVertical() {
        return this.props.showButtons && this.props.buttonLayout === 'vertical';
      }
    }, {
      key: "getInputMode",
      value: function getInputMode() {
        return this.props.inputMode || (this.props.mode === 'decimal' && !this.props.minFractionDigits ? 'numeric' : 'decimal');
      }
    }, {
      key: "getFormatter",
      value: function getFormatter() {
        return this.numberFormat;
      }
    }, {
      key: "updateInputRef",
      value: function updateInputRef() {
        var ref = this.props.inputRef;

        if (ref) {
          if (typeof ref === 'function') {
            ref(this.inputRef.current);
          } else {
            ref.current = this.inputRef.current;
          }
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.updateInputRef();

        if (this.props.tooltip) {
          this.renderTooltip();
        }

        var newValue = this.validateValue(this.props.value);

        if (this.props.value !== null && this.props.value !== newValue) {
          this.updateModel(null, newValue);
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (prevProps.tooltip !== this.props.tooltip || prevProps.tooltipOptions !== this.props.tooltipOptions) {
          if (this.tooltip) this.tooltip.update(_objectSpread({
            content: this.props.tooltip
          }, this.props.tooltipOptions || {}));else this.renderTooltip();
        }

        var isOptionChanged = this.isOptionChanged(prevProps);

        if (isOptionChanged) {
          this.constructParser();
        }

        if (prevProps.value !== this.props.value || isOptionChanged) {
          var newValue = this.validateValue(this.props.value);
          this.updateInputValue(newValue);

          if (this.props.value !== null && this.props.value !== newValue) {
            this.updateModel(null, newValue);
          }
        }
      }
    }, {
      key: "isOptionChanged",
      value: function isOptionChanged(prevProps) {
        var _this5 = this;

        var optionProps = ['locale', 'localeMatcher', 'mode', 'currency', 'currencyDisplay', 'useGrouping', 'minFractionDigits', 'maxFractionDigits', 'suffix', 'prefix'];
        return optionProps.some(function (option) {
          return prevProps[option] !== _this5.props[option];
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.tooltip) {
          this.tooltip.destroy();
          this.tooltip = null;
        }
      }
    }, {
      key: "renderTooltip",
      value: function renderTooltip() {
        this.tooltip = tooltip.tip({
          target: this.element,
          content: this.props.tooltip,
          options: this.props.tooltipOptions
        });
      }
    }, {
      key: "renderInputElement",
      value: function renderInputElement() {
        var className = utils.classNames('p-inputnumber-input', this.props.inputClassName);
        var valueToRender = this.formattedValue(this.props.value);
        return /*#__PURE__*/React__default["default"].createElement(inputtext.InputText, {
          ref: this.inputRef,
          id: this.props.inputId,
          style: this.props.inputStyle,
          role: "spinbutton",
          className: className,
          defaultValue: valueToRender,
          type: this.props.type,
          size: this.props.size,
          tabIndex: this.props.tabIndex,
          inputMode: this.getInputMode(),
          maxLength: this.props.maxlength,
          disabled: this.props.disabled,
          required: this.props.required,
          pattern: this.props.pattern,
          placeholder: this.props.placeholder,
          readOnly: this.props.readOnly,
          name: this.props.name,
          autoFocus: this.props.autoFocus,
          onKeyDown: this.onInputKeyDown,
          onKeyPress: this.onInputKeyPress,
          onInput: this.onInput,
          onClick: this.onInputClick,
          onBlur: this.onInputBlur,
          onFocus: this.onInputFocus,
          onPaste: this.onPaste,
          min: this.props.min,
          max: this.props.max,
          "aria-valuemin": this.props.min,
          "aria-valuemax": this.props.max,
          "aria-valuenow": this.props.value,
          "aria-labelledby": this.props.ariaLabelledBy
        });
      }
    }, {
      key: "renderUpButton",
      value: function renderUpButton() {
        var className = utils.classNames('p-inputnumber-button p-inputnumber-button-up p-button p-button-icon-only p-component', {
          'p-disabled': this.props.disabled
        }, this.props.incrementButtonClassName);
        var icon = utils.classNames('p-button-icon', this.props.incrementButtonIcon);
        return /*#__PURE__*/React__default["default"].createElement("button", {
          type: "button",
          className: className,
          onMouseLeave: this.onUpButtonMouseLeave,
          onMouseDown: this.onUpButtonMouseDown,
          onMouseUp: this.onUpButtonMouseUp,
          onKeyDown: this.onUpButtonKeyDown,
          onKeyUp: this.onUpButtonKeyUp,
          disabled: this.props.disabled,
          tabIndex: -1
        }, /*#__PURE__*/React__default["default"].createElement("span", {
          className: icon
        }), /*#__PURE__*/React__default["default"].createElement(ripple.Ripple, null));
      }
    }, {
      key: "renderDownButton",
      value: function renderDownButton() {
        var className = utils.classNames('p-inputnumber-button p-inputnumber-button-down p-button p-button-icon-only p-component', {
          'p-disabled': this.props.disabled
        }, this.props.decrementButtonClassName);
        var icon = utils.classNames('p-button-icon', this.props.decrementButtonIcon);
        return /*#__PURE__*/React__default["default"].createElement("button", {
          type: "button",
          className: className,
          onMouseLeave: this.onDownButtonMouseLeave,
          onMouseDown: this.onDownButtonMouseDown,
          onMouseUp: this.onDownButtonMouseUp,
          onKeyDown: this.onDownButtonKeyDown,
          onKeyUp: this.onDownButtonKeyUp,
          disabled: this.props.disabled,
          tabIndex: -1
        }, /*#__PURE__*/React__default["default"].createElement("span", {
          className: icon
        }), /*#__PURE__*/React__default["default"].createElement(ripple.Ripple, null));
      }
    }, {
      key: "renderButtonGroup",
      value: function renderButtonGroup() {
        var upButton = this.props.showButtons && this.renderUpButton();
        var downButton = this.props.showButtons && this.renderDownButton();

        if (this.isStacked()) {
          return /*#__PURE__*/React__default["default"].createElement("span", {
            className: "p-inputnumber-button-group"
          }, upButton, downButton);
        }

        return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, upButton, downButton);
      }
    }, {
      key: "render",
      value: function render() {
        var _this6 = this;

        var className = utils.classNames('p-inputnumber p-component p-inputwrapper', this.props.className, {
          'p-inputwrapper-filled': this.props.value != null && this.props.value.toString().length > 0,
          'p-inputwrapper-focus': this.state.focused,
          'p-inputnumber-buttons-stacked': this.isStacked(),
          'p-inputnumber-buttons-horizontal': this.isHorizontal(),
          'p-inputnumber-buttons-vertical': this.isVertical()
        });
        var inputElement = this.renderInputElement();
        var buttonGroup = this.renderButtonGroup();
        return /*#__PURE__*/React__default["default"].createElement("span", {
          ref: function ref(el) {
            return _this6.element = el;
          },
          id: this.props.id,
          className: className,
          style: this.props.style
        }, inputElement, buttonGroup);
      }
    }]);

    return InputNumber;
  }(React.Component);

  _defineProperty(InputNumber, "defaultProps", {
    value: null,
    inputRef: null,
    format: true,
    showButtons: false,
    buttonLayout: 'stacked',
    incrementButtonClassName: null,
    decrementButtonClassName: null,
    incrementButtonIcon: 'pi pi-angle-up',
    decrementButtonIcon: 'pi pi-angle-down',
    locale: undefined,
    localeMatcher: undefined,
    mode: 'decimal',
    suffix: null,
    prefix: null,
    currency: undefined,
    currencyDisplay: undefined,
    useGrouping: true,
    minFractionDigits: undefined,
    maxFractionDigits: undefined,
    id: null,
    name: null,
    type: 'text',
    allowEmpty: true,
    step: 1,
    min: null,
    max: null,
    disabled: false,
    required: false,
    tabIndex: null,
    pattern: null,
    inputMode: null,
    placeholder: null,
    readOnly: false,
    size: null,
    style: null,
    className: null,
    inputId: null,
    autoFocus: false,
    inputStyle: null,
    inputClassName: null,
    tooltip: null,
    tooltipOptions: null,
    ariaLabelledBy: null,
    onValueChange: null,
    onChange: null,
    onBlur: null,
    onFocus: null,
    onKeyDown: null
  });

  exports.InputNumber = InputNumber;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.inputtext, primereact.utils, primereact.tooltip, primereact.ripple);

this.primereact = this.primereact || {};
this.primereact.messages = (function (exports, React, utils, ripple, reactTransitionGroup, csstransition) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
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

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

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

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var UIMessageComponent = /*#__PURE__*/function (_Component) {
    _inherits(UIMessageComponent, _Component);

    var _super = _createSuper$1(UIMessageComponent);

    function UIMessageComponent(props) {
      var _this;

      _classCallCheck(this, UIMessageComponent);

      _this = _super.call(this, props);
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      _this.onClose = _this.onClose.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(UIMessageComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        if (!this.props.message.sticky) {
          this.timeout = setTimeout(function () {
            _this2.onClose(null);
          }, this.props.message.life || 3000);
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
      }
    }, {
      key: "onClose",
      value: function onClose(event) {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }

        if (this.props.onClose) {
          this.props.onClose(this.props.message);
        }

        if (event) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    }, {
      key: "onClick",
      value: function onClick() {
        if (this.props.onClick) {
          this.props.onClick(this.props.message);
        }
      }
    }, {
      key: "renderCloseIcon",
      value: function renderCloseIcon() {
        if (this.props.message.closable !== false) {
          return /*#__PURE__*/React__default["default"].createElement("button", {
            type: "button",
            className: "p-message-close p-link",
            onClick: this.onClose
          }, /*#__PURE__*/React__default["default"].createElement("i", {
            className: "p-message-close-icon pi pi-times"
          }), /*#__PURE__*/React__default["default"].createElement(ripple.Ripple, null));
        }

        return null;
      }
    }, {
      key: "renderMessage",
      value: function renderMessage() {
        if (this.props.message) {
          var _this$props$message = this.props.message,
              severity = _this$props$message.severity,
              content = _this$props$message.content,
              summary = _this$props$message.summary,
              detail = _this$props$message.detail;
          var icon = utils.classNames('p-message-icon pi ', {
            'pi-info-circle': severity === 'info',
            'pi-check': severity === 'success',
            'pi-exclamation-triangle': severity === 'warn',
            'pi-times-circle': severity === 'error'
          });
          return content || /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("span", {
            className: icon
          }), /*#__PURE__*/React__default["default"].createElement("span", {
            className: "p-message-summary"
          }, summary), /*#__PURE__*/React__default["default"].createElement("span", {
            className: "p-message-detail"
          }, detail));
        }

        return null;
      }
    }, {
      key: "render",
      value: function render() {
        var severity = this.props.message.severity;
        var className = 'p-message p-component p-message-' + severity;
        var closeIcon = this.renderCloseIcon();
        var message = this.renderMessage();
        return /*#__PURE__*/React__default["default"].createElement("div", {
          ref: this.props.forwardRef,
          className: className,
          onClick: this.onClick
        }, /*#__PURE__*/React__default["default"].createElement("div", {
          className: "p-message-wrapper"
        }, message, closeIcon));
      }
    }]);

    return UIMessageComponent;
  }(React.Component);

  _defineProperty(UIMessageComponent, "defaultProps", {
    message: null,
    onClose: null,
    onClick: null
  });

  var UIMessage = /*#__PURE__*/React__default["default"].forwardRef(function (props, ref) {
    return /*#__PURE__*/React__default["default"].createElement(UIMessageComponent, _extends({
      forwardRef: ref
    }, props));
  });

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var messageIdx = 0;
  var Messages = /*#__PURE__*/function (_Component) {
    _inherits(Messages, _Component);

    var _super = _createSuper(Messages);

    function Messages(props) {
      var _this;

      _classCallCheck(this, Messages);

      _this = _super.call(this, props);
      _this.state = {
        messages: []
      };
      _this.onClose = _this.onClose.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(Messages, [{
      key: "show",
      value: function show(value) {
        if (value) {
          var newMessages = [];

          if (Array.isArray(value)) {
            for (var i = 0; i < value.length; i++) {
              value[i].id = messageIdx++;
              newMessages = [].concat(_toConsumableArray(this.state.messages), _toConsumableArray(value));
            }
          } else {
            value.id = messageIdx++;
            newMessages = this.state.messages ? [].concat(_toConsumableArray(this.state.messages), [value]) : [value];
          }

          this.setState({
            messages: newMessages
          });
        }
      }
    }, {
      key: "clear",
      value: function clear() {
        this.setState({
          messages: []
        });
      }
    }, {
      key: "replace",
      value: function replace(value) {
        var _this2 = this;

        this.setState({
          messages: []
        }, function () {
          return _this2.show(value);
        });
      }
    }, {
      key: "onClose",
      value: function onClose(message) {
        var newMessages = this.state.messages.filter(function (msg) {
          return msg.id !== message.id;
        });
        this.setState({
          messages: newMessages
        });

        if (this.props.onRemove) {
          this.props.onRemove(message);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;

        return /*#__PURE__*/React__default["default"].createElement("div", {
          id: this.props.id,
          className: this.props.className,
          style: this.props.style
        }, /*#__PURE__*/React__default["default"].createElement(reactTransitionGroup.TransitionGroup, null, this.state.messages.map(function (message) {
          var messageRef = /*#__PURE__*/React__default["default"].createRef();
          return /*#__PURE__*/React__default["default"].createElement(csstransition.CSSTransition, {
            nodeRef: messageRef,
            key: message.id,
            classNames: "p-message",
            unmountOnExit: true,
            timeout: {
              enter: 300,
              exit: 300
            },
            options: _this3.props.transitionOptions
          }, /*#__PURE__*/React__default["default"].createElement(UIMessage, {
            ref: messageRef,
            message: message,
            onClick: _this3.props.onClick,
            onClose: _this3.onClose
          }));
        })));
      }
    }]);

    return Messages;
  }(React.Component);

  _defineProperty(Messages, "defaultProps", {
    id: null,
    className: null,
    style: null,
    transitionOptions: null,
    onRemove: null,
    onClick: null
  });

  exports.Messages = Messages;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils, primereact.ripple, ReactTransitionGroup, primereact.csstransition);

this.primereact = this.primereact || {};
this.primereact.progressbar = (function (exports, React, utils) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

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

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var ProgressBar = /*#__PURE__*/function (_Component) {
    _inherits(ProgressBar, _Component);

    var _super = _createSuper(ProgressBar);

    function ProgressBar() {
      _classCallCheck(this, ProgressBar);

      return _super.apply(this, arguments);
    }

    _createClass(ProgressBar, [{
      key: "renderLabel",
      value: function renderLabel() {
        if (this.props.showValue && this.props.value != null) {
          var label = this.props.displayValueTemplate ? this.props.displayValueTemplate(this.props.value) : this.props.value + this.props.unit;
          return /*#__PURE__*/React__default["default"].createElement("div", {
            className: "p-progressbar-label"
          }, label);
        }

        return null;
      }
    }, {
      key: "renderDeterminate",
      value: function renderDeterminate() {
        var className = utils.classNames('p-progressbar p-component p-progressbar-determinate', this.props.className);
        var label = this.renderLabel();
        return /*#__PURE__*/React__default["default"].createElement("div", {
          role: "progressbar",
          id: this.props.id,
          className: className,
          style: this.props.style,
          "aria-valuemin": "0",
          "aria-valuenow": this.props.value,
          "aria-valuemax": "100",
          "aria-label": this.props.value
        }, /*#__PURE__*/React__default["default"].createElement("div", {
          className: "p-progressbar-value p-progressbar-value-animate",
          style: {
            width: this.props.value + '%',
            display: 'block',
            backgroundColor: this.props.color
          }
        }), label);
      }
    }, {
      key: "renderIndeterminate",
      value: function renderIndeterminate() {
        var className = utils.classNames('p-progressbar p-component p-progressbar-indeterminate', this.props.className);
        return /*#__PURE__*/React__default["default"].createElement("div", {
          role: "progressbar",
          id: this.props.id,
          className: className,
          style: this.props.style
        }, /*#__PURE__*/React__default["default"].createElement("div", {
          className: "p-progressbar-indeterminate-container"
        }, /*#__PURE__*/React__default["default"].createElement("div", {
          className: "p-progressbar-value p-progressbar-value-animate",
          style: {
            backgroundColor: this.props.color
          }
        })));
      }
    }, {
      key: "render",
      value: function render() {
        if (this.props.mode === 'determinate') return this.renderDeterminate();else if (this.props.mode === 'indeterminate') return this.renderIndeterminate();else throw new Error(this.props.mode + " is not a valid mode for the ProgressBar. Valid values are 'determinate' and 'indeterminate'");
      }
    }]);

    return ProgressBar;
  }(React.Component);

  _defineProperty(ProgressBar, "defaultProps", {
    id: null,
    value: null,
    showValue: true,
    unit: '%',
    style: null,
    className: null,
    mode: 'determinate',
    displayValueTemplate: null,
    color: null
  });

  exports.ProgressBar = ProgressBar;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils);

this.primereact = this.primereact || {};
this.primereact.dropdown = (function (exports, React, utils, ripple, csstransition, portal, virtualscroller, PrimeReact, tooltip, overlayservice) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
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

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

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

  function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var DropdownItem = /*#__PURE__*/function (_Component) {
    _inherits(DropdownItem, _Component);

    var _super = _createSuper$2(DropdownItem);

    function DropdownItem(props) {
      var _this;

      _classCallCheck(this, DropdownItem);

      _this = _super.call(this, props);
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(DropdownItem, [{
      key: "onClick",
      value: function onClick(event) {
        if (this.props.onClick) {
          this.props.onClick({
            originalEvent: event,
            option: this.props.option
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var className = utils.classNames('p-dropdown-item', {
          'p-highlight': this.props.selected,
          'p-disabled': this.props.disabled,
          'p-dropdown-item-empty': !this.props.label || this.props.label.length === 0
        }, this.props.option.className);
        var content = this.props.template ? utils.ObjectUtils.getJSXElement(this.props.template, this.props.option) : this.props.label;
        return /*#__PURE__*/React__default["default"].createElement("li", {
          className: className,
          onClick: this.onClick,
          "aria-label": this.props.label,
          key: this.props.label,
          role: "option",
          "aria-selected": this.props.selected
        }, content, /*#__PURE__*/React__default["default"].createElement(ripple.Ripple, null));
      }
    }]);

    return DropdownItem;
  }(React.Component);

  _defineProperty(DropdownItem, "defaultProps", {
    option: null,
    label: null,
    template: null,
    selected: false,
    disabled: false,
    onClick: null
  });

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  var DropdownPanelComponent = /*#__PURE__*/function (_Component) {
    _inherits(DropdownPanelComponent, _Component);

    var _super = _createSuper$1(DropdownPanelComponent);

    function DropdownPanelComponent(props) {
      var _this;

      _classCallCheck(this, DropdownPanelComponent);

      _this = _super.call(this, props);
      _this.onEnter = _this.onEnter.bind(_assertThisInitialized(_this));
      _this.onEntered = _this.onEntered.bind(_assertThisInitialized(_this));
      _this.onFilterInputChange = _this.onFilterInputChange.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(DropdownPanelComponent, [{
      key: "onEnter",
      value: function onEnter() {
        var _this2 = this;

        this.props.onEnter(function () {
          if (_this2.virtualScrollerRef) {
            var selectedIndex = _this2.props.getSelectedOptionIndex();

            if (selectedIndex !== -1) {
              _this2.virtualScrollerRef.scrollToIndex(selectedIndex);
            }
          }
        });
      }
    }, {
      key: "onEntered",
      value: function onEntered() {
        var _this3 = this;

        this.props.onEntered(function () {
          if (_this3.props.filter && _this3.props.filterInputAutoFocus) {
            _this3.filterInput.focus();
          }
        });
      }
    }, {
      key: "onFilterInputChange",
      value: function onFilterInputChange(event) {
        if (this.virtualScrollerRef) {
          this.virtualScrollerRef.scrollToIndex(0);
        }

        this.props.onFilterInputChange && this.props.onFilterInputChange(event);
      }
    }, {
      key: "isEmptyFilter",
      value: function isEmptyFilter() {
        return !(this.props.visibleOptions && this.props.visibleOptions.length) && this.props.hasFilter();
      }
    }, {
      key: "renderGroupChildren",
      value: function renderGroupChildren(optionGroup) {
        var _this4 = this;

        var groupChildren = this.props.getOptionGroupChildren(optionGroup);
        return groupChildren.map(function (option, j) {
          var optionLabel = _this4.props.getOptionLabel(option);

          var optionKey = j + '_' + _this4.props.getOptionRenderKey(option);

          var disabled = _this4.props.isOptionDisabled(option);

          return /*#__PURE__*/React__default["default"].createElement(DropdownItem, {
            key: optionKey,
            label: optionLabel,
            option: option,
            template: _this4.props.itemTemplate,
            selected: _this4.props.isSelected(option),
            disabled: disabled,
            onClick: _this4.props.onOptionClick
          });
        });
      }
    }, {
      key: "renderEmptyMessage",
      value: function renderEmptyMessage(emptyMessage, isFilter) {
        var message = utils.ObjectUtils.getJSXElement(emptyMessage, this.props) || PrimeReact.localeOption(isFilter ? 'emptyFilterMessage' : 'emptyMessage');
        return /*#__PURE__*/React__default["default"].createElement("li", {
          className: "p-dropdown-empty-message"
        }, message);
      }
    }, {
      key: "renderItem",
      value: function renderItem(option, index) {
        if (this.props.optionGroupLabel) {
          var groupContent = this.props.optionGroupTemplate ? utils.ObjectUtils.getJSXElement(this.props.optionGroupTemplate, option, index) : this.props.getOptionGroupLabel(option);
          var groupChildrenContent = this.renderGroupChildren(option);
          var key = index + '_' + this.props.getOptionGroupRenderKey(option);
          return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, {
            key: key
          }, /*#__PURE__*/React__default["default"].createElement("li", {
            className: "p-dropdown-item-group"
          }, groupContent), groupChildrenContent);
        } else {
          var optionLabel = this.props.getOptionLabel(option);
          var optionKey = index + '_' + this.props.getOptionRenderKey(option);
          var disabled = this.props.isOptionDisabled(option);
          return /*#__PURE__*/React__default["default"].createElement(DropdownItem, {
            key: optionKey,
            label: optionLabel,
            option: option,
            template: this.props.itemTemplate,
            selected: this.props.isSelected(option),
            disabled: disabled,
            onClick: this.props.onOptionClick
          });
        }
      }
    }, {
      key: "renderItems",
      value: function renderItems() {
        var _this5 = this;

        if (this.props.visibleOptions && this.props.visibleOptions.length) {
          return this.props.visibleOptions.map(function (option, index) {
            return _this5.renderItem(option, index);
          });
        } else if (this.props.hasFilter()) {
          return this.renderEmptyMessage(this.props.emptyFilterMessage, true);
        }

        return this.renderEmptyMessage(this.props.emptyMessage);
      }
    }, {
      key: "renderFilterClearIcon",
      value: function renderFilterClearIcon() {
        var _this6 = this;

        if (this.props.showFilterClear && this.props.filterValue) {
          return /*#__PURE__*/React__default["default"].createElement("i", {
            className: "p-dropdown-filter-clear-icon pi pi-times",
            onClick: function onClick() {
              return _this6.props.onFilterClearIconClick(function () {
                return _this6.filterInput.focus();
              });
            }
          });
        }

        return null;
      }
    }, {
      key: "renderFilter",
      value: function renderFilter() {
        var _this7 = this;

        if (this.props.filter) {
          var clearIcon = this.renderFilterClearIcon();
          var containerClassName = utils.classNames('p-dropdown-filter-container', {
            'p-dropdown-clearable-filter': !!clearIcon
          });
          return /*#__PURE__*/React__default["default"].createElement("div", {
            className: "p-dropdown-header"
          }, /*#__PURE__*/React__default["default"].createElement("div", {
            className: containerClassName
          }, /*#__PURE__*/React__default["default"].createElement("input", {
            ref: function ref(el) {
              return _this7.filterInput = el;
            },
            type: "text",
            autoComplete: "off",
            className: "p-dropdown-filter p-inputtext p-component",
            placeholder: this.props.filterPlaceholder,
            onKeyDown: this.props.onFilterInputKeyDown,
            onChange: this.onFilterInputChange,
            value: this.props.filterValue
          }), clearIcon, /*#__PURE__*/React__default["default"].createElement("i", {
            className: "p-dropdown-filter-icon pi pi-search"
          })));
        }

        return null;
      }
    }, {
      key: "renderContent",
      value: function renderContent() {
        var _this8 = this;

        if (this.props.virtualScrollerOptions) {
          var virtualScrollerProps = _objectSpread$1(_objectSpread$1({}, this.props.virtualScrollerOptions), {
            style: _objectSpread$1(_objectSpread$1({}, this.props.virtualScrollerOptions.style), {
              height: this.props.scrollHeight
            }),
            className: utils.classNames('p-dropdown-items-wrapper', this.props.virtualScrollerOptions.className),
            items: this.props.visibleOptions,
            onLazyLoad: function onLazyLoad(event) {
              return _this8.props.virtualScrollerOptions.onLazyLoad(_objectSpread$1(_objectSpread$1({}, event), {
                filter: _this8.props.filterValue
              }));
            },
            itemTemplate: function itemTemplate(item, options) {
              return item && _this8.renderItem(item, options.index);
            },
            contentTemplate: function contentTemplate(options) {
              var className = utils.classNames('p-dropdown-items', options.className);
              var content = _this8.isEmptyFilter() ? _this8.renderEmptyMessage() : options.children;
              return /*#__PURE__*/React__default["default"].createElement("ul", {
                ref: options.contentRef,
                className: className,
                role: "listbox"
              }, content);
            }
          });

          return /*#__PURE__*/React__default["default"].createElement(virtualscroller.VirtualScroller, _extends({
            ref: function ref(el) {
              return _this8.virtualScrollerRef = el;
            }
          }, virtualScrollerProps));
        } else {
          var items = this.renderItems();
          return /*#__PURE__*/React__default["default"].createElement("div", {
            className: "p-dropdown-items-wrapper",
            style: {
              maxHeight: this.props.scrollHeight || 'auto'
            }
          }, /*#__PURE__*/React__default["default"].createElement("ul", {
            className: "p-dropdown-items",
            role: "listbox"
          }, items));
        }
      }
    }, {
      key: "renderElement",
      value: function renderElement() {
        var className = utils.classNames('p-dropdown-panel p-component', this.props.panelClassName);
        var filter = this.renderFilter();
        var content = this.renderContent();
        return /*#__PURE__*/React__default["default"].createElement(csstransition.CSSTransition, {
          nodeRef: this.props.forwardRef,
          classNames: "p-connected-overlay",
          in: this.props.in,
          timeout: {
            enter: 120,
            exit: 100
          },
          options: this.props.transitionOptions,
          unmountOnExit: true,
          onEnter: this.onEnter,
          onEntering: this.props.onEntering,
          onEntered: this.onEntered,
          onExit: this.props.onExit,
          onExited: this.props.onExited
        }, /*#__PURE__*/React__default["default"].createElement("div", {
          ref: this.props.forwardRef,
          className: className,
          style: this.props.panelStyle,
          onClick: this.props.onClick
        }, filter, content));
      }
    }, {
      key: "render",
      value: function render() {
        var element = this.renderElement();
        return /*#__PURE__*/React__default["default"].createElement(portal.Portal, {
          element: element,
          appendTo: this.props.appendTo
        });
      }
    }]);

    return DropdownPanelComponent;
  }(React.Component);

  var DropdownPanel = /*#__PURE__*/React__default["default"].forwardRef(function (props, ref) {
    return /*#__PURE__*/React__default["default"].createElement(DropdownPanelComponent, _extends({
      forwardRef: ref
    }, props));
  });

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var Dropdown = /*#__PURE__*/function (_Component) {
    _inherits(Dropdown, _Component);

    var _super = _createSuper(Dropdown);

    function Dropdown(props) {
      var _this;

      _classCallCheck(this, Dropdown);

      _this = _super.call(this, props);
      _this.state = {
        filter: '',
        focused: false,
        overlayVisible: false
      };
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      _this.onInputFocus = _this.onInputFocus.bind(_assertThisInitialized(_this));
      _this.onInputBlur = _this.onInputBlur.bind(_assertThisInitialized(_this));
      _this.onInputKeyDown = _this.onInputKeyDown.bind(_assertThisInitialized(_this));
      _this.onEditableInputChange = _this.onEditableInputChange.bind(_assertThisInitialized(_this));
      _this.onEditableInputFocus = _this.onEditableInputFocus.bind(_assertThisInitialized(_this));
      _this.onOptionClick = _this.onOptionClick.bind(_assertThisInitialized(_this));
      _this.onFilterInputChange = _this.onFilterInputChange.bind(_assertThisInitialized(_this));
      _this.onFilterInputKeyDown = _this.onFilterInputKeyDown.bind(_assertThisInitialized(_this));
      _this.onFilterClearIconClick = _this.onFilterClearIconClick.bind(_assertThisInitialized(_this));
      _this.onPanelClick = _this.onPanelClick.bind(_assertThisInitialized(_this));
      _this.onOverlayEnter = _this.onOverlayEnter.bind(_assertThisInitialized(_this));
      _this.onOverlayEntered = _this.onOverlayEntered.bind(_assertThisInitialized(_this));
      _this.onOverlayExit = _this.onOverlayExit.bind(_assertThisInitialized(_this));
      _this.onOverlayExited = _this.onOverlayExited.bind(_assertThisInitialized(_this));
      _this.resetFilter = _this.resetFilter.bind(_assertThisInitialized(_this));
      _this.clear = _this.clear.bind(_assertThisInitialized(_this));
      _this.hasFilter = _this.hasFilter.bind(_assertThisInitialized(_this));
      _this.getOptionLabel = _this.getOptionLabel.bind(_assertThisInitialized(_this));
      _this.getOptionRenderKey = _this.getOptionRenderKey.bind(_assertThisInitialized(_this));
      _this.isOptionDisabled = _this.isOptionDisabled.bind(_assertThisInitialized(_this));
      _this.getOptionGroupChildren = _this.getOptionGroupChildren.bind(_assertThisInitialized(_this));
      _this.getOptionGroupLabel = _this.getOptionGroupLabel.bind(_assertThisInitialized(_this));
      _this.getOptionGroupRenderKey = _this.getOptionGroupRenderKey.bind(_assertThisInitialized(_this));
      _this.getSelectedOptionIndex = _this.getSelectedOptionIndex.bind(_assertThisInitialized(_this));
      _this.isSelected = _this.isSelected.bind(_assertThisInitialized(_this));
      _this.overlayRef = /*#__PURE__*/React.createRef();
      _this.inputRef = /*#__PURE__*/React.createRef(_this.props.inputRef);
      return _this;
    }

    _createClass(Dropdown, [{
      key: "onClick",
      value: function onClick(event) {
        if (this.props.disabled) {
          return;
        }

        if (utils.DomHandler.hasClass(event.target, 'p-dropdown-clear-icon') || event.target.tagName === 'INPUT') {
          return;
        } else if (!this.overlayRef.current || !(this.overlayRef.current && this.overlayRef.current.contains(event.target))) {
          this.focusInput.focus();

          if (this.state.overlayVisible) {
            this.hideOverlay();
          } else {
            this.showOverlay();
          }
        }
      }
    }, {
      key: "onInputFocus",
      value: function onInputFocus(event) {
        var _this2 = this;

        event.persist();

        if (this.props.showOnFocus && !this.state.overlayVisible) {
          this.showOverlay();
        }

        this.setState({
          focused: true
        }, function () {
          if (_this2.props.onFocus) {
            _this2.props.onFocus(event);
          }
        });
      }
    }, {
      key: "onInputBlur",
      value: function onInputBlur(event) {
        var _this3 = this;

        event.persist();
        this.setState({
          focused: false
        }, function () {
          if (_this3.props.onBlur) {
            _this3.props.onBlur(event);
          }
        });
      }
    }, {
      key: "onPanelClick",
      value: function onPanelClick(event) {
        overlayservice.OverlayService.emit('overlay-click', {
          originalEvent: event,
          target: this.container
        });
      }
    }, {
      key: "onInputKeyDown",
      value: function onInputKeyDown(event) {
        switch (event.which) {
          //down
          case 40:
            this.onDownKey(event);
            break;
          //up

          case 38:
            this.onUpKey(event);
            break;
          //space

          case 32:
            if (this.state.overlayVisible) this.hideOverlay();else this.showOverlay();
            event.preventDefault();
            break;
          //enter

          case 13:
            this.hideOverlay();
            event.preventDefault();
            break;
          //escape and tab

          case 27:
          case 9:
            this.hideOverlay();
            break;

          default:
            this.search(event);
            break;
        }
      }
    }, {
      key: "onFilterInputKeyDown",
      value: function onFilterInputKeyDown(event) {
        switch (event.which) {
          //down
          case 40:
            this.onDownKey(event);
            break;
          //up

          case 38:
            this.onUpKey(event);
            break;
          //enter and escape

          case 13:
          case 27:
            this.hideOverlay();
            event.preventDefault();
            break;
        }
      }
    }, {
      key: "onUpKey",
      value: function onUpKey(event) {
        var visibleOptions = this.getVisibleOptions();

        if (visibleOptions) {
          var prevOption = this.findPrevOption(this.getSelectedOptionIndex());

          if (prevOption) {
            this.selectItem({
              originalEvent: event,
              option: prevOption
            });
          }
        }

        event.preventDefault();
      }
    }, {
      key: "onDownKey",
      value: function onDownKey(event) {
        var visibleOptions = this.getVisibleOptions();

        if (visibleOptions) {
          if (!this.state.overlayVisible && event.altKey) {
            this.showOverlay();
          } else {
            var nextOption = this.findNextOption(this.getSelectedOptionIndex());

            if (nextOption) {
              this.selectItem({
                originalEvent: event,
                option: nextOption
              });
            }
          }
        }

        event.preventDefault();
      }
    }, {
      key: "findNextOption",
      value: function findNextOption(index) {
        var visibleOptions = this.getVisibleOptions();

        if (this.props.optionGroupLabel) {
          var groupIndex = index === -1 ? 0 : index.group;
          var optionIndex = index === -1 ? -1 : index.option;
          var option = this.findNextOptionInList(this.getOptionGroupChildren(visibleOptions[groupIndex]), optionIndex);
          if (option) return option;else if (groupIndex + 1 !== visibleOptions.length) return this.findNextOption({
            group: groupIndex + 1,
            option: -1
          });else return null;
        } else {
          return this.findNextOptionInList(visibleOptions, index);
        }
      }
    }, {
      key: "findNextOptionInList",
      value: function findNextOptionInList(list, index) {
        var i = index + 1;

        if (i === list.length) {
          return null;
        }

        var option = list[i];
        if (this.isOptionDisabled(option)) return this.findNextOptionInList(i);else return option;
      }
    }, {
      key: "findPrevOption",
      value: function findPrevOption(index) {
        if (index === -1) {
          return null;
        }

        var visibleOptions = this.getVisibleOptions();

        if (this.props.optionGroupLabel) {
          var groupIndex = index.group;
          var optionIndex = index.option;
          var option = this.findPrevOptionInList(this.getOptionGroupChildren(visibleOptions[groupIndex]), optionIndex);
          if (option) return option;else if (groupIndex > 0) return this.findPrevOption({
            group: groupIndex - 1,
            option: this.getOptionGroupChildren(visibleOptions[groupIndex - 1]).length
          });else return null;
        } else {
          return this.findPrevOptionInList(visibleOptions, index);
        }
      }
    }, {
      key: "findPrevOptionInList",
      value: function findPrevOptionInList(list, index) {
        var i = index - 1;

        if (i < 0) {
          return null;
        }

        var option = list[i];
        if (this.isOptionDisabled(option)) return this.findPrevOption(i);else return option;
      }
    }, {
      key: "search",
      value: function search(event) {
        var _this4 = this;

        if (this.searchTimeout) {
          clearTimeout(this.searchTimeout);
        }

        var char = event.key;
        this.previousSearchChar = this.currentSearchChar;
        this.currentSearchChar = char;
        if (this.previousSearchChar === this.currentSearchChar) this.searchValue = this.currentSearchChar;else this.searchValue = this.searchValue ? this.searchValue + char : char;

        if (this.searchValue) {
          var searchIndex = this.getSelectedOptionIndex();
          var newOption = this.props.optionGroupLabel ? this.searchOptionInGroup(searchIndex) : this.searchOption(++searchIndex);

          if (newOption) {
            this.selectItem({
              originalEvent: event,
              option: newOption
            });
            this.selectedOptionUpdated = true;
          }
        }

        this.searchTimeout = setTimeout(function () {
          _this4.searchValue = null;
        }, 250);
      }
    }, {
      key: "searchOption",
      value: function searchOption(index) {
        var option;

        if (this.searchValue) {
          var visibleOptions = this.getVisibleOptions();
          option = this.searchOptionInRange(index, visibleOptions.length);

          if (!option) {
            option = this.searchOptionInRange(0, index);
          }
        }

        return option;
      }
    }, {
      key: "searchOptionInRange",
      value: function searchOptionInRange(start, end) {
        var visibleOptions = this.getVisibleOptions();

        for (var i = start; i < end; i++) {
          var opt = visibleOptions[i];

          if (this.matchesSearchValue(opt)) {
            return opt;
          }
        }

        return null;
      }
    }, {
      key: "searchOptionInGroup",
      value: function searchOptionInGroup(index) {
        var searchIndex = index === -1 ? {
          group: 0,
          option: -1
        } : index;
        var visibleOptions = this.getVisibleOptions();

        for (var i = searchIndex.group; i < visibleOptions.length; i++) {
          var groupOptions = this.getOptionGroupChildren(visibleOptions[i]);

          for (var j = searchIndex.group === i ? searchIndex.option + 1 : 0; j < groupOptions.length; j++) {
            if (this.matchesSearchValue(groupOptions[j])) {
              return groupOptions[j];
            }
          }
        }

        for (var _i = 0; _i <= searchIndex.group; _i++) {
          var _groupOptions = this.getOptionGroupChildren(visibleOptions[_i]);

          for (var _j = 0; _j < (searchIndex.group === _i ? searchIndex.option : _groupOptions.length); _j++) {
            if (this.matchesSearchValue(_groupOptions[_j])) {
              return _groupOptions[_j];
            }
          }
        }

        return null;
      }
    }, {
      key: "matchesSearchValue",
      value: function matchesSearchValue(option) {
        var label = this.getOptionLabel(option).toLocaleLowerCase(this.props.filterLocale);
        return label.startsWith(this.searchValue.toLocaleLowerCase(this.props.filterLocale));
      }
    }, {
      key: "onEditableInputChange",
      value: function onEditableInputChange(event) {
        if (this.props.onChange) {
          this.props.onChange({
            originalEvent: event.originalEvent,
            value: event.target.value,
            stopPropagation: function stopPropagation() {},
            preventDefault: function preventDefault() {},
            target: {
              name: this.props.name,
              id: this.props.id,
              value: event.target.value
            }
          });
        }
      }
    }, {
      key: "onEditableInputFocus",
      value: function onEditableInputFocus(event) {
        var _this5 = this;

        event.persist();
        this.setState({
          focused: true
        }, function () {
          _this5.hideOverlay();

          if (_this5.props.onFocus) {
            _this5.props.onFocus(event);
          }
        });
      }
    }, {
      key: "onOptionClick",
      value: function onOptionClick(event) {
        var option = event.option;

        if (!option.disabled) {
          this.selectItem(event);
          this.focusInput.focus();
        }

        this.hideOverlay();
      }
    }, {
      key: "onFilterInputChange",
      value: function onFilterInputChange(event) {
        var _this6 = this;

        var filter = event.target.value;
        this.setState({
          filter: filter
        }, function () {
          if (_this6.props.onFilter) {
            _this6.props.onFilter({
              originalEvent: event,
              filter: filter
            });
          }
        });
      }
    }, {
      key: "onFilterClearIconClick",
      value: function onFilterClearIconClick(callback) {
        this.resetFilter(callback);
      }
    }, {
      key: "resetFilter",
      value: function resetFilter(callback) {
        var _this7 = this;

        var filter = '';
        this.setState({
          filter: filter
        }, function () {
          _this7.props.onFilter && _this7.props.onFilter({
            filter: filter
          });
          callback && callback();
        });
      }
    }, {
      key: "clear",
      value: function clear(event) {
        if (this.props.onChange) {
          this.props.onChange({
            originalEvent: event,
            value: undefined,
            stopPropagation: function stopPropagation() {},
            preventDefault: function preventDefault() {},
            target: {
              name: this.props.name,
              id: this.props.id,
              value: undefined
            }
          });
        }

        this.updateEditableLabel();
      }
    }, {
      key: "selectItem",
      value: function selectItem(event) {
        var currentSelectedOption = this.getSelectedOption();

        if (currentSelectedOption !== event.option) {
          this.updateEditableLabel(event.option);
          var optionValue = this.getOptionValue(event.option);

          if (this.props.onChange) {
            this.props.onChange({
              originalEvent: event.originalEvent,
              value: optionValue,
              stopPropagation: function stopPropagation() {},
              preventDefault: function preventDefault() {},
              target: {
                name: this.props.name,
                id: this.props.id,
                value: optionValue
              }
            });
          }
        }
      }
    }, {
      key: "getSelectedOption",
      value: function getSelectedOption() {
        var index = this.getSelectedOptionIndex();
        var visibleOptions = this.getVisibleOptions();
        return index !== -1 ? this.props.optionGroupLabel ? this.getOptionGroupChildren(visibleOptions[index.group])[index.option] : visibleOptions[index] : null;
      }
    }, {
      key: "getSelectedOptionIndex",
      value: function getSelectedOptionIndex() {
        var visibleOptions = this.getVisibleOptions();

        if (this.props.value != null && visibleOptions) {
          if (this.props.optionGroupLabel) {
            for (var i = 0; i < visibleOptions.length; i++) {
              var selectedOptionIndex = this.findOptionIndexInList(this.props.value, this.getOptionGroupChildren(visibleOptions[i]));

              if (selectedOptionIndex !== -1) {
                return {
                  group: i,
                  option: selectedOptionIndex
                };
              }
            }
          } else {
            return this.findOptionIndexInList(this.props.value, visibleOptions);
          }
        }

        return -1;
      }
    }, {
      key: "findOptionIndexInList",
      value: function findOptionIndexInList(value, list) {
        var key = this.equalityKey();

        for (var i = 0; i < list.length; i++) {
          if (utils.ObjectUtils.equals(value, this.getOptionValue(list[i]), key)) {
            return i;
          }
        }

        return -1;
      }
    }, {
      key: "isSelected",
      value: function isSelected(option) {
        return utils.ObjectUtils.equals(this.props.value, this.getOptionValue(option), this.equalityKey());
      }
    }, {
      key: "equalityKey",
      value: function equalityKey() {
        return this.props.optionValue ? null : this.props.dataKey;
      }
    }, {
      key: "showOverlay",
      value: function showOverlay() {
        this.setState({
          overlayVisible: true
        });
      }
    }, {
      key: "hideOverlay",
      value: function hideOverlay() {
        this.setState({
          overlayVisible: false
        });
      }
    }, {
      key: "onOverlayEnter",
      value: function onOverlayEnter(callback) {
        utils.ZIndexUtils.set('overlay', this.overlayRef.current, PrimeReact__default["default"].autoZIndex, PrimeReact__default["default"].zIndex['overlay']);
        this.alignOverlay();
        callback && callback();
      }
    }, {
      key: "onOverlayEntered",
      value: function onOverlayEntered(callback) {
        this.bindDocumentClickListener();
        this.bindScrollListener();
        this.bindResizeListener();
        callback && callback();
        this.props.onShow && this.props.onShow();
      }
    }, {
      key: "onOverlayExit",
      value: function onOverlayExit() {
        this.unbindDocumentClickListener();
        this.unbindScrollListener();
        this.unbindResizeListener();
      }
    }, {
      key: "onOverlayExited",
      value: function onOverlayExited() {
        if (this.props.filter && this.props.resetFilterOnHide) {
          this.resetFilter();
        }

        utils.ZIndexUtils.clear(this.overlayRef.current);
        this.props.onHide && this.props.onHide();
      }
    }, {
      key: "alignOverlay",
      value: function alignOverlay() {
        utils.DomHandler.alignOverlay(this.overlayRef.current, this.input.parentElement, this.props.appendTo || PrimeReact__default["default"].appendTo);
      }
    }, {
      key: "scrollInView",
      value: function scrollInView() {
        var highlightItem = utils.DomHandler.findSingle(this.overlayRef.current, 'li.p-highlight');

        if (highlightItem) {
          highlightItem.scrollIntoView({
            block: 'nearest',
            inline: 'start'
          });
        }
      }
    }, {
      key: "bindDocumentClickListener",
      value: function bindDocumentClickListener() {
        var _this8 = this;

        if (!this.documentClickListener) {
          this.documentClickListener = function (event) {
            if (_this8.state.overlayVisible && _this8.isOutsideClicked(event)) {
              _this8.hideOverlay();
            }
          };

          document.addEventListener('click', this.documentClickListener);
        }
      }
    }, {
      key: "unbindDocumentClickListener",
      value: function unbindDocumentClickListener() {
        if (this.documentClickListener) {
          document.removeEventListener('click', this.documentClickListener);
          this.documentClickListener = null;
        }
      }
    }, {
      key: "bindScrollListener",
      value: function bindScrollListener() {
        var _this9 = this;

        if (!this.scrollHandler) {
          this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.container, function () {
            if (_this9.state.overlayVisible) {
              _this9.hideOverlay();
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
      key: "bindResizeListener",
      value: function bindResizeListener() {
        var _this10 = this;

        if (!this.resizeListener) {
          this.resizeListener = function () {
            if (_this10.state.overlayVisible && !utils.DomHandler.isTouchDevice()) {
              _this10.hideOverlay();
            }
          };

          window.addEventListener('resize', this.resizeListener);
        }
      }
    }, {
      key: "unbindResizeListener",
      value: function unbindResizeListener() {
        if (this.resizeListener) {
          window.removeEventListener('resize', this.resizeListener);
          this.resizeListener = null;
        }
      }
    }, {
      key: "isOutsideClicked",
      value: function isOutsideClicked(event) {
        return this.container && !(this.container.isSameNode(event.target) || this.isClearClicked(event) || this.container.contains(event.target) || this.overlayRef && this.overlayRef.current.contains(event.target));
      }
    }, {
      key: "isClearClicked",
      value: function isClearClicked(event) {
        return utils.DomHandler.hasClass(event.target, 'p-dropdown-clear-icon') || utils.DomHandler.hasClass(event.target, 'p-dropdown-filter-clear-icon');
      }
    }, {
      key: "updateEditableLabel",
      value: function updateEditableLabel(option) {
        if (this.input) {
          this.input.value = option ? this.getOptionLabel(option) : this.props.value || '';
        }
      }
    }, {
      key: "hasFilter",
      value: function hasFilter() {
        return this.state.filter && this.state.filter.trim().length > 0;
      }
    }, {
      key: "getOptionLabel",
      value: function getOptionLabel(option) {
        return this.props.optionLabel ? utils.ObjectUtils.resolveFieldData(option, this.props.optionLabel) : option && option['label'] !== undefined ? option['label'] : option;
      }
    }, {
      key: "getOptionValue",
      value: function getOptionValue(option) {
        return this.props.optionValue ? utils.ObjectUtils.resolveFieldData(option, this.props.optionValue) : option && option['value'] !== undefined ? option['value'] : option;
      }
    }, {
      key: "getOptionRenderKey",
      value: function getOptionRenderKey(option) {
        return this.props.dataKey ? utils.ObjectUtils.resolveFieldData(option, this.props.dataKey) : this.getOptionLabel(option);
      }
    }, {
      key: "isOptionDisabled",
      value: function isOptionDisabled(option) {
        if (this.props.optionDisabled) {
          return utils.ObjectUtils.isFunction(this.props.optionDisabled) ? this.props.optionDisabled(option) : utils.ObjectUtils.resolveFieldData(option, this.props.optionDisabled);
        }

        return option && option['disabled'] !== undefined ? option['disabled'] : false;
      }
    }, {
      key: "getOptionGroupRenderKey",
      value: function getOptionGroupRenderKey(optionGroup) {
        return utils.ObjectUtils.resolveFieldData(optionGroup, this.props.optionGroupLabel);
      }
    }, {
      key: "getOptionGroupLabel",
      value: function getOptionGroupLabel(optionGroup) {
        return utils.ObjectUtils.resolveFieldData(optionGroup, this.props.optionGroupLabel);
      }
    }, {
      key: "getOptionGroupChildren",
      value: function getOptionGroupChildren(optionGroup) {
        return utils.ObjectUtils.resolveFieldData(optionGroup, this.props.optionGroupChildren);
      }
    }, {
      key: "checkValidity",
      value: function checkValidity() {
        return this.inputRef.current.checkValidity();
      }
    }, {
      key: "isLazy",
      value: function isLazy() {
        return this.props.virtualScrollerOptions && this.props.virtualScrollerOptions.lazy;
      }
    }, {
      key: "getVisibleOptions",
      value: function getVisibleOptions() {
        if (this.hasFilter() && !this.isLazy()) {
          var filterValue = this.state.filter.trim().toLocaleLowerCase(this.props.filterLocale);
          var searchFields = this.props.filterBy ? this.props.filterBy.split(',') : [this.props.optionLabel || 'label'];

          if (this.props.optionGroupLabel) {
            var filteredGroups = [];

            var _iterator = _createForOfIteratorHelper(this.props.options),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var optgroup = _step.value;
                var filteredSubOptions = PrimeReact.FilterService.filter(this.getOptionGroupChildren(optgroup), searchFields, filterValue, this.props.filterMatchMode, this.props.filterLocale);

                if (filteredSubOptions && filteredSubOptions.length) {
                  filteredGroups.push(_objectSpread(_objectSpread({}, optgroup), {
                    items: filteredSubOptions
                  }));
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            return filteredGroups;
          } else {
            return PrimeReact.FilterService.filter(this.props.options, searchFields, filterValue, this.props.filterMatchMode, this.props.filterLocale);
          }
        } else {
          return this.props.options;
        }
      }
    }, {
      key: "updateInputField",
      value: function updateInputField() {
        if (this.props.editable && this.input) {
          var selectedOption = this.getSelectedOption();
          var label = selectedOption ? this.getOptionLabel(selectedOption) : null;
          var value = label || this.props.value || '';
          this.input.value = value;
        }
      }
    }, {
      key: "updateInputRef",
      value: function updateInputRef() {
        var ref = this.props.inputRef;

        if (ref) {
          if (typeof ref === 'function') {
            ref(this.inputRef.current);
          } else {
            ref.current = this.inputRef.current;
          }
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.updateInputRef();

        if (this.props.autoFocus && this.focusInput) {
          this.focusInput.focus();
        }

        if (this.props.tooltip) {
          this.renderTooltip();
        }

        this.updateInputField();
        this.inputRef.current.selectedIndex = 1;
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.unbindDocumentClickListener();
        this.unbindResizeListener();

        if (this.scrollHandler) {
          this.scrollHandler.destroy();
          this.scrollHandler = null;
        }

        if (this.tooltip) {
          this.tooltip.destroy();
          this.tooltip = null;
        }

        if (this.hideTimeout) {
          clearTimeout(this.hideTimeout);
          this.hideTimeout = null;
        }

        utils.ZIndexUtils.clear(this.overlayRef.current);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (this.state.overlayVisible) {
          if (this.props.filter) {
            this.alignOverlay();
          }

          if (prevProps.value !== this.props.value) {
            this.scrollInView();
          }
        }

        if (prevProps.tooltip !== this.props.tooltip || prevProps.tooltipOptions !== this.props.tooltipOptions) {
          if (this.tooltip) this.tooltip.update(_objectSpread({
            content: this.props.tooltip
          }, this.props.tooltipOptions || {}));else this.renderTooltip();
        }

        if (this.state.filter && (!this.props.options || this.props.options.length === 0)) {
          this.setState({
            filter: ''
          });
        }

        this.updateInputField();
        this.inputRef.current.selectedIndex = 1;
      }
    }, {
      key: "renderHiddenSelect",
      value: function renderHiddenSelect(selectedOption) {
        var placeHolderOption = /*#__PURE__*/React__default["default"].createElement("option", {
          value: ""
        }, this.props.placeholder);
        var option = selectedOption ? /*#__PURE__*/React__default["default"].createElement("option", {
          value: selectedOption.value
        }, this.getOptionLabel(selectedOption)) : null;
        return /*#__PURE__*/React__default["default"].createElement("div", {
          className: "p-hidden-accessible p-dropdown-hidden-select"
        }, /*#__PURE__*/React__default["default"].createElement("select", {
          ref: this.inputRef,
          required: this.props.required,
          name: this.props.name,
          tabIndex: -1,
          "aria-hidden": "true"
        }, placeHolderOption, option));
      }
    }, {
      key: "renderTooltip",
      value: function renderTooltip() {
        this.tooltip = tooltip.tip({
          target: this.container,
          content: this.props.tooltip,
          options: this.props.tooltipOptions
        });
      }
    }, {
      key: "renderKeyboardHelper",
      value: function renderKeyboardHelper() {
        var _this11 = this;

        return /*#__PURE__*/React__default["default"].createElement("div", {
          className: "p-hidden-accessible"
        }, /*#__PURE__*/React__default["default"].createElement("input", {
          ref: function ref(el) {
            return _this11.focusInput = el;
          },
          id: this.props.inputId,
          type: "text",
          readOnly: true,
          "aria-haspopup": "listbox",
          onFocus: this.onInputFocus,
          onBlur: this.onInputBlur,
          onKeyDown: this.onInputKeyDown,
          disabled: this.props.disabled,
          tabIndex: this.props.tabIndex,
          "aria-label": this.props.ariaLabel,
          "aria-labelledby": this.props.ariaLabelledBy
        }));
      }
    }, {
      key: "renderLabel",
      value: function renderLabel(selectedOption) {
        var _this12 = this;

        var label = utils.ObjectUtils.isNotEmpty(selectedOption) ? this.getOptionLabel(selectedOption) : null;

        if (this.props.editable) {
          var value = label || this.props.value || '';
          return /*#__PURE__*/React__default["default"].createElement("input", {
            ref: function ref(el) {
              return _this12.input = el;
            },
            type: "text",
            defaultValue: value,
            className: "p-dropdown-label p-inputtext",
            disabled: this.props.disabled,
            placeholder: this.props.placeholder,
            maxLength: this.props.maxLength,
            onInput: this.onEditableInputChange,
            onFocus: this.onEditableInputFocus,
            onBlur: this.onInputBlur,
            "aria-label": this.props.ariaLabel,
            "aria-labelledby": this.props.ariaLabelledBy,
            "aria-haspopup": "listbox"
          });
        } else {
          var className = utils.classNames('p-dropdown-label p-inputtext', {
            'p-placeholder': label === null && this.props.placeholder,
            'p-dropdown-label-empty': label === null && !this.props.placeholder
          });
          var content = this.props.valueTemplate ? utils.ObjectUtils.getJSXElement(this.props.valueTemplate, selectedOption, this.props) : label || this.props.placeholder || 'empty';
          return /*#__PURE__*/React__default["default"].createElement("span", {
            ref: function ref(el) {
              return _this12.input = el;
            },
            className: className
          }, content);
        }
      }
    }, {
      key: "renderClearIcon",
      value: function renderClearIcon() {
        if (this.props.value != null && this.props.showClear && !this.props.disabled) {
          return /*#__PURE__*/React__default["default"].createElement("i", {
            className: "p-dropdown-clear-icon pi pi-times",
            onClick: this.clear
          });
        }

        return null;
      }
    }, {
      key: "renderDropdownIcon",
      value: function renderDropdownIcon() {
        var _this13 = this;

        var iconClassName = utils.classNames('p-dropdown-trigger-icon p-clickable', this.props.dropdownIcon);
        return /*#__PURE__*/React__default["default"].createElement("div", {
          ref: function ref(el) {
            return _this13.trigger = el;
          },
          className: "p-dropdown-trigger",
          role: "button",
          "aria-haspopup": "listbox",
          "aria-expanded": this.state.overlayVisible
        }, /*#__PURE__*/React__default["default"].createElement("span", {
          className: iconClassName
        }));
      }
    }, {
      key: "render",
      value: function render() {
        var _this14 = this;

        var className = utils.classNames('p-dropdown p-component p-inputwrapper', this.props.className, {
          'p-disabled': this.props.disabled,
          'p-focus': this.state.focused,
          'p-dropdown-clearable': this.props.showClear && !this.props.disabled,
          'p-inputwrapper-filled': this.props.value,
          'p-inputwrapper-focus': this.state.focused || this.state.overlayVisible
        });
        var visibleOptions = this.getVisibleOptions();
        var selectedOption = this.getSelectedOption();
        var appendTo = this.props.appendTo || PrimeReact__default["default"].appendTo;
        var hiddenSelect = this.renderHiddenSelect(selectedOption);
        var keyboardHelper = this.renderKeyboardHelper();
        var labelElement = this.renderLabel(selectedOption);
        var dropdownIcon = this.renderDropdownIcon();
        var clearIcon = this.renderClearIcon();
        return /*#__PURE__*/React__default["default"].createElement("div", {
          id: this.props.id,
          ref: function ref(el) {
            return _this14.container = el;
          },
          className: className,
          style: this.props.style,
          onClick: this.onClick,
          onMouseDown: this.props.onMouseDown,
          onContextMenu: this.props.onContextMenu
        }, keyboardHelper, hiddenSelect, labelElement, clearIcon, dropdownIcon, /*#__PURE__*/React__default["default"].createElement(DropdownPanel, _extends({
          ref: this.overlayRef,
          visibleOptions: visibleOptions
        }, this.props, {
          appendTo: appendTo,
          onClick: this.onPanelClick,
          onOptionClick: this.onOptionClick,
          filterValue: this.state.filter,
          hasFilter: this.hasFilter,
          onFilterClearIconClick: this.onFilterClearIconClick,
          onFilterInputKeyDown: this.onFilterInputKeyDown,
          onFilterInputChange: this.onFilterInputChange,
          getOptionLabel: this.getOptionLabel,
          getOptionRenderKey: this.getOptionRenderKey,
          isOptionDisabled: this.isOptionDisabled,
          getOptionGroupChildren: this.getOptionGroupChildren,
          getOptionGroupLabel: this.getOptionGroupLabel,
          getOptionGroupRenderKey: this.getOptionGroupRenderKey,
          isSelected: this.isSelected,
          getSelectedOptionIndex: this.getSelectedOptionIndex,
          in: this.state.overlayVisible,
          onEnter: this.onOverlayEnter,
          onEntered: this.onOverlayEntered,
          onExit: this.onOverlayExit,
          onExited: this.onOverlayExited
        })));
      }
    }]);

    return Dropdown;
  }(React.Component);

  _defineProperty(Dropdown, "defaultProps", {
    id: null,
    inputRef: null,
    name: null,
    value: null,
    options: null,
    optionLabel: null,
    optionValue: null,
    optionDisabled: null,
    optionGroupLabel: null,
    optionGroupChildren: null,
    optionGroupTemplate: null,
    valueTemplate: null,
    itemTemplate: null,
    style: null,
    className: null,
    virtualScrollerOptions: null,
    scrollHeight: '200px',
    filter: false,
    filterBy: null,
    filterMatchMode: 'contains',
    filterPlaceholder: null,
    filterLocale: undefined,
    emptyMessage: null,
    emptyFilterMessage: null,
    editable: false,
    placeholder: null,
    required: false,
    disabled: false,
    appendTo: null,
    tabIndex: null,
    autoFocus: false,
    filterInputAutoFocus: true,
    resetFilterOnHide: false,
    showFilterClear: false,
    panelClassName: null,
    panelStyle: null,
    dataKey: null,
    inputId: null,
    showClear: false,
    maxLength: null,
    tooltip: null,
    tooltipOptions: null,
    ariaLabel: null,
    ariaLabelledBy: null,
    transitionOptions: null,
    dropdownIcon: 'pi pi-chevron-down',
    showOnFocus: false,
    onChange: null,
    onFocus: null,
    onBlur: null,
    onMouseDown: null,
    onContextMenu: null,
    onShow: null,
    onHide: null,
    onFilter: null
  });

  exports.Dropdown = Dropdown;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils, primereact.ripple, primereact.csstransition, primereact.portal, primereact.virtualscroller, primereact.api, primereact.tooltip, primereact.overlayservice);

this.primereact = this.primereact || {};
this.primereact.dialog = (function (exports, React, utils, csstransition, ripple, portal, PrimeReact) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
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

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

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

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var Dialog = /*#__PURE__*/function (_Component) {
    _inherits(Dialog, _Component);

    var _super = _createSuper(Dialog);

    function Dialog(props) {
      var _this;

      _classCallCheck(this, Dialog);

      _this = _super.call(this, props);
      _this.state = {
        id: props.id,
        maskVisible: props.visible,
        visible: false
      };

      if (!_this.props.onMaximize) {
        _this.state.maximized = props.maximized;
      }

      _this.onClose = _this.onClose.bind(_assertThisInitialized(_this));
      _this.toggleMaximize = _this.toggleMaximize.bind(_assertThisInitialized(_this));
      _this.onDragStart = _this.onDragStart.bind(_assertThisInitialized(_this));
      _this.onResizeStart = _this.onResizeStart.bind(_assertThisInitialized(_this));
      _this.onMaskClick = _this.onMaskClick.bind(_assertThisInitialized(_this));
      _this.onEnter = _this.onEnter.bind(_assertThisInitialized(_this));
      _this.onEntered = _this.onEntered.bind(_assertThisInitialized(_this));
      _this.onExiting = _this.onExiting.bind(_assertThisInitialized(_this));
      _this.onExited = _this.onExited.bind(_assertThisInitialized(_this));
      _this.attributeSelector = utils.UniqueComponentId();
      _this.dialogRef = /*#__PURE__*/React__default["default"].createRef();
      return _this;
    }

    _createClass(Dialog, [{
      key: "onClose",
      value: function onClose(event) {
        this.props.onHide();
        event.preventDefault();
      }
    }, {
      key: "focus",
      value: function focus() {
        var activeElement = document.activeElement;
        var isActiveElementInDialog = activeElement && this.dialogRef && this.dialogRef.current.contains(activeElement);

        if (!isActiveElementInDialog && this.props.closable && this.props.showHeader) {
          this.closeElement.focus();
        }
      }
    }, {
      key: "onMaskClick",
      value: function onMaskClick(event) {
        if (this.props.dismissableMask && this.props.modal && this.mask === event.target) {
          this.onClose(event);
        }

        this.props.onMaskClick && this.props.onMaskClick(event);
      }
    }, {
      key: "toggleMaximize",
      value: function toggleMaximize(event) {
        var maximized = !this.maximized;

        if (this.props.onMaximize) {
          this.props.onMaximize({
            originalEvent: event,
            maximized: maximized
          });
        } else {
          this.setState({
            maximized: maximized
          }, this.changeScrollOnMaximizable);
        }

        event.preventDefault();
      }
    }, {
      key: "onDragStart",
      value: function onDragStart(event) {
        if (utils.DomHandler.hasClass(event.target, 'p-dialog-header-icon') || utils.DomHandler.hasClass(event.target.parentElement, 'p-dialog-header-icon')) {
          return;
        }

        if (this.props.draggable) {
          this.dragging = true;
          this.lastPageX = event.pageX;
          this.lastPageY = event.pageY;
          this.dialogEl.style.margin = '0';
          utils.DomHandler.addClass(document.body, 'p-unselectable-text');

          if (this.props.onDragStart) {
            this.props.onDragStart(event);
          }
        }
      }
    }, {
      key: "onDrag",
      value: function onDrag(event) {
        if (this.dragging) {
          var width = utils.DomHandler.getOuterWidth(this.dialogEl);
          var height = utils.DomHandler.getOuterHeight(this.dialogEl);
          var deltaX = event.pageX - this.lastPageX;
          var deltaY = event.pageY - this.lastPageY;
          var offset = this.dialogEl.getBoundingClientRect();
          var leftPos = offset.left + deltaX;
          var topPos = offset.top + deltaY;
          var viewport = utils.DomHandler.getViewport();
          this.dialogEl.style.position = 'fixed';

          if (this.props.keepInViewport) {
            if (leftPos >= this.props.minX && leftPos + width < viewport.width) {
              this.lastPageX = event.pageX;
              this.dialogEl.style.left = leftPos + 'px';
            }

            if (topPos >= this.props.minY && topPos + height < viewport.height) {
              this.lastPageY = event.pageY;
              this.dialogEl.style.top = topPos + 'px';
            }
          } else {
            this.lastPageX = event.pageX;
            this.dialogEl.style.left = leftPos + 'px';
            this.lastPageY = event.pageY;
            this.dialogEl.style.top = topPos + 'px';
          }

          if (this.props.onDrag) {
            this.props.onDrag(event);
          }
        }
      }
    }, {
      key: "onDragEnd",
      value: function onDragEnd(event) {
        if (this.dragging) {
          this.dragging = false;
          utils.DomHandler.removeClass(document.body, 'p-unselectable-text');

          if (this.props.onDragEnd) {
            this.props.onDragEnd(event);
          }
        }
      }
    }, {
      key: "onResizeStart",
      value: function onResizeStart(event) {
        if (this.props.resizable) {
          this.resizing = true;
          this.lastPageX = event.pageX;
          this.lastPageY = event.pageY;
          utils.DomHandler.addClass(document.body, 'p-unselectable-text');

          if (this.props.onResizeStart) {
            this.props.onResizeStart(event);
          }
        }
      }
    }, {
      key: "convertToPx",
      value: function convertToPx(value, property, viewport) {
        !viewport && (viewport = utils.DomHandler.getViewport());
        var val = parseInt(value);

        if (/^(\d+|(\.\d+))(\.\d+)?%$/.test(value)) {
          return val * (viewport[property] / 100);
        }

        return val;
      }
    }, {
      key: "onResize",
      value: function onResize(event) {
        if (this.resizing) {
          var deltaX = event.pageX - this.lastPageX;
          var deltaY = event.pageY - this.lastPageY;
          var width = utils.DomHandler.getOuterWidth(this.dialogEl);
          var height = utils.DomHandler.getOuterHeight(this.dialogEl);
          var offset = this.dialogEl.getBoundingClientRect();
          var viewport = utils.DomHandler.getViewport();
          var newWidth = width + deltaX;
          var newHeight = height + deltaY;
          var minWidth = this.convertToPx(this.dialogEl.style.minWidth, 'width', viewport);
          var minHeight = this.convertToPx(this.dialogEl.style.minHeight, 'height', viewport);
          var hasBeenDragged = !parseInt(this.dialogEl.style.top) || !parseInt(this.dialogEl.style.left);

          if (hasBeenDragged) {
            newWidth += deltaX;
            newHeight += deltaY;
          }

          if ((!minWidth || newWidth > minWidth) && offset.left + newWidth < viewport.width) {
            this.dialogEl.style.width = newWidth + 'px';
          }

          if ((!minHeight || newHeight > minHeight) && offset.top + newHeight < viewport.height) {
            this.dialogEl.style.height = newHeight + 'px';
          }

          this.lastPageX = event.pageX;
          this.lastPageY = event.pageY;

          if (this.props.onResize) {
            this.props.onResize(event);
          }
        }
      }
    }, {
      key: "onResizeEnd",
      value: function onResizeEnd(event) {
        if (this.resizing) {
          this.resizing = false;
          utils.DomHandler.removeClass(document.body, 'p-unselectable-text');

          if (this.props.onResizeEnd) {
            this.props.onResizeEnd(event);
          }
        }
      }
    }, {
      key: "resetPosition",
      value: function resetPosition() {
        this.dialogEl.style.position = '';
        this.dialogEl.style.left = '';
        this.dialogEl.style.top = '';
        this.dialogEl.style.margin = '';
      }
    }, {
      key: "getPositionClass",
      value: function getPositionClass() {
        var _this2 = this;

        var positions = ['center', 'left', 'right', 'top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right'];
        var pos = positions.find(function (item) {
          return item === _this2.props.position || item.replace('-', '') === _this2.props.position;
        });
        return pos ? "p-dialog-".concat(pos) : '';
      }
    }, {
      key: "maximized",
      get: function get() {
        return this.props.onMaximize ? this.props.maximized : this.state.maximized;
      }
    }, {
      key: "dialogEl",
      get: function get() {
        return this.dialogRef.current;
      }
    }, {
      key: "onEnter",
      value: function onEnter() {
        this.dialogEl.setAttribute(this.attributeSelector, '');
      }
    }, {
      key: "onEntered",
      value: function onEntered() {
        if (this.props.onShow) {
          this.props.onShow();
        }

        if (this.props.focusOnShow) {
          this.focus();
        }

        this.enableDocumentSettings();
      }
    }, {
      key: "onExiting",
      value: function onExiting() {
        if (this.props.modal) {
          utils.DomHandler.addClass(this.mask, 'p-component-overlay-leave');
        }
      }
    }, {
      key: "onExited",
      value: function onExited() {
        this.dragging = false;
        utils.ZIndexUtils.clear(this.mask);
        this.setState({
          maskVisible: false
        });
        this.disableDocumentSettings();
      }
    }, {
      key: "enableDocumentSettings",
      value: function enableDocumentSettings() {
        this.bindGlobalListeners();

        if (this.props.blockScroll || this.props.maximizable && this.maximized) {
          utils.DomHandler.addClass(document.body, 'p-overflow-hidden');
        }
      }
    }, {
      key: "disableDocumentSettings",
      value: function disableDocumentSettings() {
        this.unbindGlobalListeners();

        if (this.props.modal) {
          var hasBlockScroll = document.primeDialogParams && document.primeDialogParams.some(function (param) {
            return param.hasBlockScroll;
          });

          if (!hasBlockScroll) {
            utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
          }
        } else if (this.props.blockScroll || this.props.maximizable && this.maximized) {
          utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
        }
      }
    }, {
      key: "bindGlobalListeners",
      value: function bindGlobalListeners() {
        if (this.props.draggable) {
          this.bindDocumentDragListener();
        }

        if (this.props.resizable) {
          this.bindDocumentResizeListeners();
        }

        if (this.props.closable) {
          this.bindDocumentKeyDownListener();
        }
      }
    }, {
      key: "unbindGlobalListeners",
      value: function unbindGlobalListeners() {
        this.unbindDocumentDragListener();
        this.unbindDocumentResizeListeners();
        this.unbindDocumentKeyDownListener();
      }
    }, {
      key: "bindDocumentDragListener",
      value: function bindDocumentDragListener() {
        this.documentDragListener = this.onDrag.bind(this);
        this.documentDragEndListener = this.onDragEnd.bind(this);
        window.document.addEventListener('mousemove', this.documentDragListener);
        window.document.addEventListener('mouseup', this.documentDragEndListener);
      }
    }, {
      key: "unbindDocumentDragListener",
      value: function unbindDocumentDragListener() {
        if (this.documentDragListener && this.documentDragEndListener) {
          window.document.removeEventListener('mousemove', this.documentDragListener);
          window.document.removeEventListener('mouseup', this.documentDragEndListener);
          this.documentDragListener = null;
          this.documentDragEndListener = null;
        }
      }
    }, {
      key: "bindDocumentResizeListeners",
      value: function bindDocumentResizeListeners() {
        this.documentResizeListener = this.onResize.bind(this);
        this.documentResizeEndListener = this.onResizeEnd.bind(this);
        window.document.addEventListener('mousemove', this.documentResizeListener);
        window.document.addEventListener('mouseup', this.documentResizeEndListener);
      }
    }, {
      key: "unbindDocumentResizeListeners",
      value: function unbindDocumentResizeListeners() {
        if (this.documentResizeListener && this.documentResizeEndListener) {
          window.document.removeEventListener('mousemove', this.documentResizeListener);
          window.document.removeEventListener('mouseup', this.documentResizeEndListener);
          this.documentResizeListener = null;
          this.documentResizeEndListener = null;
        }
      }
    }, {
      key: "bindDocumentKeyDownListener",
      value: function bindDocumentKeyDownListener() {
        var _this3 = this;

        this.documentKeyDownListener = function (event) {
          var currentTarget = event.currentTarget;

          if (currentTarget && currentTarget.primeDialogParams) {
            var params = currentTarget.primeDialogParams;
            var paramLength = params.length;
            var dialogId = params[paramLength - 1] ? params[paramLength - 1].id : undefined;

            if (dialogId === _this3.state.id && _this3.props.closeOnEscape) {
              var dialog = document.getElementById(dialogId);

              if (event.which === 27) {
                _this3.onClose(event);

                event.stopImmediatePropagation();
                params.splice(paramLength - 1, 1);
              } else if (event.which === 9) {
                event.preventDefault();
                var focusableElements = utils.DomHandler.getFocusableElements(dialog);

                if (focusableElements && focusableElements.length > 0) {
                  if (!document.activeElement) {
                    focusableElements[0].focus();
                  } else {
                    var focusedIndex = focusableElements.indexOf(document.activeElement);

                    if (event.shiftKey) {
                      if (focusedIndex === -1 || focusedIndex === 0) focusableElements[focusableElements.length - 1].focus();else focusableElements[focusedIndex - 1].focus();
                    } else {
                      if (focusedIndex === -1 || focusedIndex === focusableElements.length - 1) focusableElements[0].focus();else focusableElements[focusedIndex + 1].focus();
                    }
                  }
                }
              }
            }
          }
        };

        var newParam = {
          id: this.state.id,
          hasBlockScroll: this.props.blockScroll
        };
        document.primeDialogParams = document.primeDialogParams ? [].concat(_toConsumableArray(document.primeDialogParams), [newParam]) : [newParam];
        document.addEventListener('keydown', this.documentKeyDownListener);
      }
    }, {
      key: "unbindDocumentKeyDownListener",
      value: function unbindDocumentKeyDownListener() {
        var _this4 = this;

        if (this.documentKeyDownListener) {
          document.removeEventListener('keydown', this.documentKeyDownListener);
          document.primeDialogParams = document.primeDialogParams && document.primeDialogParams.filter(function (param) {
            return param.id !== _this4.state.id;
          });
          this.documentKeyDownListener = null;
        }
      }
    }, {
      key: "createStyle",
      value: function createStyle() {
        if (!this.styleElement) {
          this.styleElement = document.createElement('style');
          document.head.appendChild(this.styleElement);
          var innerHTML = '';

          for (var breakpoint in this.props.breakpoints) {
            innerHTML += "\n                    @media screen and (max-width: ".concat(breakpoint, ") {\n                        .p-dialog[").concat(this.attributeSelector, "] {\n                            width: ").concat(this.props.breakpoints[breakpoint], " !important;\n                        }\n                    }\n                ");
          }

          this.styleElement.innerHTML = innerHTML;
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this5 = this;

        if (!this.state.id) {
          this.setState({
            id: utils.UniqueComponentId()
          });
        }

        if (this.props.visible) {
          this.setState({
            visible: true
          }, function () {
            utils.ZIndexUtils.set('modal', _this5.mask, PrimeReact__default["default"].autoZIndex, _this5.props.baseZIndex || PrimeReact__default["default"].zIndex['modal']);
          });
        }

        if (this.props.breakpoints) {
          this.createStyle();
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var _this6 = this;

        if (this.props.visible && !this.state.maskVisible) {
          this.setState({
            maskVisible: true
          }, function () {
            utils.ZIndexUtils.set('modal', _this6.mask, PrimeReact__default["default"].autoZIndex, _this6.props.baseZIndex || PrimeReact__default["default"].zIndex['modal']);
          });
        }

        if (this.props.visible !== this.state.visible && this.state.maskVisible) {
          this.setState({
            visible: this.props.visible
          });
        }

        if (prevProps.maximized !== this.props.maximized && this.props.onMaximize) {
          this.changeScrollOnMaximizable();
        }
      }
    }, {
      key: "changeScrollOnMaximizable",
      value: function changeScrollOnMaximizable() {
        if (!this.props.blockScroll) {
          var funcName = this.maximized ? 'addClass' : 'removeClass';
          utils.DomHandler[funcName](document.body, 'p-overflow-hidden');
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.disableDocumentSettings();

        if (this.styleElement) {
          document.head.removeChild(this.styleElement);
          this.styleElement = null;
        }

        utils.ZIndexUtils.clear(this.mask);
      }
    }, {
      key: "renderCloseIcon",
      value: function renderCloseIcon() {
        var _this7 = this;

        if (this.props.closable) {
          return /*#__PURE__*/React__default["default"].createElement("button", {
            ref: function ref(el) {
              return _this7.closeElement = el;
            },
            type: "button",
            className: "p-dialog-header-icon p-dialog-header-close p-link",
            "aria-label": this.props.ariaCloseIconLabel,
            onClick: this.onClose
          }, /*#__PURE__*/React__default["default"].createElement("span", {
            className: "p-dialog-header-close-icon pi pi-times"
          }), /*#__PURE__*/React__default["default"].createElement(ripple.Ripple, null));
        }

        return null;
      }
    }, {
      key: "renderMaximizeIcon",
      value: function renderMaximizeIcon() {
        var iconClassName = utils.classNames('p-dialog-header-maximize-icon pi', {
          'pi-window-maximize': !this.maximized,
          'pi-window-minimize': this.maximized
        });

        if (this.props.maximizable) {
          return /*#__PURE__*/React__default["default"].createElement("button", {
            type: "button",
            className: "p-dialog-header-icon p-dialog-header-maximize p-link",
            onClick: this.toggleMaximize
          }, /*#__PURE__*/React__default["default"].createElement("span", {
            className: iconClassName
          }), /*#__PURE__*/React__default["default"].createElement(ripple.Ripple, null));
        }

        return null;
      }
    }, {
      key: "renderHeader",
      value: function renderHeader() {
        var _this8 = this;

        if (this.props.showHeader) {
          var closeIcon = this.renderCloseIcon();
          var maximizeIcon = this.renderMaximizeIcon();
          var icons = utils.ObjectUtils.getJSXElement(this.props.icons, this.props);
          var header = utils.ObjectUtils.getJSXElement(this.props.header, this.props);
          return /*#__PURE__*/React__default["default"].createElement("div", {
            ref: function ref(el) {
              return _this8.headerEl = el;
            },
            className: "p-dialog-header",
            onMouseDown: this.onDragStart
          }, /*#__PURE__*/React__default["default"].createElement("div", {
            id: this.state.id + '_header',
            className: "p-dialog-title"
          }, header), /*#__PURE__*/React__default["default"].createElement("div", {
            className: "p-dialog-header-icons"
          }, icons, maximizeIcon, closeIcon));
        }

        return null;
      }
    }, {
      key: "renderContent",
      value: function renderContent() {
        var _this9 = this;

        var contentClassName = utils.classNames('p-dialog-content', this.props.contentClassName);
        return /*#__PURE__*/React__default["default"].createElement("div", {
          id: this.state.id + '_content',
          ref: function ref(el) {
            return _this9.contentEl = el;
          },
          className: contentClassName,
          style: this.props.contentStyle
        }, this.props.children);
      }
    }, {
      key: "renderFooter",
      value: function renderFooter() {
        var _this10 = this;

        var footer = utils.ObjectUtils.getJSXElement(this.props.footer, this.props);
        return footer && /*#__PURE__*/React__default["default"].createElement("div", {
          ref: function ref(el) {
            return _this10.footerElement = el;
          },
          className: "p-dialog-footer"
        }, footer);
      }
    }, {
      key: "renderResizer",
      value: function renderResizer() {
        if (this.props.resizable) {
          return /*#__PURE__*/React__default["default"].createElement("div", {
            className: "p-resizable-handle",
            style: {
              zIndex: 90
            },
            onMouseDown: this.onResizeStart
          });
        }

        return null;
      }
    }, {
      key: "renderElement",
      value: function renderElement() {
        var _this11 = this;

        var className = utils.classNames('p-dialog p-component', this.props.className, {
          'p-dialog-rtl': this.props.rtl,
          'p-dialog-maximized': this.maximized
        });
        var maskClassName = utils.classNames('p-dialog-mask', {
          'p-component-overlay p-component-overlay-enter': this.props.modal,
          'p-dialog-visible': this.state.maskVisible,
          'p-dialog-draggable': this.props.draggable,
          'p-dialog-resizable': this.props.resizable
        }, this.props.maskClassName, this.getPositionClass());
        var header = this.renderHeader();
        var content = this.renderContent();
        var footer = this.renderFooter();
        var resizer = this.renderResizer();
        var transitionTimeout = {
          enter: this.props.position === 'center' ? 150 : 300,
          exit: this.props.position === 'center' ? 150 : 300
        };
        return /*#__PURE__*/React__default["default"].createElement("div", {
          ref: function ref(el) {
            return _this11.mask = el;
          },
          style: this.props.maskStyle,
          className: maskClassName,
          onClick: this.onMaskClick
        }, /*#__PURE__*/React__default["default"].createElement(csstransition.CSSTransition, {
          nodeRef: this.dialogRef,
          classNames: "p-dialog",
          timeout: transitionTimeout,
          in: this.state.visible,
          options: this.props.transitionOptions,
          unmountOnExit: true,
          onEnter: this.onEnter,
          onEntered: this.onEntered,
          onExiting: this.onExiting,
          onExited: this.onExited
        }, /*#__PURE__*/React__default["default"].createElement("div", {
          ref: this.dialogRef,
          id: this.state.id,
          className: className,
          style: this.props.style,
          onClick: this.props.onClick,
          role: "dialog",
          "aria-labelledby": this.state.id + '_header',
          "aria-describedby": this.state.id + '_content',
          "aria-modal": this.props.modal
        }, header, content, footer, resizer)));
      }
    }, {
      key: "render",
      value: function render() {
        if (this.state.maskVisible) {
          var element = this.renderElement();
          return /*#__PURE__*/React__default["default"].createElement(portal.Portal, {
            element: element,
            appendTo: this.props.appendTo,
            visible: true
          });
        }

        return null;
      }
    }]);

    return Dialog;
  }(React.Component);

  _defineProperty(Dialog, "defaultProps", {
    id: null,
    header: null,
    footer: null,
    visible: false,
    position: 'center',
    draggable: true,
    resizable: true,
    modal: true,
    onHide: null,
    onShow: null,
    contentStyle: null,
    contentClassName: null,
    closeOnEscape: true,
    dismissableMask: false,
    rtl: false,
    closable: true,
    style: null,
    className: null,
    maskStyle: null,
    maskClassName: null,
    showHeader: true,
    appendTo: null,
    baseZIndex: 0,
    maximizable: false,
    blockScroll: false,
    icons: null,
    ariaCloseIconLabel: 'Close',
    focusOnShow: true,
    minX: 0,
    minY: 0,
    keepInViewport: true,
    maximized: false,
    breakpoints: null,
    transitionOptions: null,
    onMaximize: null,
    onDragStart: null,
    onDrag: null,
    onDragEnd: null,
    onResizeStart: null,
    onResize: null,
    onResizeEnd: null,
    onClick: null,
    onMaskClick: null
  });

  exports.Dialog = Dialog;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils, primereact.csstransition, primereact.ripple, primereact.portal, primereact.api);

this.primereact = this.primereact || {};
this.primereact.paginator = (function (exports, React, utils, ripple, dropdown, inputnumber) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

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

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
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
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

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

  function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var FirstPageLink = /*#__PURE__*/function (_Component) {
    _inherits(FirstPageLink, _Component);

    var _super = _createSuper$8(FirstPageLink);

    function FirstPageLink() {
      _classCallCheck(this, FirstPageLink);

      return _super.apply(this, arguments);
    }

    _createClass(FirstPageLink, [{
      key: "render",
      value: function render() {
        var className = utils.classNames('p-paginator-first p-paginator-element p-link', {
          'p-disabled': this.props.disabled
        });
        var iconClassName = 'p-paginator-icon pi pi-angle-double-left';
        var element = /*#__PURE__*/React__default["default"].createElement("button", {
          type: "button",
          className: className,
          onClick: this.props.onClick,
          disabled: this.props.disabled
        }, /*#__PURE__*/React__default["default"].createElement("span", {
          className: iconClassName
        }), /*#__PURE__*/React__default["default"].createElement(ripple.Ripple, null));

        if (this.props.template) {
          var defaultOptions = {
            onClick: this.props.onClick,
            className: className,
            iconClassName: iconClassName,
            disabled: this.props.disabled,
            element: element,
            props: this.props
          };
          return utils.ObjectUtils.getJSXElement(this.props.template, defaultOptions);
        }

        return element;
      }
    }]);

    return FirstPageLink;
  }(React.Component);

  _defineProperty(FirstPageLink, "defaultProps", {
    disabled: false,
    onClick: null,
    template: null
  });

  function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var NextPageLink = /*#__PURE__*/function (_Component) {
    _inherits(NextPageLink, _Component);

    var _super = _createSuper$7(NextPageLink);

    function NextPageLink() {
      _classCallCheck(this, NextPageLink);

      return _super.apply(this, arguments);
    }

    _createClass(NextPageLink, [{
      key: "render",
      value: function render() {
        var className = utils.classNames('p-paginator-next p-paginator-element p-link', {
          'p-disabled': this.props.disabled
        });
        var iconClassName = 'p-paginator-icon pi pi-angle-right';
        var element = /*#__PURE__*/React__default["default"].createElement("button", {
          type: "button",
          className: className,
          onClick: this.props.onClick,
          disabled: this.props.disabled
        }, /*#__PURE__*/React__default["default"].createElement("span", {
          className: iconClassName
        }), /*#__PURE__*/React__default["default"].createElement(ripple.Ripple, null));

        if (this.props.template) {
          var defaultOptions = {
            onClick: this.props.onClick,
            className: className,
            iconClassName: iconClassName,
            disabled: this.props.disabled,
            element: element,
            props: this.props
          };
          return utils.ObjectUtils.getJSXElement(this.props.template, defaultOptions);
        }

        return element;
      }
    }]);

    return NextPageLink;
  }(React.Component);

  _defineProperty(NextPageLink, "defaultProps", {
    disabled: false,
    onClick: null,
    template: null
  });

  function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var PrevPageLink = /*#__PURE__*/function (_Component) {
    _inherits(PrevPageLink, _Component);

    var _super = _createSuper$6(PrevPageLink);

    function PrevPageLink() {
      _classCallCheck(this, PrevPageLink);

      return _super.apply(this, arguments);
    }

    _createClass(PrevPageLink, [{
      key: "render",
      value: function render() {
        var className = utils.classNames('p-paginator-prev p-paginator-element p-link', {
          'p-disabled': this.props.disabled
        });
        var iconClassName = 'p-paginator-icon pi pi-angle-left';
        var element = /*#__PURE__*/React__default["default"].createElement("button", {
          type: "button",
          className: className,
          onClick: this.props.onClick,
          disabled: this.props.disabled
        }, /*#__PURE__*/React__default["default"].createElement("span", {
          className: iconClassName
        }), /*#__PURE__*/React__default["default"].createElement(ripple.Ripple, null));

        if (this.props.template) {
          var defaultOptions = {
            onClick: this.props.onClick,
            className: className,
            iconClassName: iconClassName,
            disabled: this.props.disabled,
            element: element,
            props: this.props
          };
          return utils.ObjectUtils.getJSXElement(this.props.template, defaultOptions);
        }

        return element;
      }
    }]);

    return PrevPageLink;
  }(React.Component);

  _defineProperty(PrevPageLink, "defaultProps", {
    disabled: false,
    onClick: null,
    template: null
  });

  function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var LastPageLink = /*#__PURE__*/function (_Component) {
    _inherits(LastPageLink, _Component);

    var _super = _createSuper$5(LastPageLink);

    function LastPageLink() {
      _classCallCheck(this, LastPageLink);

      return _super.apply(this, arguments);
    }

    _createClass(LastPageLink, [{
      key: "render",
      value: function render() {
        var className = utils.classNames('p-paginator-last p-paginator-element p-link', {
          'p-disabled': this.props.disabled
        });
        var iconClassName = 'p-paginator-icon pi pi-angle-double-right';
        var element = /*#__PURE__*/React__default["default"].createElement("button", {
          type: "button",
          className: className,
          onClick: this.props.onClick,
          disabled: this.props.disabled
        }, /*#__PURE__*/React__default["default"].createElement("span", {
          className: iconClassName
        }), /*#__PURE__*/React__default["default"].createElement(ripple.Ripple, null));

        if (this.props.template) {
          var defaultOptions = {
            onClick: this.props.onClick,
            className: className,
            iconClassName: iconClassName,
            disabled: this.props.disabled,
            element: element,
            props: this.props
          };
          return utils.ObjectUtils.getJSXElement(this.props.template, defaultOptions);
        }

        return element;
      }
    }]);

    return LastPageLink;
  }(React.Component);

  _defineProperty(LastPageLink, "defaultProps", {
    disabled: false,
    onClick: null,
    template: null
  });

  function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var PageLinks = /*#__PURE__*/function (_Component) {
    _inherits(PageLinks, _Component);

    var _super = _createSuper$4(PageLinks);

    function PageLinks() {
      _classCallCheck(this, PageLinks);

      return _super.apply(this, arguments);
    }

    _createClass(PageLinks, [{
      key: "onPageLinkClick",
      value: function onPageLinkClick(event, pageLink) {
        if (this.props.onClick) {
          this.props.onClick({
            originalEvent: event,
            value: pageLink
          });
        }

        event.preventDefault();
      }
    }, {
      key: "render",
      value: function render() {
        var _this = this;

        var elements;

        if (this.props.value) {
          var startPageInView = this.props.value[0];
          var endPageInView = this.props.value[this.props.value.length - 1];
          elements = this.props.value.map(function (pageLink, i) {
            var className = utils.classNames('p-paginator-page p-paginator-element p-link', {
              'p-paginator-page-start': pageLink === startPageInView,
              'p-paginator-page-end': pageLink === endPageInView,
              'p-highlight': pageLink - 1 === _this.props.page
            });
            var element = /*#__PURE__*/React__default["default"].createElement("button", {
              type: "button",
              className: className,
              onClick: function onClick(e) {
                return _this.onPageLinkClick(e, pageLink);
              }
            }, pageLink, /*#__PURE__*/React__default["default"].createElement(ripple.Ripple, null));

            if (_this.props.template) {
              var defaultOptions = {
                onClick: function onClick(e) {
                  return _this.onPageLinkClick(e, pageLink);
                },
                className: className,
                view: {
                  startPage: startPageInView - 1,
                  endPage: endPageInView - 1
                },
                page: pageLink - 1,
                currentPage: _this.props.page,
                totalPages: _this.props.pageCount,
                element: element,
                props: _this.props
              };
              element = utils.ObjectUtils.getJSXElement(_this.props.template, defaultOptions);
            }

            return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, {
              key: pageLink
            }, element);
          });
        }

        return /*#__PURE__*/React__default["default"].createElement("span", {
          className: "p-paginator-pages"
        }, elements);
      }
    }]);

    return PageLinks;
  }(React.Component);

  _defineProperty(PageLinks, "defaultProps", {
    value: null,
    page: null,
    rows: null,
    pageCount: null,
    links: null,
    template: null
  });

  function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var RowsPerPageDropdown = /*#__PURE__*/function (_Component) {
    _inherits(RowsPerPageDropdown, _Component);

    var _super = _createSuper$3(RowsPerPageDropdown);

    function RowsPerPageDropdown() {
      _classCallCheck(this, RowsPerPageDropdown);

      return _super.apply(this, arguments);
    }

    _createClass(RowsPerPageDropdown, [{
      key: "hasOptions",
      value: function hasOptions() {
        return this.props.options && this.props.options.length > 0;
      }
    }, {
      key: "render",
      value: function render() {
        var hasOptions = this.hasOptions();
        var options = hasOptions ? this.props.options.map(function (opt) {
          return {
            label: String(opt),
            value: opt
          };
        }) : [];
        var element = hasOptions ? /*#__PURE__*/React__default["default"].createElement(dropdown.Dropdown, {
          value: this.props.value,
          options: options,
          onChange: this.props.onChange,
          appendTo: this.props.appendTo,
          disabled: this.props.disabled
        }) : null;

        if (this.props.template) {
          var defaultOptions = {
            value: this.props.value,
            options: options,
            onChange: this.props.onChange,
            appendTo: this.props.appendTo,
            currentPage: this.props.page,
            totalPages: this.props.pageCount,
            totalRecords: this.props.totalRecords,
            disabled: this.props.disabled,
            element: element,
            props: this.props
          };
          return utils.ObjectUtils.getJSXElement(this.props.template, defaultOptions);
        }

        return element;
      }
    }]);

    return RowsPerPageDropdown;
  }(React.Component);

  _defineProperty(RowsPerPageDropdown, "defaultProps", {
    options: null,
    value: null,
    page: null,
    pageCount: null,
    totalRecords: 0,
    appendTo: null,
    onChange: null,
    template: null,
    disabled: false
  });

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var CurrentPageReport = /*#__PURE__*/function (_Component) {
    _inherits(CurrentPageReport, _Component);

    var _super = _createSuper$2(CurrentPageReport);

    function CurrentPageReport() {
      _classCallCheck(this, CurrentPageReport);

      return _super.apply(this, arguments);
    }

    _createClass(CurrentPageReport, [{
      key: "render",
      value: function render() {
        var report = {
          currentPage: this.props.page + 1,
          totalPages: this.props.pageCount,
          first: Math.min(this.props.first + 1, this.props.totalRecords),
          last: Math.min(this.props.first + this.props.rows, this.props.totalRecords),
          rows: this.props.rows,
          totalRecords: this.props.totalRecords
        };
        var text = this.props.reportTemplate.replace("{currentPage}", report.currentPage).replace("{totalPages}", report.totalPages).replace("{first}", report.first).replace("{last}", report.last).replace("{rows}", report.rows).replace("{totalRecords}", report.totalRecords);
        var element = /*#__PURE__*/React__default["default"].createElement("span", {
          className: "p-paginator-current"
        }, text);

        if (this.props.template) {
          var defaultOptions = _objectSpread(_objectSpread({}, report), {
            className: 'p-paginator-current',
            element: element,
            props: this.props
          });

          return utils.ObjectUtils.getJSXElement(this.props.template, defaultOptions);
        }

        return element;
      }
    }]);

    return CurrentPageReport;
  }(React.Component);

  _defineProperty(CurrentPageReport, "defaultProps", {
    pageCount: null,
    page: null,
    first: null,
    rows: null,
    totalRecords: null,
    reportTemplate: '({currentPage} of {totalPages})',
    template: null
  });

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var JumpToPageInput = /*#__PURE__*/function (_Component) {
    _inherits(JumpToPageInput, _Component);

    var _super = _createSuper$1(JumpToPageInput);

    function JumpToPageInput(props) {
      var _this;

      _classCallCheck(this, JumpToPageInput);

      _this = _super.call(this, props);
      _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(JumpToPageInput, [{
      key: "onChange",
      value: function onChange(event) {
        if (this.props.onChange) {
          this.props.onChange(this.props.rows * (event.value - 1), this.props.rows);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var value = this.props.pageCount > 0 ? this.props.page + 1 : 0;
        var element = /*#__PURE__*/React__default["default"].createElement(inputnumber.InputNumber, {
          value: value,
          onChange: this.onChange,
          className: "p-paginator-page-input",
          disabled: this.props.disabled
        });

        if (this.props.template) {
          var defaultOptions = {
            value: value,
            onChange: this.onChange,
            disabled: this.props.disabled,
            className: 'p-paginator-page-input',
            element: element,
            props: this.props
          };
          return utils.ObjectUtils.getJSXElement(this.props.template, defaultOptions);
        }

        return element;
      }
    }]);

    return JumpToPageInput;
  }(React.Component);

  _defineProperty(JumpToPageInput, "defaultProps", {
    page: null,
    rows: null,
    pageCount: null,
    disabled: false,
    template: null,
    onChange: null
  });

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var Paginator = /*#__PURE__*/function (_Component) {
    _inherits(Paginator, _Component);

    var _super = _createSuper(Paginator);

    function Paginator(props) {
      var _this;

      _classCallCheck(this, Paginator);

      _this = _super.call(this, props);
      _this.changePageToFirst = _this.changePageToFirst.bind(_assertThisInitialized(_this));
      _this.changePageToPrev = _this.changePageToPrev.bind(_assertThisInitialized(_this));
      _this.changePageToNext = _this.changePageToNext.bind(_assertThisInitialized(_this));
      _this.changePageToLast = _this.changePageToLast.bind(_assertThisInitialized(_this));
      _this.onRowsChange = _this.onRowsChange.bind(_assertThisInitialized(_this));
      _this.changePage = _this.changePage.bind(_assertThisInitialized(_this));
      _this.onPageLinkClick = _this.onPageLinkClick.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(Paginator, [{
      key: "isFirstPage",
      value: function isFirstPage() {
        return this.getPage() === 0;
      }
    }, {
      key: "isLastPage",
      value: function isLastPage() {
        return this.getPage() === this.getPageCount() - 1;
      }
    }, {
      key: "getPageCount",
      value: function getPageCount() {
        return Math.ceil(this.props.totalRecords / this.props.rows);
      }
    }, {
      key: "calculatePageLinkBoundaries",
      value: function calculatePageLinkBoundaries() {
        var numberOfPages = this.getPageCount();
        var visiblePages = Math.min(this.props.pageLinkSize, numberOfPages); //calculate range, keep current in middle if necessary

        var start = Math.max(0, Math.ceil(this.getPage() - visiblePages / 2));
        var end = Math.min(numberOfPages - 1, start + visiblePages - 1); //check when approaching to last page

        var delta = this.props.pageLinkSize - (end - start + 1);
        start = Math.max(0, start - delta);
        return [start, end];
      }
    }, {
      key: "updatePageLinks",
      value: function updatePageLinks() {
        var pageLinks = [];
        var boundaries = this.calculatePageLinkBoundaries();
        var start = boundaries[0];
        var end = boundaries[1];

        for (var i = start; i <= end; i++) {
          pageLinks.push(i + 1);
        }

        return pageLinks;
      }
    }, {
      key: "changePage",
      value: function changePage(first, rows) {
        var pc = this.getPageCount();
        var p = Math.floor(first / rows);

        if (p >= 0 && p < pc) {
          var newPageState = {
            first: first,
            rows: rows,
            page: p,
            pageCount: pc
          };

          if (this.props.onPageChange) {
            this.props.onPageChange(newPageState);
          }
        }
      }
    }, {
      key: "getPage",
      value: function getPage() {
        return Math.floor(this.props.first / this.props.rows);
      }
    }, {
      key: "empty",
      value: function empty() {
        var pageCount = this.getPageCount();
        return pageCount === 0;
      }
    }, {
      key: "changePageToFirst",
      value: function changePageToFirst(event) {
        this.changePage(0, this.props.rows);
        event.preventDefault();
      }
    }, {
      key: "changePageToPrev",
      value: function changePageToPrev(event) {
        this.changePage(this.props.first - this.props.rows, this.props.rows);
        event.preventDefault();
      }
    }, {
      key: "onPageLinkClick",
      value: function onPageLinkClick(event) {
        this.changePage((event.value - 1) * this.props.rows, this.props.rows);
      }
    }, {
      key: "changePageToNext",
      value: function changePageToNext(event) {
        this.changePage(this.props.first + this.props.rows, this.props.rows);
        event.preventDefault();
      }
    }, {
      key: "changePageToLast",
      value: function changePageToLast(event) {
        this.changePage((this.getPageCount() - 1) * this.props.rows, this.props.rows);
        event.preventDefault();
      }
    }, {
      key: "onRowsChange",
      value: function onRowsChange(event) {
        var rows = event.value;
        this.isRowChanged = rows !== this.props.rows;
        this.changePage(0, rows);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        if (this.props.rows !== prevProps.rows && !this.isRowChanged) {
          this.changePage(0, this.props.rows);
        } else if (this.getPage() > 0 && prevProps.totalRecords !== this.props.totalRecords && this.props.first >= this.props.totalRecords) {
          this.changePage((this.getPageCount() - 1) * this.props.rows, this.props.rows);
        }

        this.isRowChanged = false;
      }
    }, {
      key: "renderElement",
      value: function renderElement(key, template) {
        var element;

        switch (key) {
          case 'FirstPageLink':
            element = /*#__PURE__*/React__default["default"].createElement(FirstPageLink, {
              key: key,
              onClick: this.changePageToFirst,
              disabled: this.isFirstPage() || this.empty(),
              template: template
            });
            break;

          case 'PrevPageLink':
            element = /*#__PURE__*/React__default["default"].createElement(PrevPageLink, {
              key: key,
              onClick: this.changePageToPrev,
              disabled: this.isFirstPage() || this.empty(),
              template: template
            });
            break;

          case 'NextPageLink':
            element = /*#__PURE__*/React__default["default"].createElement(NextPageLink, {
              key: key,
              onClick: this.changePageToNext,
              disabled: this.isLastPage() || this.empty(),
              template: template
            });
            break;

          case 'LastPageLink':
            element = /*#__PURE__*/React__default["default"].createElement(LastPageLink, {
              key: key,
              onClick: this.changePageToLast,
              disabled: this.isLastPage() || this.empty(),
              template: template
            });
            break;

          case 'PageLinks':
            element = /*#__PURE__*/React__default["default"].createElement(PageLinks, {
              key: key,
              value: this.updatePageLinks(),
              page: this.getPage(),
              rows: this.props.rows,
              pageCount: this.getPageCount(),
              onClick: this.onPageLinkClick,
              template: template
            });
            break;

          case 'RowsPerPageDropdown':
            element = /*#__PURE__*/React__default["default"].createElement(RowsPerPageDropdown, {
              key: key,
              value: this.props.rows,
              page: this.getPage(),
              pageCount: this.getPageCount(),
              totalRecords: this.props.totalRecords,
              options: this.props.rowsPerPageOptions,
              onChange: this.onRowsChange,
              appendTo: this.props.dropdownAppendTo,
              template: template,
              disabled: this.empty()
            });
            break;

          case 'CurrentPageReport':
            element = /*#__PURE__*/React__default["default"].createElement(CurrentPageReport, {
              reportTemplate: this.props.currentPageReportTemplate,
              key: key,
              page: this.getPage(),
              pageCount: this.getPageCount(),
              first: this.props.first,
              rows: this.props.rows,
              totalRecords: this.props.totalRecords,
              template: template
            });
            break;

          case 'JumpToPageInput':
            element = /*#__PURE__*/React__default["default"].createElement(JumpToPageInput, {
              key: key,
              rows: this.props.rows,
              page: this.getPage(),
              pageCount: this.getPageCount(),
              onChange: this.changePage,
              disabled: this.empty(),
              template: template
            });
            break;

          default:
            element = null;
            break;
        }

        return element;
      }
    }, {
      key: "renderElements",
      value: function renderElements() {
        var _this2 = this;

        var template = this.props.template;

        if (template) {
          if (_typeof(template) === 'object') {
            return template.layout ? template.layout.split(' ').map(function (value) {
              var key = value.trim();
              return _this2.renderElement(key, template[key]);
            }) : Object.entries(template).map(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  key = _ref2[0],
                  _template = _ref2[1];

              return _this2.renderElement(key, _template);
            });
          }

          return template.split(' ').map(function (value) {
            return _this2.renderElement(value.trim());
          });
        }

        return null;
      }
    }, {
      key: "render",
      value: function render() {
        if (!this.props.alwaysShow && this.getPageCount() === 1) {
          return null;
        } else {
          var className = utils.classNames('p-paginator p-component', this.props.className);
          var leftContent = utils.ObjectUtils.getJSXElement(this.props.leftContent, this.props);
          var rightContent = utils.ObjectUtils.getJSXElement(this.props.rightContent, this.props);
          var elements = this.renderElements();
          var leftElement = leftContent && /*#__PURE__*/React__default["default"].createElement("div", {
            className: "p-paginator-left-content"
          }, leftContent);
          var rightElement = rightContent && /*#__PURE__*/React__default["default"].createElement("div", {
            className: "p-paginator-right-content"
          }, rightContent);
          return /*#__PURE__*/React__default["default"].createElement("div", {
            className: className,
            style: this.props.style
          }, leftElement, elements, rightElement);
        }
      }
    }]);

    return Paginator;
  }(React.Component);

  _defineProperty(Paginator, "defaultProps", {
    totalRecords: 0,
    rows: 0,
    first: 0,
    pageLinkSize: 5,
    rowsPerPageOptions: null,
    alwaysShow: true,
    style: null,
    className: null,
    template: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
    onPageChange: null,
    leftContent: null,
    rightContent: null,
    dropdownAppendTo: null,
    currentPageReportTemplate: '({currentPage} of {totalPages})'
  });

  exports.Paginator = Paginator;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils, primereact.ripple, primereact.dropdown, primereact.inputnumber);

this.primereact = this.primereact || {};
this.primereact.tree = (function (exports, React, utils, ripple) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function _arrayLikeToArray$2(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$2(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray$2(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread();
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

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

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

  function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

  function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var UITreeNode = /*#__PURE__*/function (_Component) {
    _inherits(UITreeNode, _Component);

    var _super = _createSuper$1(UITreeNode);

    function UITreeNode(props) {
      var _this;

      _classCallCheck(this, UITreeNode);

      _this = _super.call(this, props);
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
      _this.onDoubleClick = _this.onDoubleClick.bind(_assertThisInitialized(_this));
      _this.onRightClick = _this.onRightClick.bind(_assertThisInitialized(_this));
      _this.onTouchEnd = _this.onTouchEnd.bind(_assertThisInitialized(_this));
      _this.onTogglerClick = _this.onTogglerClick.bind(_assertThisInitialized(_this));
      _this.onNodeKeyDown = _this.onNodeKeyDown.bind(_assertThisInitialized(_this));
      _this.propagateUp = _this.propagateUp.bind(_assertThisInitialized(_this));
      _this.onDrop = _this.onDrop.bind(_assertThisInitialized(_this));
      _this.onDragOver = _this.onDragOver.bind(_assertThisInitialized(_this));
      _this.onDragEnter = _this.onDragEnter.bind(_assertThisInitialized(_this));
      _this.onDragLeave = _this.onDragLeave.bind(_assertThisInitialized(_this));
      _this.onDragStart = _this.onDragStart.bind(_assertThisInitialized(_this));
      _this.onDragEnd = _this.onDragEnd.bind(_assertThisInitialized(_this));
      _this.onDropPointDragOver = _this.onDropPointDragOver.bind(_assertThisInitialized(_this));
      _this.onDropPointDragEnter = _this.onDropPointDragEnter.bind(_assertThisInitialized(_this));
      _this.onDropPointDragLeave = _this.onDropPointDragLeave.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(UITreeNode, [{
      key: "isLeaf",
      value: function isLeaf() {
        return this.props.isNodeLeaf(this.props.node);
      }
    }, {
      key: "expand",
      value: function expand(event) {
        var expandedKeys = this.props.expandedKeys ? _objectSpread$1({}, this.props.expandedKeys) : {};
        expandedKeys[this.props.node.key] = true;
        this.props.onToggle({
          originalEvent: event,
          value: expandedKeys
        });
        this.invokeToggleEvents(event, true);
      }
    }, {
      key: "collapse",
      value: function collapse(event) {
        var expandedKeys = _objectSpread$1({}, this.props.expandedKeys);

        delete expandedKeys[this.props.node.key];
        this.props.onToggle({
          originalEvent: event,
          value: expandedKeys
        });
        this.invokeToggleEvents(event, false);
      }
    }, {
      key: "onTogglerClick",
      value: function onTogglerClick(event) {
        if (this.props.disabled) {
          return;
        }

        if (this.isExpanded()) this.collapse(event);else this.expand(event);
      }
    }, {
      key: "invokeToggleEvents",
      value: function invokeToggleEvents(event, expanded) {
        if (expanded) {
          if (this.props.onExpand) {
            this.props.onExpand({
              originalEvent: event,
              node: this.props.node
            });
          }
        } else {
          if (this.props.onCollapse) {
            this.props.onCollapse({
              originalEvent: event,
              node: this.props.node
            });
          }
        }
      }
    }, {
      key: "isExpanded",
      value: function isExpanded() {
        return (this.props.expandedKeys ? this.props.expandedKeys[this.props.node.key] !== undefined : false) || this.props.node.expanded;
      }
    }, {
      key: "onNodeKeyDown",
      value: function onNodeKeyDown(event) {
        if (this.props.disabled) {
          return;
        }

        var nodeElement = event.target.parentElement;

        if (!utils.DomHandler.hasClass(nodeElement, 'p-treenode')) {
          return;
        }

        switch (event.which) {
          //down arrow
          case 40:
            var listElement = nodeElement.children[1];

            if (listElement) {
              this.focusNode(listElement.children[0]);
            } else {
              var nextNodeElement = nodeElement.nextElementSibling;

              if (nextNodeElement) {
                this.focusNode(nextNodeElement);
              } else {
                var nextSiblingAncestor = this.findNextSiblingOfAncestor(nodeElement);

                if (nextSiblingAncestor) {
                  this.focusNode(nextSiblingAncestor);
                }
              }
            }

            event.preventDefault();
            break;
          //up arrow

          case 38:
            if (nodeElement.previousElementSibling) {
              this.focusNode(this.findLastVisibleDescendant(nodeElement.previousElementSibling));
            } else {
              var parentNodeElement = this.getParentNodeElement(nodeElement);

              if (parentNodeElement) {
                this.focusNode(parentNodeElement);
              }
            }

            event.preventDefault();
            break;
          //right arrow

          case 39:
            if (!this.isExpanded()) {
              this.expand(event);
            }

            event.preventDefault();
            break;
          //left arrow

          case 37:
            if (this.isExpanded()) {
              this.collapse(event);
            }

            event.preventDefault();
            break;
          //enter

          case 13:
            this.onClick(event);
            event.preventDefault();
            break;
        }
      }
    }, {
      key: "findNextSiblingOfAncestor",
      value: function findNextSiblingOfAncestor(nodeElement) {
        var parentNodeElement = this.getParentNodeElement(nodeElement);

        if (parentNodeElement) {
          if (parentNodeElement.nextElementSibling) return parentNodeElement.nextElementSibling;else return this.findNextSiblingOfAncestor(parentNodeElement);
        } else {
          return null;
        }
      }
    }, {
      key: "findLastVisibleDescendant",
      value: function findLastVisibleDescendant(nodeElement) {
        var childrenListElement = nodeElement.children[1];

        if (childrenListElement) {
          var lastChildElement = childrenListElement.children[childrenListElement.children.length - 1];
          return this.findLastVisibleDescendant(lastChildElement);
        } else {
          return nodeElement;
        }
      }
    }, {
      key: "getParentNodeElement",
      value: function getParentNodeElement(nodeElement) {
        var parentNodeElement = nodeElement.parentElement.parentElement;
        return utils.DomHandler.hasClass(parentNodeElement, 'p-treenode') ? parentNodeElement : null;
      }
    }, {
      key: "focusNode",
      value: function focusNode(element) {
        element.children[0].focus();
      }
    }, {
      key: "onClick",
      value: function onClick(event) {
        if (this.props.onClick) {
          this.props.onClick({
            originalEvent: event,
            node: this.props.node
          });
        }

        if (event.target.className && event.target.className.constructor === String && event.target.className.indexOf('p-tree-toggler') === 0 || this.props.disabled) {
          return;
        }

        if (this.props.selectionMode && this.props.node.selectable !== false) {
          var selectionKeys;

          if (this.isCheckboxSelectionMode()) {
            var checked = this.isChecked();
            selectionKeys = this.props.selectionKeys ? _objectSpread$1({}, this.props.selectionKeys) : {};

            if (checked) {
              if (this.props.propagateSelectionDown) this.propagateDown(this.props.node, false, selectionKeys);else delete selectionKeys[this.props.node.key];

              if (this.props.propagateSelectionUp && this.props.onPropagateUp) {
                this.props.onPropagateUp({
                  originalEvent: event,
                  check: false,
                  selectionKeys: selectionKeys
                });
              }

              if (this.props.onUnselect) {
                this.props.onUnselect({
                  originalEvent: event,
                  node: this.props.node
                });
              }
            } else {
              if (this.props.propagateSelectionDown) this.propagateDown(this.props.node, true, selectionKeys);else selectionKeys[this.props.node.key] = {
                checked: true
              };

              if (this.props.propagateSelectionUp && this.props.onPropagateUp) {
                this.props.onPropagateUp({
                  originalEvent: event,
                  check: true,
                  selectionKeys: selectionKeys
                });
              }

              if (this.props.onSelect) {
                this.props.onSelect({
                  originalEvent: event,
                  node: this.props.node
                });
              }
            }
          } else {
            var selected = this.isSelected();
            var metaSelection = this.nodeTouched ? false : this.props.metaKeySelection;

            if (metaSelection) {
              var metaKey = event.metaKey || event.ctrlKey;

              if (selected && metaKey) {
                if (this.isSingleSelectionMode()) {
                  selectionKeys = null;
                } else {
                  selectionKeys = _objectSpread$1({}, this.props.selectionKeys);
                  delete selectionKeys[this.props.node.key];
                }

                if (this.props.onUnselect) {
                  this.props.onUnselect({
                    originalEvent: event,
                    node: this.props.node
                  });
                }
              } else {
                if (this.isSingleSelectionMode()) {
                  selectionKeys = this.props.node.key;
                } else if (this.isMultipleSelectionMode()) {
                  selectionKeys = !metaKey ? {} : this.props.selectionKeys ? _objectSpread$1({}, this.props.selectionKeys) : {};
                  selectionKeys[this.props.node.key] = true;
                }

                if (this.props.onSelect) {
                  this.props.onSelect({
                    originalEvent: event,
                    node: this.props.node
                  });
                }
              }
            } else {
              if (this.isSingleSelectionMode()) {
                if (selected) {
                  selectionKeys = null;

                  if (this.props.onUnselect) {
                    this.props.onUnselect({
                      originalEvent: event,
                      node: this.props.node
                    });
                  }
                } else {
                  selectionKeys = this.props.node.key;

                  if (this.props.onSelect) {
                    this.props.onSelect({
                      originalEvent: event,
                      node: this.props.node
                    });
                  }
                }
              } else {
                if (selected) {
                  selectionKeys = _objectSpread$1({}, this.props.selectionKeys);
                  delete selectionKeys[this.props.node.key];

                  if (this.props.onUnselect) {
                    this.props.onUnselect({
                      originalEvent: event,
                      node: this.props.node
                    });
                  }
                } else {
                  selectionKeys = this.props.selectionKeys ? _objectSpread$1({}, this.props.selectionKeys) : {};
                  selectionKeys[this.props.node.key] = true;

                  if (this.props.onSelect) {
                    this.props.onSelect({
                      originalEvent: event,
                      node: this.props.node
                    });
                  }
                }
              }
            }
          }

          if (this.props.onSelectionChange) {
            this.props.onSelectionChange({
              originalEvent: event,
              value: selectionKeys
            });
          }
        }

        this.nodeTouched = false;
      }
    }, {
      key: "onDoubleClick",
      value: function onDoubleClick(event) {
        if (this.props.onDoubleClick) {
          this.props.onDoubleClick({
            originalEvent: event,
            node: this.props.node
          });
        }
      }
    }, {
      key: "onRightClick",
      value: function onRightClick(event) {
        if (this.props.disabled) {
          return;
        }

        utils.DomHandler.clearSelection();

        if (this.props.onContextMenuSelectionChange) {
          this.props.onContextMenuSelectionChange({
            originalEvent: event,
            value: this.props.node.key
          });
        }

        if (this.props.onContextMenu) {
          this.props.onContextMenu({
            originalEvent: event,
            node: this.props.node
          });
        }
      }
    }, {
      key: "propagateUp",
      value: function propagateUp(event) {
        var check = event.check;
        var selectionKeys = event.selectionKeys;
        var checkedChildCount = 0;
        var childPartialSelected = false;

        var _iterator = _createForOfIteratorHelper$1(this.props.node.children),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var child = _step.value;
            if (selectionKeys[child.key] && selectionKeys[child.key].checked) checkedChildCount++;else if (selectionKeys[child.key] && selectionKeys[child.key].partialChecked) childPartialSelected = true;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        if (check && checkedChildCount === this.props.node.children.length) {
          selectionKeys[this.props.node.key] = {
            checked: true,
            partialChecked: false
          };
        } else {
          if (!check) {
            delete selectionKeys[this.props.node.key];
          }

          if (childPartialSelected || checkedChildCount > 0 && checkedChildCount !== this.props.node.children.length) selectionKeys[this.props.node.key] = {
            checked: false,
            partialChecked: true
          };else delete selectionKeys[this.props.node.key];
        }

        if (this.props.propagateSelectionUp && this.props.onPropagateUp) {
          this.props.onPropagateUp(event);
        }
      }
    }, {
      key: "propagateDown",
      value: function propagateDown(node, check, selectionKeys) {
        if (check) selectionKeys[node.key] = {
          checked: true,
          partialChecked: false
        };else delete selectionKeys[node.key];

        if (node.children && node.children.length) {
          for (var i = 0; i < node.children.length; i++) {
            this.propagateDown(node.children[i], check, selectionKeys);
          }
        }
      }
    }, {
      key: "isSelected",
      value: function isSelected() {
        if (this.props.selectionMode && this.props.selectionKeys) return this.isSingleSelectionMode() ? this.props.selectionKeys === this.props.node.key : this.props.selectionKeys[this.props.node.key] !== undefined;else return false;
      }
    }, {
      key: "isChecked",
      value: function isChecked() {
        return this.props.selectionKeys ? this.props.selectionKeys[this.props.node.key] && this.props.selectionKeys[this.props.node.key].checked : false;
      }
    }, {
      key: "isPartialChecked",
      value: function isPartialChecked() {
        return this.props.selectionKeys ? this.props.selectionKeys[this.props.node.key] && this.props.selectionKeys[this.props.node.key].partialChecked : false;
      }
    }, {
      key: "isSingleSelectionMode",
      value: function isSingleSelectionMode() {
        return this.props.selectionMode && this.props.selectionMode === 'single';
      }
    }, {
      key: "isMultipleSelectionMode",
      value: function isMultipleSelectionMode() {
        return this.props.selectionMode && this.props.selectionMode === 'multiple';
      }
    }, {
      key: "isCheckboxSelectionMode",
      value: function isCheckboxSelectionMode() {
        return this.props.selectionMode && this.props.selectionMode === 'checkbox';
      }
    }, {
      key: "onTouchEnd",
      value: function onTouchEnd() {
        this.nodeTouched = true;
      }
    }, {
      key: "onDropPoint",
      value: function onDropPoint(event, position) {
        event.preventDefault();

        if (this.props.node.droppable !== false) {
          utils.DomHandler.removeClass(event.target, 'p-treenode-droppoint-active');

          if (this.props.onDropPoint) {
            this.props.onDropPoint({
              originalEvent: event,
              path: this.props.path,
              index: this.props.index,
              position: position
            });
          }
        }
      }
    }, {
      key: "onDropPointDragOver",
      value: function onDropPointDragOver(event) {
        if (event.dataTransfer.types[1] === this.props.dragdropScope.toLocaleLowerCase()) {
          event.dataTransfer.dropEffect = 'move';
          event.preventDefault();
        }
      }
    }, {
      key: "onDropPointDragEnter",
      value: function onDropPointDragEnter(event) {
        if (event.dataTransfer.types[1] === this.props.dragdropScope.toLocaleLowerCase()) {
          utils.DomHandler.addClass(event.target, 'p-treenode-droppoint-active');
        }
      }
    }, {
      key: "onDropPointDragLeave",
      value: function onDropPointDragLeave(event) {
        if (event.dataTransfer.types[1] === this.props.dragdropScope.toLocaleLowerCase()) {
          utils.DomHandler.removeClass(event.target, 'p-treenode-droppoint-active');
        }
      }
    }, {
      key: "onDrop",
      value: function onDrop(event) {
        if (this.props.dragdropScope && this.props.node.droppable !== false) {
          utils.DomHandler.removeClass(this.contentElement, 'p-treenode-dragover');
          event.preventDefault();
          event.stopPropagation();

          if (this.props.onDrop) {
            this.props.onDrop({
              originalEvent: event,
              path: this.props.path,
              index: this.props.index
            });
          }
        }
      }
    }, {
      key: "onDragOver",
      value: function onDragOver(event) {
        if (event.dataTransfer.types[1] === this.props.dragdropScope.toLocaleLowerCase() && this.props.node.droppable !== false) {
          event.dataTransfer.dropEffect = 'move';
          event.preventDefault();
          event.stopPropagation();
        }
      }
    }, {
      key: "onDragEnter",
      value: function onDragEnter(event) {
        if (event.dataTransfer.types[1] === this.props.dragdropScope.toLocaleLowerCase() && this.props.node.droppable !== false) {
          utils.DomHandler.addClass(this.contentElement, 'p-treenode-dragover');
        }
      }
    }, {
      key: "onDragLeave",
      value: function onDragLeave(event) {
        if (event.dataTransfer.types[1] === this.props.dragdropScope.toLocaleLowerCase() && this.props.node.droppable !== false) {
          var rect = event.currentTarget.getBoundingClientRect();

          if (event.nativeEvent.x > rect.left + rect.width || event.nativeEvent.x < rect.left || event.nativeEvent.y >= Math.floor(rect.top + rect.height) || event.nativeEvent.y < rect.top) {
            utils.DomHandler.removeClass(this.contentElement, 'p-treenode-dragover');
          }
        }
      }
    }, {
      key: "onDragStart",
      value: function onDragStart(event) {
        event.dataTransfer.setData("text", this.props.dragdropScope);
        event.dataTransfer.setData(this.props.dragdropScope, this.props.dragdropScope);

        if (this.props.onDragStart) {
          this.props.onDragStart({
            originalEvent: event,
            path: this.props.path,
            index: this.props.index
          });
        }
      }
    }, {
      key: "onDragEnd",
      value: function onDragEnd(event) {
        if (this.props.onDragEnd) {
          this.props.onDragEnd({
            originalEvent: event
          });
        }
      }
    }, {
      key: "renderLabel",
      value: function renderLabel() {
        var content = /*#__PURE__*/React__default["default"].createElement("span", {
          className: "p-treenode-label"
        }, this.props.node.label);

        if (this.props.nodeTemplate) {
          var defaultContentOptions = {
            onTogglerClick: this.onTogglerClick,
            className: 'p-treenode-label',
            element: content,
            props: this.props,
            expanded: this.isExpanded()
          };
          content = utils.ObjectUtils.getJSXElement(this.props.nodeTemplate, this.props.node, defaultContentOptions);
        }

        return content;
      }
    }, {
      key: "renderCheckbox",
      value: function renderCheckbox() {
        if (this.isCheckboxSelectionMode() && this.props.node.selectable !== false) {
          var checked = this.isChecked();
          var partialChecked = this.isPartialChecked();
          var className = utils.classNames('p-checkbox-box', {
            'p-highlight': checked,
            'p-indeterminate': partialChecked,
            'p-disabled': this.props.disabled
          });
          var icon = utils.classNames('p-checkbox-icon p-c', {
            'pi pi-check': checked,
            'pi pi-minus': partialChecked
          });
          return /*#__PURE__*/React__default["default"].createElement("div", {
            className: "p-checkbox p-component"
          }, /*#__PURE__*/React__default["default"].createElement("div", {
            className: className,
            role: "checkbox",
            "aria-checked": checked
          }, /*#__PURE__*/React__default["default"].createElement("span", {
            className: icon
          })));
        }

        return null;
      }
    }, {
      key: "renderIcon",
      value: function renderIcon(expanded) {
        var icon = this.props.node.icon || (expanded ? this.props.node.expandedIcon : this.props.node.collapsedIcon);

        if (icon) {
          var className = utils.classNames('p-treenode-icon', icon);
          return /*#__PURE__*/React__default["default"].createElement("span", {
            className: className
          });
        }

        return null;
      }
    }, {
      key: "renderToggler",
      value: function renderToggler(expanded) {
        var iconClassName = utils.classNames('p-tree-toggler-icon pi pi-fw', {
          'pi-chevron-right': !expanded,
          'pi-chevron-down': expanded
        });
        var content = /*#__PURE__*/React__default["default"].createElement("button", {
          type: "button",
          className: "p-tree-toggler p-link",
          tabIndex: -1,
          onClick: this.onTogglerClick
        }, /*#__PURE__*/React__default["default"].createElement("span", {
          className: iconClassName
        }), /*#__PURE__*/React__default["default"].createElement(ripple.Ripple, null));

        if (this.props.togglerTemplate) {
          var defaultContentOptions = {
            onClick: this.onTogglerClick,
            containerClassName: 'p-tree-toggler p-link',
            iconClassName: 'p-tree-toggler-icon',
            element: content,
            props: this.props,
            expanded: expanded
          };
          content = utils.ObjectUtils.getJSXElement(this.props.togglerTemplate, this.props.node, defaultContentOptions);
        }

        return content;
      }
    }, {
      key: "renderDropPoint",
      value: function renderDropPoint(position) {
        var _this2 = this;

        if (this.props.dragdropScope) {
          return /*#__PURE__*/React__default["default"].createElement("li", {
            className: "p-treenode-droppoint",
            onDrop: function onDrop(event) {
              return _this2.onDropPoint(event, position);
            },
            onDragOver: this.onDropPointDragOver,
            onDragEnter: this.onDropPointDragEnter,
            onDragLeave: this.onDropPointDragLeave
          });
        }

        return null;
      }
    }, {
      key: "renderContent",
      value: function renderContent() {
        var _this3 = this;

        var selected = this.isSelected();
        var checked = this.isChecked();
        var className = utils.classNames('p-treenode-content', this.props.node.className, {
          'p-treenode-selectable': this.props.selectionMode && this.props.node.selectable !== false,
          'p-highlight': this.isCheckboxSelectionMode() ? checked : selected,
          'p-highlight-contextmenu': this.props.contextMenuSelectionKey && this.props.contextMenuSelectionKey === this.props.node.key,
          'p-disabled': this.props.disabled
        });
        var expanded = this.isExpanded();
        var toggler = this.renderToggler(expanded);
        var checkbox = this.renderCheckbox();
        var icon = this.renderIcon(expanded);
        var label = this.renderLabel();
        var tabIndex = this.props.disabled ? undefined : 0;
        return /*#__PURE__*/React__default["default"].createElement("div", {
          ref: function ref(el) {
            return _this3.contentElement = el;
          },
          className: className,
          style: this.props.node.style,
          onClick: this.onClick,
          onDoubleClick: this.onDoubleClick,
          onContextMenu: this.onRightClick,
          onTouchEnd: this.onTouchEnd,
          draggable: this.props.dragdropScope && this.props.node.draggable !== false && !this.props.disabled,
          onDrop: this.onDrop,
          onDragOver: this.onDragOver,
          onDragEnter: this.onDragEnter,
          onDragLeave: this.onDragLeave,
          onDragStart: this.onDragStart,
          onDragEnd: this.onDragEnd,
          tabIndex: tabIndex,
          onKeyDown: this.onNodeKeyDown,
          role: "treeitem",
          "aria-posinset": this.props.index + 1,
          "aria-expanded": this.isExpanded(),
          "aria-selected": checked || selected
        }, toggler, checkbox, icon, label);
      }
    }, {
      key: "renderChildren",
      value: function renderChildren() {
        var _this4 = this;

        if (this.props.node.children && this.props.node.children.length && this.isExpanded()) {
          return /*#__PURE__*/React__default["default"].createElement("ul", {
            className: "p-treenode-children",
            role: "group"
          }, this.props.node.children.map(function (childNode, index) {
            return /*#__PURE__*/React__default["default"].createElement(UITreeNode, {
              key: childNode.key || childNode.label,
              node: childNode,
              parent: _this4.props.node,
              index: index,
              last: index === _this4.props.node.children.length - 1,
              path: _this4.props.path + '-' + index,
              disabled: _this4.props.disabled,
              selectionMode: _this4.props.selectionMode,
              selectionKeys: _this4.props.selectionKeys,
              onSelectionChange: _this4.props.onSelectionChange,
              metaKeySelection: _this4.props.metaKeySelection,
              propagateSelectionDown: _this4.props.propagateSelectionDown,
              propagateSelectionUp: _this4.props.propagateSelectionUp,
              contextMenuSelectionKey: _this4.props.contextMenuSelectionKey,
              onContextMenuSelectionChange: _this4.props.onContextMenuSelectionChange,
              onContextMenu: _this4.props.onContextMenu,
              onExpand: _this4.props.onExpand,
              onCollapse: _this4.props.onCollapse,
              onSelect: _this4.props.onSelect,
              onUnselect: _this4.props.onUnselect,
              expandedKeys: _this4.props.expandedKeys,
              onToggle: _this4.props.onToggle,
              onPropagateUp: _this4.propagateUp,
              nodeTemplate: _this4.props.nodeTemplate,
              togglerTemplate: _this4.props.togglerTemplate,
              isNodeLeaf: _this4.props.isNodeLeaf,
              dragdropScope: _this4.props.dragdropScope,
              onDragStart: _this4.props.onDragStart,
              onDragEnd: _this4.props.onDragEnd,
              onDrop: _this4.props.onDrop,
              onDropPoint: _this4.props.onDropPoint
            });
          }));
        }

        return null;
      }
    }, {
      key: "renderNode",
      value: function renderNode() {
        var className = utils.classNames('p-treenode', {
          'p-treenode-leaf': this.isLeaf()
        }, this.props.node.className);
        var content = this.renderContent();
        var children = this.renderChildren();
        return /*#__PURE__*/React__default["default"].createElement("li", {
          className: className,
          style: this.props.node.style
        }, content, children);
      }
    }, {
      key: "render",
      value: function render() {
        var node = this.renderNode();

        if (this.props.dragdropScope && !this.props.disabled) {
          var beforeDropPoint = this.renderDropPoint(-1);
          var afterDropPoint = this.props.last ? this.renderDropPoint(1) : null;
          return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, beforeDropPoint, node, afterDropPoint);
        } else {
          return node;
        }
      }
    }]);

    return UITreeNode;
  }(React.Component);

  _defineProperty(UITreeNode, "defaultProps", {
    node: null,
    index: null,
    last: null,
    parent: null,
    path: null,
    disabled: false,
    selectionMode: null,
    selectionKeys: null,
    contextMenuSelectionKey: null,
    metaKeySelection: true,
    expandedKeys: null,
    propagateSelectionUp: true,
    propagateSelectionDown: true,
    dragdropScope: null,
    ariaLabel: null,
    ariaLabelledBy: null,
    nodeTemplate: null,
    togglerTemplate: null,
    isNodeLeaf: null,
    onSelect: null,
    onUnselect: null,
    onExpand: null,
    onCollapse: null,
    onToggle: null,
    onSelectionChange: null,
    onContextMenuSelectionChange: null,
    onPropagateUp: null,
    onDragStart: null,
    onDragEnd: null,
    onDrop: null,
    onDropPoint: null,
    onContextMenu: null,
    onNodeClick: null,
    onNodeDoubleClick: null
  });

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  var Tree = /*#__PURE__*/function (_Component) {
    _inherits(Tree, _Component);

    var _super = _createSuper(Tree);

    function Tree(props) {
      var _this;

      _classCallCheck(this, Tree);

      _this = _super.call(this, props);
      _this.state = {};

      if (!_this.props.onFilterValueChange) {
        _this.state['filterValue'] = '';
      }

      if (!_this.props.onToggle) {
        _this.state['expandedKeys'] = _this.props.expandedKeys;
      }

      _this.isNodeLeaf = _this.isNodeLeaf.bind(_assertThisInitialized(_this));
      _this.onToggle = _this.onToggle.bind(_assertThisInitialized(_this));
      _this.onDragStart = _this.onDragStart.bind(_assertThisInitialized(_this));
      _this.onDragEnd = _this.onDragEnd.bind(_assertThisInitialized(_this));
      _this.onDrop = _this.onDrop.bind(_assertThisInitialized(_this));
      _this.onDropPoint = _this.onDropPoint.bind(_assertThisInitialized(_this));
      _this.onFilterInputChange = _this.onFilterInputChange.bind(_assertThisInitialized(_this));
      _this.onFilterInputKeyDown = _this.onFilterInputKeyDown.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(Tree, [{
      key: "getFilterValue",
      value: function getFilterValue() {
        return this.props.onFilterValueChange ? this.props.filterValue : this.state.filterValue;
      }
    }, {
      key: "getExpandedKeys",
      value: function getExpandedKeys() {
        return this.props.onToggle ? this.props.expandedKeys : this.state.expandedKeys;
      }
    }, {
      key: "getRootNode",
      value: function getRootNode() {
        return this.props.filter && this.filteredNodes ? this.filteredNodes : this.props.value;
      }
    }, {
      key: "onToggle",
      value: function onToggle(event) {
        if (this.props.onToggle) {
          this.props.onToggle(event);
        } else {
          this.setState({
            expandedKeys: event.value
          });
        }
      }
    }, {
      key: "onDragStart",
      value: function onDragStart(event) {
        this.dragState = {
          path: event.path,
          index: event.index
        };
      }
    }, {
      key: "onDragEnd",
      value: function onDragEnd() {
        this.dragState = null;
      }
    }, {
      key: "onDrop",
      value: function onDrop(event) {
        if (this.validateDropNode(this.dragState.path, event.path)) {
          var value = JSON.parse(JSON.stringify(this.props.value));
          var dragPaths = this.dragState.path.split('-');
          dragPaths.pop();
          var dragNodeParent = this.findNode(value, dragPaths);
          var dragNode = dragNodeParent ? dragNodeParent.children[this.dragState.index] : value[this.dragState.index];
          var dropNode = this.findNode(value, event.path.split('-'));
          if (dropNode.children) dropNode.children.push(dragNode);else dropNode.children = [dragNode];
          if (dragNodeParent) dragNodeParent.children.splice(this.dragState.index, 1);else value.splice(this.dragState.index, 1);

          if (this.props.onDragDrop) {
            this.props.onDragDrop({
              originalEvent: event.originalEvent,
              value: value,
              dragNode: dragNode,
              dropNode: dropNode,
              dropIndex: event.index
            });
          }
        }
      }
    }, {
      key: "onDropPoint",
      value: function onDropPoint(event) {
        if (this.validateDropPoint(event)) {
          var value = JSON.parse(JSON.stringify(this.props.value));
          var dragPaths = this.dragState.path.split('-');
          dragPaths.pop();
          var dropPaths = event.path.split('-');
          dropPaths.pop();
          var dragNodeParent = this.findNode(value, dragPaths);
          var dropNodeParent = this.findNode(value, dropPaths);
          var dragNode = dragNodeParent ? dragNodeParent.children[this.dragState.index] : value[this.dragState.index];
          var siblings = this.areSiblings(this.dragState.path, event.path);
          if (dragNodeParent) dragNodeParent.children.splice(this.dragState.index, 1);else value.splice(this.dragState.index, 1);

          if (event.position < 0) {
            var dropIndex = siblings ? this.dragState.index > event.index ? event.index : event.index - 1 : event.index;
            if (dropNodeParent) dropNodeParent.children.splice(dropIndex, 0, dragNode);else value.splice(dropIndex, 0, dragNode);
          } else {
            if (dropNodeParent) dropNodeParent.children.push(dragNode);else value.push(dragNode);
          }

          if (this.props.onDragDrop) {
            this.props.onDragDrop({
              originalEvent: event.originalEvent,
              value: value,
              dragNode: dragNode,
              dropNode: dropNodeParent,
              dropIndex: event.index
            });
          }
        }
      }
    }, {
      key: "validateDrop",
      value: function validateDrop(dragPath, dropPath) {
        if (!dragPath) {
          return false;
        } else {
          //same node
          if (dragPath === dropPath) {
            return false;
          } //parent dropped on an descendant


          if (dropPath.indexOf(dragPath) === 0) {
            return false;
          }

          return true;
        }
      }
    }, {
      key: "validateDropNode",
      value: function validateDropNode(dragPath, dropPath) {
        var validateDrop = this.validateDrop(dragPath, dropPath);

        if (validateDrop) {
          //child dropped on parent
          if (dragPath.indexOf('-') > 0 && dragPath.substring(0, dragPath.lastIndexOf('-')) === dropPath) {
            return false;
          }

          return true;
        } else {
          return false;
        }
      }
    }, {
      key: "validateDropPoint",
      value: function validateDropPoint(event) {
        var validateDrop = this.validateDrop(this.dragState.path, event.path);

        if (validateDrop) {
          //child dropped to next sibling's drop point
          if (event.position === -1 && this.areSiblings(this.dragState.path, event.path) && this.dragState.index + 1 === event.index) {
            return false;
          }

          return true;
        } else {
          return false;
        }
      }
    }, {
      key: "areSiblings",
      value: function areSiblings(path1, path2) {
        if (path1.length === 1 && path2.length === 1) return true;else return path1.substring(0, path1.lastIndexOf('-')) === path2.substring(0, path2.lastIndexOf('-'));
      }
    }, {
      key: "findNode",
      value: function findNode(value, path) {
        if (path.length === 0) {
          return null;
        } else {
          var index = parseInt(path[0], 10);
          var nextSearchRoot = value.children ? value.children[index] : value[index];

          if (path.length === 1) {
            return nextSearchRoot;
          } else {
            path.shift();
            return this.findNode(nextSearchRoot, path);
          }
        }
      }
    }, {
      key: "isNodeLeaf",
      value: function isNodeLeaf(node) {
        return node.leaf === false ? false : !(node.children && node.children.length);
      }
    }, {
      key: "onFilterInputKeyDown",
      value: function onFilterInputKeyDown(event) {
        //enter
        if (event.which === 13) {
          event.preventDefault();
        }
      }
    }, {
      key: "onFilterInputChange",
      value: function onFilterInputChange(event) {
        this.filterChanged = true;
        var filterValue = event.target.value;

        if (this.props.onFilterValueChange) {
          this.props.onFilterValueChange({
            originalEvent: event,
            value: filterValue
          });
        } else {
          this.setState({
            filterValue: filterValue
          });
        }
      }
    }, {
      key: "filter",
      value: function filter(value) {
        this.setState({
          filterValue: utils.ObjectUtils.isNotEmpty(value) ? value : ''
        }, this._filter);
      }
    }, {
      key: "_filter",
      value: function _filter() {
        if (!this.filterChanged) {
          return;
        }

        var filterValue = this.getFilterValue();

        if (utils.ObjectUtils.isEmpty(filterValue)) {
          this.filteredNodes = this.props.value;
        } else {
          this.filteredNodes = [];
          var searchFields = this.props.filterBy.split(',');
          var filterText = filterValue.toLocaleLowerCase(this.props.filterLocale);
          var isStrictMode = this.props.filterMode === 'strict';

          var _iterator = _createForOfIteratorHelper(this.props.value),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var node = _step.value;

              var copyNode = _objectSpread({}, node);

              var paramsWithoutNode = {
                searchFields: searchFields,
                filterText: filterText,
                isStrictMode: isStrictMode
              };

              if (isStrictMode && (this.findFilteredNodes(copyNode, paramsWithoutNode) || this.isFilterMatched(copyNode, paramsWithoutNode)) || !isStrictMode && (this.isFilterMatched(copyNode, paramsWithoutNode) || this.findFilteredNodes(copyNode, paramsWithoutNode))) {
                this.filteredNodes.push(copyNode);
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }

        this.filterChanged = false;
      }
    }, {
      key: "findFilteredNodes",
      value: function findFilteredNodes(node, paramsWithoutNode) {
        if (node) {
          var matched = false;

          if (node.children) {
            var childNodes = _toConsumableArray(node.children);

            node.children = [];

            var _iterator2 = _createForOfIteratorHelper(childNodes),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var childNode = _step2.value;

                var copyChildNode = _objectSpread({}, childNode);

                if (this.isFilterMatched(copyChildNode, paramsWithoutNode)) {
                  matched = true;
                  node.children.push(copyChildNode);
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }

          if (matched) {
            node.expanded = true;
            return true;
          }
        }
      }
    }, {
      key: "isFilterMatched",
      value: function isFilterMatched(node, _ref) {
        var searchFields = _ref.searchFields,
            filterText = _ref.filterText,
            isStrictMode = _ref.isStrictMode;
        var matched = false;

        var _iterator3 = _createForOfIteratorHelper(searchFields),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var field = _step3.value;
            var fieldValue = String(utils.ObjectUtils.resolveFieldData(node, field)).toLocaleLowerCase(this.props.filterLocale);

            if (fieldValue.indexOf(filterText) > -1) {
              matched = true;
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        if (!matched || isStrictMode && !this.isNodeLeaf(node)) {
          matched = this.findFilteredNodes(node, {
            searchFields: searchFields,
            filterText: filterText,
            isStrictMode: isStrictMode
          }) || matched;
        }

        return matched;
      }
    }, {
      key: "renderRootChild",
      value: function renderRootChild(node, index, last) {
        return /*#__PURE__*/React__default["default"].createElement(UITreeNode, {
          key: node.key || node.label,
          node: node,
          index: index,
          last: last,
          path: String(index),
          disabled: this.props.disabled,
          selectionMode: this.props.selectionMode,
          selectionKeys: this.props.selectionKeys,
          onSelectionChange: this.props.onSelectionChange,
          metaKeySelection: this.props.metaKeySelection,
          contextMenuSelectionKey: this.props.contextMenuSelectionKey,
          onContextMenuSelectionChange: this.props.onContextMenuSelectionChange,
          onContextMenu: this.props.onContextMenu,
          propagateSelectionDown: this.props.propagateSelectionDown,
          propagateSelectionUp: this.props.propagateSelectionUp,
          onExpand: this.props.onExpand,
          onCollapse: this.props.onCollapse,
          onSelect: this.props.onSelect,
          onUnselect: this.props.onUnselect,
          expandedKeys: this.getExpandedKeys(),
          onToggle: this.onToggle,
          nodeTemplate: this.props.nodeTemplate,
          togglerTemplate: this.props.togglerTemplate,
          isNodeLeaf: this.isNodeLeaf,
          dragdropScope: this.props.dragdropScope,
          onDragStart: this.onDragStart,
          onDragEnd: this.onDragEnd,
          onDrop: this.onDrop,
          onDropPoint: this.onDropPoint,
          onNodeClick: this.props.onNodeClick,
          onNodeDoubleClick: this.props.onNodeDoubleClick
        });
      }
    }, {
      key: "renderRootChildren",
      value: function renderRootChildren() {
        var _this2 = this;

        if (this.props.filter) {
          this.filterChanged = true;

          this._filter();
        }

        var value = this.getRootNode();
        return value.map(function (node, index) {
          return _this2.renderRootChild(node, index, index === value.length - 1);
        });
      }
    }, {
      key: "renderModel",
      value: function renderModel() {
        if (this.props.value) {
          var rootNodes = this.renderRootChildren();
          var contentClass = utils.classNames('p-tree-container', this.props.contentClassName);
          return /*#__PURE__*/React__default["default"].createElement("ul", {
            className: contentClass,
            role: "tree",
            "aria-label": this.props.ariaLabel,
            "aria-labelledby": this.props.ariaLabelledBy,
            style: this.props.contentStyle
          }, rootNodes);
        }

        return null;
      }
    }, {
      key: "renderLoader",
      value: function renderLoader() {
        if (this.props.loading) {
          var icon = utils.classNames('p-tree-loading-icon pi-spin', this.props.loadingIcon);
          return /*#__PURE__*/React__default["default"].createElement("div", {
            className: "p-tree-loading-overlay p-component-overlay"
          }, /*#__PURE__*/React__default["default"].createElement("i", {
            className: icon
          }));
        }

        return null;
      }
    }, {
      key: "renderFilter",
      value: function renderFilter() {
        if (this.props.filter) {
          var filterValue = this.getFilterValue();
          filterValue = utils.ObjectUtils.isNotEmpty(filterValue) ? filterValue : '';
          return /*#__PURE__*/React__default["default"].createElement("div", {
            className: "p-tree-filter-container"
          }, /*#__PURE__*/React__default["default"].createElement("input", {
            type: "text",
            value: filterValue,
            autoComplete: "off",
            className: "p-tree-filter p-inputtext p-component",
            placeholder: this.props.filterPlaceholder,
            onKeyDown: this.onFilterInputKeyDown,
            onChange: this.onFilterInputChange,
            disabled: this.props.disabled
          }), /*#__PURE__*/React__default["default"].createElement("span", {
            className: "p-tree-filter-icon pi pi-search"
          }));
        }

        return null;
      }
    }, {
      key: "renderHeader",
      value: function renderHeader() {
        if (this.props.showHeader) {
          var filterElement = this.renderFilter();
          var content = filterElement;

          if (this.props.header) {
            var defaultContentOptions = {
              filterContainerClassName: 'p-tree-filter-container',
              filterIconClasssName: 'p-tree-filter-icon pi pi-search',
              filterInput: {
                className: 'p-tree-filter p-inputtext p-component',
                onKeyDown: this.onFilterInputKeyDown,
                onChange: this.onFilterInputChange
              },
              filterElement: filterElement,
              element: content,
              props: this.props
            };
            content = utils.ObjectUtils.getJSXElement(this.props.header, defaultContentOptions);
          }

          return /*#__PURE__*/React__default["default"].createElement("div", {
            className: "p-tree-header"
          }, content);
        }

        return null;
      }
    }, {
      key: "renderFooter",
      value: function renderFooter() {
        var content = utils.ObjectUtils.getJSXElement(this.props.footer, this.props);
        return /*#__PURE__*/React__default["default"].createElement("div", {
          className: "p-tree-footer"
        }, content);
      }
    }, {
      key: "render",
      value: function render() {
        var className = utils.classNames('p-tree p-component', this.props.className, {
          'p-tree-selectable': this.props.selectionMode,
          'p-tree-loading': this.props.loading,
          'p-disabled': this.props.disabled
        });
        var loader = this.renderLoader();
        var content = this.renderModel();
        var header = this.renderHeader();
        var footer = this.renderFooter();
        return /*#__PURE__*/React__default["default"].createElement("div", {
          id: this.props.id,
          className: className,
          style: this.props.style
        }, loader, header, content, footer);
      }
    }]);

    return Tree;
  }(React.Component);

  _defineProperty(Tree, "defaultProps", {
    id: null,
    value: null,
    disabled: false,
    selectionMode: null,
    selectionKeys: null,
    onSelectionChange: null,
    contextMenuSelectionKey: null,
    onContextMenuSelectionChange: null,
    expandedKeys: null,
    style: null,
    className: null,
    contentStyle: null,
    contentClassName: null,
    metaKeySelection: true,
    propagateSelectionUp: true,
    propagateSelectionDown: true,
    loading: false,
    loadingIcon: 'pi pi-spinner',
    dragdropScope: null,
    header: null,
    footer: null,
    showHeader: true,
    filter: false,
    filterValue: null,
    filterBy: 'label',
    filterMode: 'lenient',
    filterPlaceholder: null,
    filterLocale: undefined,
    nodeTemplate: null,
    togglerTemplate: null,
    onSelect: null,
    onUnselect: null,
    onExpand: null,
    onCollapse: null,
    onToggle: null,
    onDragDrop: null,
    onContextMenu: null,
    onFilterValueChange: null,
    onNodeClick: null,
    onNodeDoubleClick: null
  });

  exports.Tree = Tree;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils, primereact.ripple);

