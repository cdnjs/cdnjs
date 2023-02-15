this.primereact = this.primereact || {};
this.primereact.utils = (function (exports, React) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }

  function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
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

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
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

  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  var DomHandler = /*#__PURE__*/function () {
    function DomHandler() {
      _classCallCheck(this, DomHandler);
    }
    _createClass(DomHandler, null, [{
      key: "innerWidth",
      value:
      /**
       * All data- properties like data-test-id
       */

      /**
       * All ARIA properties like aria-label and focus-target for https://www.npmjs.com/package/@q42/floating-focus-a11y
       */

      function innerWidth(el) {
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
      key: "getBrowserLanguage",
      value: function getBrowserLanguage() {
        return navigator.userLanguage || navigator.languages && navigator.languages.length && navigator.languages[0] || navigator.language || navigator.browserLanguage || navigator.systemLanguage || 'en';
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
        return false;
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
        if (element && target) {
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
      key: "isChrome",
      value: function isChrome() {
        return /(chrome)/i.test(navigator.userAgent);
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
        return (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === 'object' ? obj instanceof HTMLElement : obj && _typeof(obj) === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
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
          } catch (error) {
            //ignore IE bug
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
          var scrollDiv = document.createElement('div');
          scrollDiv.className = 'p-scrollbar-measure';
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
        var match = /(chrome)[ ]([\w.]+)/.exec(ua) || /(webkit)[ ]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ ]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
        return {
          browser: match[1] || '',
          version: match[2] || '0'
        };
      }
    }, {
      key: "isVisible",
      value: function isVisible(element) {
        // https://stackoverflow.com/a/59096915/502366 (in future use IntersectionObserver)
        return element && (element.clientHeight !== 0 || element.getClientRects().length !== 0 || getComputedStyle(element).display !== 'none');
      }
    }, {
      key: "isExist",
      value: function isExist(element) {
        return !!(element !== null && typeof element !== 'undefined' && element.nodeName && element.parentNode);
      }
    }, {
      key: "hasDOM",
      value: function hasDOM() {
        return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
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
            if (getComputedStyle(focusableElement).display !== 'none' && getComputedStyle(focusableElement).visibility !== 'hidden') visibleFocusableElements.push(focusableElement);
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

      /**
       * Focus an input element if it does not already have focus.
       *
       * @param {HTMLElement} el a HTML element
       * @param {boolean} scrollTo flag to control whether to scroll to the element, false by default
       */
    }, {
      key: "focus",
      value: function focus(el, scrollTo) {
        var preventScroll = scrollTo === undefined ? true : !scrollTo;
        el && document.activeElement !== el && el.focus({
          preventScroll: preventScroll
        });
      }

      /**
       * Focus the first focusable element if it does not already have focus.
       *
       * @param {HTMLElement} el a HTML element
       * @param {boolean} scrollTo flag to control whether to scroll to the element, false by default
       * @return {HTMLElement | undefined} the first focusable HTML element found
       */
    }, {
      key: "focusFirstElement",
      value: function focusFirstElement(el, scrollTo) {
        if (!el) return;
        var firstFocusableElement = DomHandler.getFirstFocusableElement(el);
        firstFocusableElement && DomHandler.focus(firstFocusableElement, scrollTo);
        return firstFocusableElement;
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
          var isDownloaded = DomHandler.saveAs({
            name: filename + '.csv',
            src: URL.createObjectURL(blob)
          });
          if (!isDownloaded) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
            window.open(encodeURI(csv));
          }
        }
      }
    }, {
      key: "saveAs",
      value: function saveAs(file) {
        if (file) {
          var link = document.createElement('a');
          if (link.download !== undefined) {
            var name = file.name,
              src = file.src;
            link.setAttribute('href', src);
            link.setAttribute('download', name);
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return true;
          }
        }
        return false;
      }
    }, {
      key: "createInlineStyle",
      value: function createInlineStyle(nonce) {
        var styleElement = document.createElement('style');
        try {
          if (!nonce) {
            nonce = process.env.REACT_APP_CSS_NONCE;
          }
        } catch (error) {
          // NOOP
        }
        nonce && styleElement.setAttribute('nonce', nonce);
        document.head.appendChild(styleElement);
        return styleElement;
      }
    }, {
      key: "removeInlineStyle",
      value: function removeInlineStyle(styleElement) {
        if (this.isExist(styleElement)) {
          try {
            document.head.removeChild(styleElement);
          } catch (error) {
            // style element may have already been removed in a fast refresh
          }
          styleElement = null;
        }
        return styleElement;
      }
    }, {
      key: "getTargetElement",
      value: function getTargetElement(target) {
        if (!target) return null;
        if (target === 'document') {
          return document;
        } else if (target === 'window') {
          return window;
        } else if (_typeof(target) === 'object' && target.hasOwnProperty('current')) {
          return this.isExist(target.current) ? target.current : null;
        } else {
          var isFunction = function isFunction(obj) {
            return !!(obj && obj.constructor && obj.call && obj.apply);
          };
          var element = isFunction(target) ? target() : target;
          return element && element.nodeType === 9 || this.isExist(element) ? element : null;
        }
      }

      /**
       * Get the attribute names for an element and sorts them alpha for comparison
       */
    }, {
      key: "getAttributeNames",
      value: function getAttributeNames(node) {
        var index, rv, attrs;
        rv = [];
        attrs = node.attributes;
        for (index = 0; index < attrs.length; ++index) {
          rv.push(attrs[index].nodeName);
        }
        rv.sort();
        return rv;
      }

      /**
       * Compare two elements for equality.  Even will compare if the style element
       * is out of order for example:
       *
       * elem1 = style="color: red; font-size: 28px"
       * elem2 = style="font-size: 28px; color: red"
       */
    }, {
      key: "isEqualElement",
      value: function isEqualElement(elm1, elm2) {
        var attrs1, attrs2, name, node1, node2;

        // Compare attributes without order sensitivity
        attrs1 = DomHandler.getAttributeNames(elm1);
        attrs2 = DomHandler.getAttributeNames(elm2);
        if (attrs1.join(',') !== attrs2.join(',')) {
          // console.log("Found nodes with different sets of attributes; not equiv");
          return false;
        }

        // ...and values
        // unless you want to compare DOM0 event handlers
        // (onclick="...")
        for (var index = 0; index < attrs1.length; ++index) {
          name = attrs1[index];
          if (name === 'style') {
            var astyle = elm1.style;
            var bstyle = elm2.style;
            var rexDigitsOnly = /^\d+$/;
            for (var _i3 = 0, _Object$keys = Object.keys(astyle); _i3 < _Object$keys.length; _i3++) {
              var key = _Object$keys[_i3];
              if (!rexDigitsOnly.test(key) && astyle[key] !== bstyle[key]) {
                // Not equivalent, stop
                //console.log("Found nodes with mis-matched values for attribute '" + name + "'; not equiv");
                return false;
              }
            }
          } else {
            if (elm1.getAttribute(name) !== elm2.getAttribute(name)) {
              // console.log("Found nodes with mis-matched values for attribute '" + name + "'; not equiv");
              return false;
            }
          }
        }

        // Walk the children
        for (node1 = elm1.firstChild, node2 = elm2.firstChild; node1 && node2; node1 = node1.nextSibling, node2 = node2.nextSibling) {
          if (node1.nodeType !== node2.nodeType) {
            // display("Found nodes of different types; not equiv");
            return false;
          }
          if (node1.nodeType === 1) {
            // Element
            if (!DomHandler.isEqualElement(node1, node2)) {
              return false;
            }
          } else if (node1.nodeValue !== node2.nodeValue) {
            // console.log("Found nodes with mis-matched nodeValues; not equiv");
            return false;
          }
        }
        if (node1 || node2) {
          // One of the elements had more nodes than the other
          // console.log("Found more children of one element than the other; not equivalent");
          return false;
        }

        // Seem the same
        return true;
      }
    }]);
    return DomHandler;
  }();
  _defineProperty(DomHandler, "DATA_PROPS", ['data-']);
  _defineProperty(DomHandler, "ARIA_PROPS", ['aria', 'focus-target']);

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

  function EventBus() {
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

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
      while (++pos < len && !tests[pos]);
      return pos;
    };
    var seekPrev = function seekPrev(pos) {
      while (--pos >= 0 && !tests[pos]);
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
        while (pos.begin > 0 && !tests[pos.begin - 1]) pos.begin--;
        if (pos.begin === 0) {
          while (pos.begin < firstNonMaskPos && !tests[pos.begin]) pos.begin++;
        }
        caret(pos.begin, pos.begin);
      } else {
        checkVal(true);
        while (pos.begin < len && !tests[pos.begin]) pos.begin++;
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
      options.onBlur && options.onBlur(e);
      updateModel(e);
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
      oldVal = el.value;

      //backspace, delete, and escape get special treatment
      if (k === 8 || k === 46 || DomHandler.isIOS() && k === 127) {
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
            if (DomHandler.isAndroid()) {
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
        if (pos === options.mask.replace('?', '').length) {
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
        9: '[0-9]',
        a: '[A-Za-z]',
        '*': '[A-Za-z0-9]'
      };
      androidChrome = DomHandler.isChrome() && DomHandler.isAndroid();
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
            for (i = length; i-- !== 0;) if (!this.deepEquals(a[i], b[i])) return false;
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
          for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
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
          } else if (ObjectUtils.isNotEmpty(data[field])) {
            return data[field];
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
      key: "isLetter",
      value: function isLetter(_char) {
        return _char && (_char.toUpperCase() != _char.toLowerCase() || _char.codePointAt(0) > 127);
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

      /**
       * Removes keys from a JSON object that start with a string such as "data" to get all "data-id" type properties.
       *
       * @param {any} obj the JSON object to reduce
       * @param {string[]} startsWiths the string(s) to check if the property starts with this key
       * @returns the JSON object containing only the key/values that match the startsWith string
       */
    }, {
      key: "reduceKeys",
      value: function reduceKeys(obj, startsWiths) {
        var result = {};
        if (!obj || !startsWiths || startsWiths.length === 0) {
          return result;
        }
        Object.keys(obj).filter(function (key) {
          return startsWiths.some(function (value) {
            return key.startsWith(value);
          });
        }).forEach(function (key) {
          result[key] = obj[key];
          delete obj[key];
        });
        return result;
      }
    }, {
      key: "reorderArray",
      value: function reorderArray(value, from, to) {
        if (value && from !== to) {
          if (to >= value.length) {
            to %= value.length;
            from %= value.length;
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
      key: "getProp",
      value: function getProp(props) {
        var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var defaultProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var value = props ? props[prop] : undefined;
        return value === undefined ? defaultProps[prop] : value;
      }
    }, {
      key: "getMergedProps",
      value: function getMergedProps(props, defaultProps) {
        return Object.assign({}, defaultProps, props);
      }
    }, {
      key: "getDiffProps",
      value: function getDiffProps(props, defaultProps) {
        return this.findDiffKeys(props, defaultProps);
      }
    }, {
      key: "getPropValue",
      value: function getPropValue(obj) {
        for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          params[_key2 - 1] = arguments[_key2];
        }
        var methodParams = params;
        if (params && params.length === 1) {
          methodParams = params[0];
        }
        return this.isFunction(obj) ? obj.apply(void 0, _toConsumableArray(methodParams)) : obj;
      }
    }, {
      key: "getComponentProp",
      value: function getComponentProp(component) {
        var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var defaultProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        return this.isNotEmpty(component) ? this.getProp(component.props, prop, defaultProps) : undefined;
      }
    }, {
      key: "getComponentProps",
      value: function getComponentProps(component, defaultProps) {
        return this.isNotEmpty(component) ? this.getMergedProps(component.props, defaultProps) : undefined;
      }
    }, {
      key: "getComponentDiffProps",
      value: function getComponentDiffProps(component, defaultProps) {
        return this.isNotEmpty(component) ? this.getDiffProps(component.props, defaultProps) : undefined;
      }
    }, {
      key: "isValidChild",
      value: function isValidChild(child, type, validTypes) {
        /* eslint-disable */
        try {
          if ("production" !== 'production' && this.getProp(child, '__TYPE') !== type && child.type.displayName !== type) ;
        } catch (error) {
          // NOOP
        }
        return true;
        /* eslint-enable */
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
      key: "combinedRefs",
      value: function combinedRefs(innerRef, forwardRef) {
        if (innerRef && forwardRef) {
          if (typeof forwardRef === 'function') {
            forwardRef(innerRef.current);
          } else {
            forwardRef.current = innerRef.current;
          }
        }
      }
    }, {
      key: "removeAccents",
      value: function removeAccents(str) {
        if (str && str.search(/[\xC0-\xFF]/g) > -1) {
          str = str.replace(/[\xC0-\xC5]/g, 'A').replace(/[\xC6]/g, 'AE').replace(/[\xC7]/g, 'C').replace(/[\xC8-\xCB]/g, 'E').replace(/[\xCC-\xCF]/g, 'I').replace(/[\xD0]/g, 'D').replace(/[\xD1]/g, 'N').replace(/[\xD2-\xD6\xD8]/g, 'O').replace(/[\xD9-\xDC]/g, 'U').replace(/[\xDD]/g, 'Y').replace(/[\xDE]/g, 'P').replace(/[\xE0-\xE5]/g, 'a').replace(/[\xE6]/g, 'ae').replace(/[\xE7]/g, 'c').replace(/[\xE8-\xEB]/g, 'e').replace(/[\xEC-\xEF]/g, 'i').replace(/[\xF1]/g, 'n').replace(/[\xF2-\xF6\xF8]/g, 'o').replace(/[\xF9-\xFC]/g, 'u').replace(/[\xFE]/g, 'p').replace(/[\xFD\xFF]/g, 'y');
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
    }, {
      key: "sort",
      value: function sort(value1, value2) {
        var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var locale = arguments.length > 3 ? arguments[3] : undefined;
        var nullSortOrder = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
        var result = ObjectUtils.compare(value1, value2, locale, order);
        var finalSortOrder = order;

        // nullSortOrder == 1 means Excel like sort nulls at bottom
        if (ObjectUtils.isEmpty(value1) || ObjectUtils.isEmpty(value2)) {
          finalSortOrder = nullSortOrder === 1 ? order : nullSortOrder;
        }
        return finalSortOrder * result;
      }
    }, {
      key: "compare",
      value: function compare(value1, value2, locale) {
        var order = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        var result = -1;
        var emptyValue1 = ObjectUtils.isEmpty(value1);
        var emptyValue2 = ObjectUtils.isEmpty(value2);
        if (emptyValue1 && emptyValue2) result = 0;else if (emptyValue1) result = order;else if (emptyValue2) result = -order;else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2, locale, {
          numeric: true
        });else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
        return result;
      }
    }]);
    return ObjectUtils;
  }();

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
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

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var IconUtils = /*#__PURE__*/function () {
    function IconUtils() {
      _classCallCheck(this, IconUtils);
    }
    _createClass(IconUtils, null, [{
      key: "getJSXIcon",
      value: function getJSXIcon(icon) {
        var iconProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var content = null;
        if (icon !== null) {
          var iconType = _typeof(icon);
          var className = classNames(iconProps.className, iconType === 'string' && icon);
          content = /*#__PURE__*/React__namespace.createElement("span", _extends({}, iconProps, {
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
  function UniqueComponentId() {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'pr_id_';
    lastId++;
    return "".concat(prefix).concat(lastId);
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

    var FilterOperator = Object.freeze({
      AND: 'and',
      OR: 'or'
    });

    function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
    var FilterService = {
      filter: function filter(value, fields, filterValue, filterMatchMode, filterLocale) {
        var filteredItems = [];
        if (!value) {
          return filteredItems;
        }
        var _iterator = _createForOfIteratorHelper(value),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;
            if (typeof item === 'string') {
              if (this.filters[filterMatchMode](item, filterValue, filterLocale)) {
                filteredItems.push(item);
                continue;
              }
            } else {
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
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
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
            return true;
          }
          if (value === undefined || value === null) {
            return true;
          }
          if (value.getTime && filter.getTime) return value.getTime() !== filter.getTime();else return utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) !== utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
        },
        "in": function _in(value, filter) {
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

    function _typeof(obj) {
      "@babel/helpers - typeof";

      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      }, _typeof(obj);
    }

    function _toPrimitive(input, hint) {
      if (_typeof(input) !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (_typeof(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }

    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return _typeof(key) === "symbol" ? key : String(key);
    }

    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
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

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", {
        writable: false
      });
      return Constructor;
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var PrimeReact$1 = /*#__PURE__*/_createClass(function PrimeReact() {
      _classCallCheck(this, PrimeReact);
    });
    _defineProperty(PrimeReact$1, "ripple", false);
    _defineProperty(PrimeReact$1, "inputStyle", 'outlined');
    _defineProperty(PrimeReact$1, "locale", 'en');
    _defineProperty(PrimeReact$1, "appendTo", null);
    _defineProperty(PrimeReact$1, "cssTransition", true);
    _defineProperty(PrimeReact$1, "autoZIndex", true);
    _defineProperty(PrimeReact$1, "nonce", null);
    _defineProperty(PrimeReact$1, "nullSortOrder", 1);
    _defineProperty(PrimeReact$1, "zIndex", {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100,
      toast: 1200
    });
    _defineProperty(PrimeReact$1, "filterMatchModeOptions", {
      text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
      numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
      date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
    });

    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    var locales = {
      en: {
        startsWith: 'Starts with',
        contains: 'Contains',
        notContains: 'Not contains',
        endsWith: 'Ends with',
        equals: 'Equals',
        notEquals: 'Not equals',
        noFilter: 'No Filter',
        filter: 'Filter',
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
        close: 'Close',
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
        emptyFilterMessage: 'No available options',
        emptyMessage: 'No results found',
        aria: {
          trueLabel: 'True',
          falseLabel: 'False',
          nullLabel: 'Not Selected',
          pageLabel: 'Page',
          firstPageLabel: 'First Page',
          lastPageLabel: 'Last Page',
          nextPageLabel: 'Next Page',
          previousPageLabel: 'Previous Page',
          selectLabel: 'Select',
          unselectLabel: 'Unselect',
          expandLabel: 'Expand',
          collapseLabel: 'Collapse'
        }
      }
    };
    function locale(locale) {
      locale && (PrimeReact$1.locale = locale);
      return {
        locale: PrimeReact$1.locale,
        options: locales[PrimeReact$1.locale]
      };
    }
    function addLocale(locale, options) {
      locales[locale] = _objectSpread(_objectSpread({}, locales['en']), options);
    }
    function updateLocaleOption(key, value, locale) {
      localeOptions(locale)[key] = value;
    }
    function updateLocaleOptions(options, locale) {
      var _locale = locale || PrimeReact$1.locale;
      locales[_locale] = _objectSpread(_objectSpread({}, locales[_locale]), options);
    }
    function localeOption(key, locale) {
      var _locale = locale || PrimeReact$1.locale;
      try {
        return localeOptions(_locale)[key];
      } catch (error) {
        throw new Error("The ".concat(key, " option is not found in the current locale('").concat(_locale, "')."));
      }
    }
    function ariaLabel(key) {
      var _locale = PrimeReact$1.locale;
      try {
        return localeOptions(_locale)['aria'][key];
      } catch (error) {
        throw new Error("The ".concat(key, " option is not found in the current locale('").concat(_locale, "')."));
      }
    }
    function localeOptions(locale) {
      var _locale = locale || PrimeReact$1.locale;
      return locales[_locale];
    }

    var MessageSeverity = Object.freeze({
      SUCCESS: 'success',
      INFO: 'info',
      WARN: 'warn',
      ERROR: 'error'
    });

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
      ARROWS_H: 'pi pi-arrows-h',
      ARROWS_V: 'pi pi-arrows-v',
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

    var SortOrder = Object.freeze({
      DESC: -1,
      UNSORTED: 0,
      ASC: 1
    });

    var PrimeReact = PrimeReact$1;

    exports.FilterMatchMode = FilterMatchMode;
    exports.FilterOperator = FilterOperator;
    exports.FilterService = FilterService;
    exports.MessageSeverity = MessageSeverity;
    exports.PrimeIcons = PrimeIcons;
    exports.SortOrder = SortOrder;
    exports.addLocale = addLocale;
    exports.ariaLabel = ariaLabel;
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
this.primereact.hooks = (function (exports, React, utils) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
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

  var usePrevious = function usePrevious(newValue) {
    var ref = React__namespace.useRef(undefined);
    React__namespace.useEffect(function () {
      ref.current = newValue;
    });
    return ref.current;
  };

  /* eslint-disable */
  var useUnmountEffect = function useUnmountEffect(fn) {
    return React__namespace.useEffect(function () {
      return fn;
    }, []);
  };
  /* eslint-enable */

  /* eslint-disable */
  var useEventListener = function useEventListener(_ref) {
    var _ref$target = _ref.target,
      target = _ref$target === void 0 ? 'document' : _ref$target,
      type = _ref.type,
      listener = _ref.listener,
      options = _ref.options,
      _ref$when = _ref.when,
      when = _ref$when === void 0 ? true : _ref$when;
    var targetRef = React__namespace.useRef(null);
    var listenerRef = React__namespace.useRef(null);
    var prevOptions = usePrevious(options);
    var bind = function bind() {
      var bindOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (utils.ObjectUtils.isNotEmpty(bindOptions.target)) {
        unbind();
        (bindOptions.when || when) && (targetRef.current = utils.DomHandler.getTargetElement(bindOptions.target));
      }
      if (!listenerRef.current && targetRef.current) {
        listenerRef.current = function (event) {
          return listener && listener(event);
        };
        targetRef.current.addEventListener(type, listenerRef.current, options);
      }
    };
    var unbind = function unbind() {
      if (listenerRef.current) {
        targetRef.current.removeEventListener(type, listenerRef.current, options);
        listenerRef.current = null;
      }
    };
    React__namespace.useEffect(function () {
      if (when) {
        targetRef.current = utils.DomHandler.getTargetElement(target);
      } else {
        unbind();
        targetRef.current = null;
      }
    }, [target, when]);
    React__namespace.useEffect(function () {
      if (listenerRef.current && (listenerRef.current !== listener || prevOptions !== options)) {
        unbind();
        when && bind();
      }
    }, [listener, options]);
    useUnmountEffect(function () {
      unbind();
    });
    return [bind, unbind];
  };
  /* eslint-enable */

  var useClickOutside = function useClickOutside(ref, callback) {
    var isOutsideClicked = function isOutsideClicked(event) {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };
    var _useEventListener = useEventListener({
        type: 'mousedown',
        listener: isOutsideClicked
      }),
      _useEventListener2 = _slicedToArray(_useEventListener, 2),
      bindMouseDownListener = _useEventListener2[0],
      unbindMouseDownListener = _useEventListener2[1];
    var _useEventListener3 = useEventListener({
        type: 'touchstart',
        listener: isOutsideClicked
      }),
      _useEventListener4 = _slicedToArray(_useEventListener3, 2),
      bindTouchStartListener = _useEventListener4[0],
      unbindTouchStartListener = _useEventListener4[1];
    React__namespace.useEffect(function () {
      if (!ref.current) {
        return;
      }
      bindMouseDownListener();
      bindTouchStartListener();
      return function () {
        unbindMouseDownListener();
        unbindTouchStartListener();
      };
    });
    return [ref, callback];
  };

  var useCounter = function useCounter() {
    var initialValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      step: 1
    };
    var _React$useState = React__namespace.useState(initialValue),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      count = _React$useState2[0],
      setCount = _React$useState2[1];
    var increment = function increment() {
      if (options.max && count >= options.max) {
        return;
      }
      setCount(count + options.step);
    };
    var decrement = function decrement() {
      if (options.min || options.min === 0 && count <= options.min) {
        return null;
      }
      setCount(count - options.step);
    };
    var reset = function reset() {
      setCount(0);
    };
    return {
      count: count,
      increment: increment,
      decrement: decrement,
      reset: reset
    };
  };

  /* eslint-disable */
  var useTimeout = function useTimeout(fn) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var when = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var timeout = React__namespace.useRef(null);
    var savedCallback = React__namespace.useRef(null);
    var clear = React__namespace.useCallback(function () {
      return clearTimeout(timeout.current);
    }, [timeout.current]);
    React__namespace.useEffect(function () {
      savedCallback.current = fn;
    });
    React__namespace.useEffect(function () {
      function callback() {
        savedCallback.current();
      }
      if (when) {
        timeout.current = setTimeout(callback, delay);
        return clear;
      } else {
        clear();
      }
    }, [delay, when]);
    useUnmountEffect(function () {
      clear();
    });
    return [clear];
  };
  /* eslint-enable */

  var useDebounce = function useDebounce(initialValue, delay) {
    var _React$useState = React__namespace.useState(initialValue),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      inputValue = _React$useState2[0],
      setInputValue = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(initialValue),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      debouncedValue = _React$useState4[0],
      setDebouncedValue = _React$useState4[1];
    useTimeout(function () {
      setDebouncedValue(inputValue);
    }, delay, inputValue !== debouncedValue);
    return [inputValue, debouncedValue, setInputValue];
  };

  var TYPE_MAP = {
    ico: 'image/x-icon',
    png: 'image/png',
    svg: 'image/svg+xml',
    gif: 'image/gif'
  };
  var useFavicon = function useFavicon() {
    var newIcon = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var rel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'shortcut icon';
    React__namespace.useLayoutEffect(function () {
      if (newIcon) {
        var linkElements = document.querySelectorAll("link[rel*='icon']");
        linkElements.forEach(function (linkEl) {
          document.head.removeChild(linkEl);
        });
        var link = document.createElement('link');
        link.setAttribute('type', TYPE_MAP[newIcon.split('.').pop()]);
        link.setAttribute('rel', rel);
        link.setAttribute('href', newIcon);
        document.head.appendChild(link);
      }
    }, [newIcon, rel]);
  };

  var useIntersectionObserver = function useIntersectionObserver(ref) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isElementVisible = _React$useState2[0],
      setIsElementVisible = _React$useState2[1];
    React__namespace.useEffect(function () {
      if (!ref.current) return;
      var observer = new IntersectionObserver(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          entry = _ref2[0];
        setIsElementVisible(entry.isIntersecting);
      }, options);
      observer.observe(ref.current);
      return function () {
        observer.disconnect();
      };
    }, [options, ref]);
    return isElementVisible;
  };

  /* eslint-disable */
  var useInterval = function useInterval(fn) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var when = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var timeout = React__namespace.useRef(null);
    var savedCallback = React__namespace.useRef(null);
    var clear = React__namespace.useCallback(function () {
      return clearInterval(timeout.current);
    }, [timeout.current]);
    React__namespace.useEffect(function () {
      savedCallback.current = fn;
    });
    React__namespace.useEffect(function () {
      function callback() {
        savedCallback.current();
      }
      if (when) {
        timeout.current = setInterval(callback, delay);
        return clear;
      } else {
        clear();
      }
    }, [delay, when]);
    useUnmountEffect(function () {
      clear();
    });
    return [clear];
  };
  /* eslint-enable */

  /* eslint-disable */
  var useMountEffect = function useMountEffect(fn) {
    return React__namespace.useEffect(fn, []);
  };
  /* eslint-enable */

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var useMouse = function useMouse() {
    var _React$useState = React__namespace.useState({
        x: 0,
        y: 0
      }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      position = _React$useState2[0],
      setPosition = _React$useState2[1];
    var ref = React__namespace.useRef(null);
    var handleMouseMove = React__namespace.useCallback(function (event) {
      var x, y;
      if (ref.current) {
        var rect = event.currentTarget.getBoundingClientRect();
        x = event.pageX - rect.left - (window.pageXOffset || window.scrollX);
        y = event.pageY - rect.top - (window.pageYOffset || window.scrollY);
      } else {
        x = event.clientX;
        y = event.clientY;
      }
      setPosition({
        x: Math.max(0, Math.round(x)),
        y: Math.max(0, Math.round(y))
      });
    }, []);
    var _useEventListener = useEventListener({
        target: ref,
        type: 'mousemove',
        listener: handleMouseMove
      }),
      _useEventListener2 = _slicedToArray(_useEventListener, 2),
      bindMouseMoveEventListener = _useEventListener2[0],
      unbindMouseMoveEventListener = _useEventListener2[1];
    var _useEventListener3 = useEventListener({
        type: 'mousemove',
        listener: handleMouseMove
      }),
      _useEventListener4 = _slicedToArray(_useEventListener3, 2),
      bindDocumentMoveEventListener = _useEventListener4[0],
      unbindDocumentMoveEventListener = _useEventListener4[1];
    var reset = function reset() {
      return setPosition({
        x: 0,
        y: 0
      });
    };
    React__namespace.useEffect(function () {
      bindMouseMoveEventListener();
      if (!ref.current) {
        bindDocumentMoveEventListener();
      }
      return function () {
        unbindMouseMoveEventListener();

        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (!ref.current) {
          unbindDocumentMoveEventListener();
        }
      };
    }, [bindDocumentMoveEventListener, bindMouseMoveEventListener, unbindDocumentMoveEventListener, unbindMouseMoveEventListener]);
    return _objectSpread$1(_objectSpread$1({
      ref: ref
    }, position), {}, {
      reset: reset
    });
  };

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function useMove(_ref) {
    var _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? 'both' : _ref$mode,
      _ref$initialValue = _ref.initialValue,
      initialValue = _ref$initialValue === void 0 ? {
        x: 0,
        y: 0
      } : _ref$initialValue;
    var _React$useState = React__namespace.useState(initialValue),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      positions = _React$useState2[0],
      setPositions = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      active = _React$useState4[0],
      setActive = _React$useState4[1];
    var isMounted = React__namespace.useRef(false);
    var isSliding = React__namespace.useRef(false);
    var ref = React__namespace.useRef(null);
    var onMouseMove = function onMouseMove(event) {
      return updateMousePosition({
        x: event.clientX,
        y: event.clientY
      });
    };
    var handlePositionChange = function handlePositionChange(_ref2) {
      var clampedX = _ref2.clampedX,
        clampedY = _ref2.clampedY;
      if (mode === 'vertical') {
        setPositions({
          y: 1 - clampedY
        });
      } else if (mode === 'horizontal') {
        setPositions({
          x: clampedX
        });
      } else if (mode === 'both') {
        setPositions({
          x: clampedX,
          y: clampedY
        });
      }
    };
    var onMouseDown = function onMouseDown(event) {
      startScrubbing();
      event.preventDefault();
      onMouseMove(event);
    };
    var stopScrubbing = function stopScrubbing() {
      if (isSliding.current && isMounted.current) {
        isSliding.current = false;
        setActive(false);
        unbindListeners();
      }
    };
    var onTouchMove = function onTouchMove(event) {
      if (event.cancelable) {
        event.preventDefault();
      }
      updateMousePosition({
        x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY
      });
    };
    var onTouchStart = function onTouchStart(event) {
      if (event.cancelable) {
        event.preventDefault();
      }
      startScrubbing();
      onTouchMove(event);
    };
    var _useEventListener = useEventListener({
        type: 'mousemove',
        listener: onMouseMove
      }),
      _useEventListener2 = _slicedToArray(_useEventListener, 2),
      bindDocumentMouseMoveListener = _useEventListener2[0],
      unbindDocumentMouseMoveListener = _useEventListener2[1];
    var _useEventListener3 = useEventListener({
        type: 'mouseup',
        listener: stopScrubbing
      }),
      _useEventListener4 = _slicedToArray(_useEventListener3, 2),
      bindDocumentMouseUpListener = _useEventListener4[0],
      unbindDocumentMouseUpListener = _useEventListener4[1];
    var _useEventListener5 = useEventListener({
        type: 'touchmove',
        listener: onTouchMove
      }),
      _useEventListener6 = _slicedToArray(_useEventListener5, 2),
      bindDocumentTouchMoveListener = _useEventListener6[0],
      unbindDocumentTouchMoveListener = _useEventListener6[1];
    var _useEventListener7 = useEventListener({
        type: 'touchend',
        listener: stopScrubbing
      }),
      _useEventListener8 = _slicedToArray(_useEventListener7, 2),
      bindDocumentTouchEndListener = _useEventListener8[0],
      unbindDocumentTouchEndListener = _useEventListener8[1];
    var _useEventListener9 = useEventListener({
        target: ref,
        type: 'mousedown',
        listener: onMouseDown
      }),
      _useEventListener10 = _slicedToArray(_useEventListener9, 2),
      bindMouseDownListener = _useEventListener10[0],
      unbindMouseDownListener = _useEventListener10[1];
    var _useEventListener11 = useEventListener({
        target: ref,
        type: 'touchstart',
        listener: onTouchStart,
        options: {
          passive: false
        }
      }),
      _useEventListener12 = _slicedToArray(_useEventListener11, 2),
      bindTouchStartListener = _useEventListener12[0],
      unbindTouchStartListener = _useEventListener12[1];
    var clamp = function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    };
    var clampPositions = function clampPositions(_ref3) {
      var x = _ref3.x,
        y = _ref3.y;
      return {
        clampedX: clamp(x, 0, 1),
        clampedY: clamp(y, 0, 1)
      };
    };
    var bindListeners = function bindListeners() {
      bindDocumentMouseMoveListener();
      bindDocumentMouseUpListener();
      bindDocumentTouchMoveListener();
      bindDocumentTouchEndListener();
    };
    var unbindListeners = function unbindListeners() {
      unbindDocumentMouseMoveListener();
      unbindDocumentMouseUpListener();
      unbindDocumentTouchMoveListener();
      unbindDocumentTouchEndListener();
    };
    var reset = function reset() {
      setPositions(initialValue);
    };
    React__namespace.useEffect(function () {
      isMounted.current = true;
    }, []);
    var startScrubbing = function startScrubbing() {
      if (!isSliding.current && isMounted.current) {
        isSliding.current = true;
        setActive(true);
        bindListeners();
      }
    };
    var updateMousePosition = function updateMousePosition(_ref4) {
      var x = _ref4.x,
        y = _ref4.y;
      if (isSliding.current) {
        var rect = ref.current.getBoundingClientRect();
        var _clampPositions = clampPositions({
            x: (x - rect.left) / rect.width,
            y: (y - rect.top) / rect.height
          }),
          clampedX = _clampPositions.clampedX,
          clampedY = _clampPositions.clampedY;
        handlePositionChange({
          clampedX: clampedX,
          clampedY: clampedY
        });
      }
    };
    React__namespace.useEffect(function () {
      if (ref.current) {
        bindMouseDownListener();
        bindTouchStartListener();
      }
      return function () {
        if (ref.current) {
          unbindMouseDownListener();
          unbindTouchStartListener();
        }
      };
    }, [bindMouseDownListener, bindTouchStartListener, positions, unbindMouseDownListener, unbindTouchStartListener]);
    return _objectSpread(_objectSpread({
      ref: ref
    }, positions), {}, {
      active: active,
      reset: reset
    });
  }

  /* eslint-disable */
  var useOverlayScrollListener = function useOverlayScrollListener(_ref) {
    var target = _ref.target,
      listener = _ref.listener,
      options = _ref.options,
      _ref$when = _ref.when,
      when = _ref$when === void 0 ? true : _ref$when;
    var targetRef = React__namespace.useRef(null);
    var listenerRef = React__namespace.useRef(null);
    var scrollableParents = React__namespace.useRef([]);
    var prevOptions = usePrevious(options);
    var bind = function bind() {
      var bindOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (utils.ObjectUtils.isNotEmpty(bindOptions.target)) {
        unbind();
        (bindOptions.when || when) && (targetRef.current = utils.DomHandler.getTargetElement(bindOptions.target));
      }
      if (!listenerRef.current && targetRef.current) {
        var nodes = scrollableParents.current = utils.DomHandler.getScrollableParents(targetRef.current);
        listenerRef.current = function (event) {
          return listener && listener(event);
        };
        nodes.forEach(function (node) {
          return node.addEventListener('scroll', listenerRef.current, options);
        });
      }
    };
    var unbind = function unbind() {
      if (listenerRef.current) {
        var nodes = scrollableParents.current;
        nodes.forEach(function (node) {
          return node.removeEventListener('scroll', listenerRef.current, options);
        });
        listenerRef.current = null;
      }
    };
    React__namespace.useEffect(function () {
      if (when) {
        targetRef.current = utils.DomHandler.getTargetElement(target);
      } else {
        unbind();
        targetRef.current = null;
      }
    }, [target, when]);
    React__namespace.useEffect(function () {
      if (listenerRef.current && (listenerRef.current !== listener || prevOptions !== options)) {
        unbind();
        when && bind();
      }
    }, [listener, options]);
    useUnmountEffect(function () {
      unbind();
    });
    return [bind, unbind];
  };
  /* eslint-enable */

  var useResizeListener = function useResizeListener(_ref) {
    var listener = _ref.listener;
    return useEventListener({
      target: 'window',
      type: 'resize',
      listener: listener
    });
  };

  var useOverlayListener = function useOverlayListener(_ref) {
    var target = _ref.target,
      overlay = _ref.overlay,
      _listener = _ref.listener,
      _ref$when = _ref.when,
      when = _ref$when === void 0 ? true : _ref$when;
    var targetRef = React__namespace.useRef(null);
    var overlayRef = React__namespace.useRef(null);

    /**
     * The parameters of the 'listener' method in the following event handlers;
     * @param {Event} event A click event of the document.
     * @param {string} options.type The custom type to detect event.
     * @param {boolean} options.valid It is controlled by PrimeReact. It is determined whether it is valid or not according to some custom validation.
     */
    var _useEventListener = useEventListener({
        type: 'click',
        listener: function listener(event) {
          _listener && _listener(event, {
            type: 'outside',
            valid: event.which !== 3 && isOutsideClicked(event)
          });
        }
      }),
      _useEventListener2 = _slicedToArray(_useEventListener, 2),
      bindDocumentClickListener = _useEventListener2[0],
      unbindDocumentClickListener = _useEventListener2[1];
    var _useResizeListener = useResizeListener({
        listener: function listener(event) {
          _listener && _listener(event, {
            type: 'resize',
            valid: !utils.DomHandler.isTouchDevice()
          });
        }
      }),
      _useResizeListener2 = _slicedToArray(_useResizeListener, 2),
      bindWindowResizeListener = _useResizeListener2[0],
      unbindWindowResizeListener = _useResizeListener2[1];
    var _useEventListener3 = useEventListener({
        target: 'window',
        type: 'orientationchange',
        listener: function listener(event) {
          _listener && _listener(event, {
            type: 'orientationchange',
            valid: true
          });
        }
      }),
      _useEventListener4 = _slicedToArray(_useEventListener3, 2),
      bindWindowOrientationChangeListener = _useEventListener4[0],
      unbindWindowOrientationChangeListener = _useEventListener4[1];
    var _useOverlayScrollList = useOverlayScrollListener({
        target: target,
        listener: function listener(event) {
          _listener && _listener(event, {
            type: 'scroll',
            valid: true
          });
        }
      }),
      _useOverlayScrollList2 = _slicedToArray(_useOverlayScrollList, 2),
      bindOverlayScrollListener = _useOverlayScrollList2[0],
      unbindOverlayScrollListener = _useOverlayScrollList2[1];
    var isOutsideClicked = function isOutsideClicked(event) {
      return targetRef.current && !(targetRef.current.isSameNode(event.target) || targetRef.current.contains(event.target) || overlayRef.current && overlayRef.current.contains(event.target));
    };
    var bind = function bind() {
      bindDocumentClickListener();
      bindWindowResizeListener();
      bindWindowOrientationChangeListener();
      bindOverlayScrollListener();
    };
    var unbind = function unbind() {
      unbindDocumentClickListener();
      unbindWindowResizeListener();
      unbindWindowOrientationChangeListener();
      unbindOverlayScrollListener();
    };
    React__namespace.useEffect(function () {
      if (when) {
        targetRef.current = utils.DomHandler.getTargetElement(target);
        overlayRef.current = utils.DomHandler.getTargetElement(overlay);
      } else {
        unbind();
        targetRef.current = overlayRef.current = null;
      }
    }, [target, overlay, when]);
    React__namespace.useEffect(function () {
      unbind();
    }, [when]);
    useUnmountEffect(function () {
      unbind();
    });
    return [bind, unbind];
  };
  /* eslint-enable */

  /**
   * Hook to wrap around useState that stores the value in the browser local/session storage.
   *
   * @param {any} initialValue the initial value to store
   * @param {string} key the key to store the value in local/session storage
   * @param {string} storage either 'local' or 'session' for what type of storage
   * @returns a stateful value, and a function to update it.
   */
  var useStorage = function useStorage(initialValue, key) {
    var storage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'local';
    // Since the local storage API isn't available in server-rendering environments,
    // we check that typeof window !== 'undefined' to make SSR and SSG work properly.
    var storageAvailable = typeof window !== 'undefined';

    // subscribe to window storage event so changes in one tab to a stored value
    // are properly reflected in all tabs
    var _useEventListener = useEventListener({
        target: 'window',
        type: 'storage',
        listener: function listener(event) {
          var area = storage === 'local' ? window.localStorage : window.sessionStorage;
          if (event.storageArea === area && event.key === key) {
            setStoredValue(event.newValue || undefined);
          }
        }
      }),
      _useEventListener2 = _slicedToArray(_useEventListener, 2),
      bindWindowStorageListener = _useEventListener2[0],
      unbindWindowStorageListener = _useEventListener2[1];
    var _React$useState = React__namespace.useState(undefined),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      storedValue = _React$useState2[0],
      setStoredValue = _React$useState2[1];
    var setValue = function setValue(value) {
      try {
        // Allow value to be a function so we have same API as useState
        var valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (storageAvailable) {
          var serializedValue = JSON.stringify(valueToStore);
          storage === 'local' ? window.localStorage.setItem(key, serializedValue) : window.sessionStorage.setItem(key, serializedValue);
        }
      } catch (error) {
        throw new Error("PrimeReact useStorage: Failed to serialize the value at key: ".concat(key));
      }
    };
    React__namespace.useEffect(function () {
      if (!storageAvailable) {
        setStoredValue(initialValue);
      }
      try {
        var item = storage === 'local' ? window.localStorage.getItem(key) : window.sessionStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        // If error also return initialValue
        setStoredValue(initialValue);
      }
      bindWindowStorageListener();
      return function () {
        return unbindWindowStorageListener();
      };
    }, []);
    return [storedValue, setValue];
  };

  /**
   * Hook to wrap around useState that stores the value in the browser local storage.
   *
   * @param {any} initialValue the initial value to store
   * @param {string} key the key to store the value in local storage
   * @returns a stateful value, and a function to update it.
   */
  var useLocalStorage = function useLocalStorage(initialValue, key) {
    return useStorage(initialValue, key, 'local');
  };

  /**
   * Hook to wrap around useState that stores the value in the browser session storage.
   *
   * @param {any} initialValue the initial value to store
   * @param {string} key the key to store the value in session storage
   * @returns a stateful value, and a function to update it.
   */
  var useSessionStorage = function useSessionStorage(initialValue, key) {
    return useStorage(initialValue, key, 'session');
  };
  /* eslint-enable */

  /* eslint-disable */
  var useUpdateEffect = function useUpdateEffect(fn, deps) {
    var mounted = React__namespace.useRef(false);
    return React__namespace.useEffect(function () {
      if (!mounted.current) {
        mounted.current = true;
        return;
      }
      return fn && fn();
    }, deps);
  };
  /* eslint-enable */

  exports.useClickOutside = useClickOutside;
  exports.useCounter = useCounter;
  exports.useDebounce = useDebounce;
  exports.useEventListener = useEventListener;
  exports.useFavicon = useFavicon;
  exports.useIntersectionObserver = useIntersectionObserver;
  exports.useInterval = useInterval;
  exports.useLocalStorage = useLocalStorage;
  exports.useMountEffect = useMountEffect;
  exports.useMouse = useMouse;
  exports.useMove = useMove;
  exports.useOverlayListener = useOverlayListener;
  exports.useOverlayScrollListener = useOverlayScrollListener;
  exports.usePrevious = usePrevious;
  exports.useResizeListener = useResizeListener;
  exports.useSessionStorage = useSessionStorage;
  exports.useStorage = useStorage;
  exports.useTimeout = useTimeout;
  exports.useUnmountEffect = useUnmountEffect;
  exports.useUpdateEffect = useUpdateEffect;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils);

this.primereact = this.primereact || {};
this.primereact.ripple = (function (exports, React, PrimeReact, hooks, utils) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var React__namespace = /*#__PURE__*/_interopNamespace(React);
    var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

    var Ripple = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function () {
      var inkRef = React__namespace.useRef(null);
      var targetRef = React__namespace.useRef(null);
      var getTarget = function getTarget() {
        return inkRef.current && inkRef.current.parentElement;
      };
      var bindEvents = function bindEvents() {
        if (targetRef.current) {
          targetRef.current.addEventListener('mousedown', onMouseDown);
          utils.DomHandler.isTouchDevice() && targetRef.current.addEventListener('touchstart', onTouchStart);
        }
      };
      var unbindEvents = function unbindEvents() {
        if (targetRef.current) {
          targetRef.current.removeEventListener('mousedown', onMouseDown);
          utils.DomHandler.isTouchDevice() && targetRef.current.removeEventListener('touchstart', onTouchStart);
        }
      };
      var onTouchStart = function onTouchStart(event) {
        var offset = utils.DomHandler.getOffset(targetRef.current);
        var offsetX = event.targetTouches[0].pageX - offset.left + document.body.scrollTop - utils.DomHandler.getWidth(inkRef.current) / 2;
        var offsetY = event.targetTouches[0].pageY - offset.top + document.body.scrollLeft - utils.DomHandler.getHeight(inkRef.current) / 2;
        activateRipple(offsetX, offsetY);
      };
      var onMouseDown = function onMouseDown(event) {
        if (utils.DomHandler.isTouchDevice()) {
          // already started ripple with onTouchStart
          return;
        }
        var offset = utils.DomHandler.getOffset(targetRef.current);
        var offsetX = event.pageX - offset.left + document.body.scrollTop - utils.DomHandler.getWidth(inkRef.current) / 2;
        var offsetY = event.pageY - offset.top + document.body.scrollLeft - utils.DomHandler.getHeight(inkRef.current) / 2;
        activateRipple(offsetX, offsetY);
      };
      var activateRipple = function activateRipple(offsetX, offsetY) {
        if (!inkRef.current || getComputedStyle(inkRef.current, null).display === 'none') {
          return;
        }
        utils.DomHandler.removeClass(inkRef.current, 'p-ink-active');
        if (!utils.DomHandler.getHeight(inkRef.current) && !utils.DomHandler.getWidth(inkRef.current)) {
          var d = Math.max(utils.DomHandler.getOuterWidth(targetRef.current), utils.DomHandler.getOuterHeight(targetRef.current));
          inkRef.current.style.height = d + 'px';
          inkRef.current.style.width = d + 'px';
        }
        inkRef.current.style.top = offsetY + 'px';
        inkRef.current.style.left = offsetX + 'px';
        utils.DomHandler.addClass(inkRef.current, 'p-ink-active');
      };
      var onAnimationEnd = function onAnimationEnd(event) {
        utils.DomHandler.removeClass(event.currentTarget, 'p-ink-active');
      };
      hooks.useMountEffect(function () {
        if (inkRef.current) {
          targetRef.current = getTarget();
          bindEvents();
        }
      });
      hooks.useUpdateEffect(function () {
        if (inkRef.current && !targetRef.current) {
          targetRef.current = getTarget();
          bindEvents();
        }
      });
      hooks.useUnmountEffect(function () {
        if (inkRef.current) {
          targetRef.current = null;
          unbindEvents();
        }
      });
      return PrimeReact__default["default"].ripple ? /*#__PURE__*/React__namespace.createElement("span", {
        role: "presentation",
        ref: inkRef,
        className: "p-ink",
        onAnimationEnd: onAnimationEnd
      }) : null;
    }));
    Ripple.displayName = 'Ripple';

    exports.Ripple = Ripple;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, React, primereact.api, primereact.hooks, primereact.utils);

this.primereact = this.primereact || {};
this.primereact.csstransition = (function (exports, React, reactTransitionGroup, PrimeReact, hooks, utils) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);
  var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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

  var CSSTransitionBase = {
    defaultProps: {
      __TYPE: 'CSSTransition',
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, CSSTransitionBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, CSSTransitionBase.defaultProps);
    }
  };

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var CSSTransition = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var props = CSSTransitionBase.getProps(inProps);
    var disabled = props.disabled || props.options && props.options.disabled || !PrimeReact__default["default"].cssTransition;
    var onEnter = function onEnter(node, isAppearing) {
      props.onEnter && props.onEnter(node, isAppearing); // component
      props.options && props.options.onEnter && props.options.onEnter(node, isAppearing); // user option
    };

    var onEntering = function onEntering(node, isAppearing) {
      props.onEntering && props.onEntering(node, isAppearing); // component
      props.options && props.options.onEntering && props.options.onEntering(node, isAppearing); // user option
    };

    var onEntered = function onEntered(node, isAppearing) {
      props.onEntered && props.onEntered(node, isAppearing); // component
      props.options && props.options.onEntered && props.options.onEntered(node, isAppearing); // user option
    };

    var onExit = function onExit(node) {
      props.onExit && props.onExit(node); // component
      props.options && props.options.onExit && props.options.onExit(node); // user option
    };

    var onExiting = function onExiting(node) {
      props.onExiting && props.onExiting(node); // component
      props.options && props.options.onExiting && props.options.onExiting(node); // user option
    };

    var onExited = function onExited(node) {
      props.onExited && props.onExited(node); // component
      props.options && props.options.onExited && props.options.onExited(node); // user option
    };

    hooks.useUpdateEffect(function () {
      if (disabled) {
        // no animation
        var node = utils.ObjectUtils.getRefElement(props.nodeRef);
        if (props["in"]) {
          onEnter(node, true);
          onEntering(node, true);
          onEntered(node, true);
        } else {
          onExit(node);
          onExiting(node);
          onExited(node);
        }
      }
    }, [props["in"]]);
    if (disabled) {
      return props["in"] ? props.children : null;
    } else {
      var immutableProps = {
        nodeRef: props.nodeRef,
        "in": props["in"],
        onEnter: onEnter,
        onEntering: onEntering,
        onEntered: onEntered,
        onExit: onExit,
        onExiting: onExiting,
        onExited: onExited
      };
      var mutableProps = {
        classNames: props.classNames,
        timeout: props.timeout,
        unmountOnExit: props.unmountOnExit
      };
      var mergedProps = _objectSpread(_objectSpread(_objectSpread({}, mutableProps), props.options || {}), immutableProps);
      return /*#__PURE__*/React__namespace.createElement(reactTransitionGroup.CSSTransition, mergedProps, props.children);
    }
  });
  CSSTransition.displayName = 'CSSTransition';

  exports.CSSTransition = CSSTransition;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, ReactTransitionGroup, primereact.api, primereact.hooks, primereact.utils);

this.primereact = this.primereact || {};
this.primereact.portal = (function (exports, React, ReactDOM, PrimeReact, hooks, utils) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);
  var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
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

  var PortalBase = {
    defaultProps: {
      __TYPE: 'Portal',
      element: null,
      appendTo: null,
      visible: false,
      onMounted: null,
      onUnmounted: null,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, PortalBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, PortalBase.defaultProps);
    }
  };

  var Portal = /*#__PURE__*/React__namespace.memo(function (inProps) {
    var props = PortalBase.getProps(inProps);
    var _React$useState = React__namespace.useState(props.visible && utils.DomHandler.hasDOM()),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      mountedState = _React$useState2[0],
      setMountedState = _React$useState2[1];
    hooks.useMountEffect(function () {
      if (utils.DomHandler.hasDOM() && !mountedState) {
        setMountedState(true);
        props.onMounted && props.onMounted();
      }
    });
    hooks.useUpdateEffect(function () {
      props.onMounted && props.onMounted();
    }, [mountedState]);
    hooks.useUnmountEffect(function () {
      props.onUnmounted && props.onUnmounted();
    });
    var element = props.element || props.children;
    if (element && mountedState) {
      var appendTo = props.appendTo || PrimeReact__default["default"].appendTo || document.body;
      return appendTo === 'self' ? element : /*#__PURE__*/ReactDOM__default["default"].createPortal(element, appendTo);
    }
    return null;
  });
  Portal.displayName = 'Portal';

  exports.Portal = Portal;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, ReactDOM, primereact.api, primereact.hooks, primereact.utils);

this.primereact = this.primereact || {};
this.primereact.keyfilter = (function (exports) {
  'use strict';

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
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

  var KeyFilter = {
    /* eslint-disable */
    DEFAULT_MASKS: {
      pint: /[\d]/,
      "int": /[\d\-]/,
      pnum: /[\d\.]/,
      money: /[\d\.\s,]/,
      num: /[\d\-\.]/,
      hex: /[0-9a-f]/i,
      email: /[a-z0-9_\.\-@]/i,
      alpha: /[a-z_]/i,
      alphanum: /[a-z0-9_]/i
    },
    /* eslint-enable */getRegex: function getRegex(keyfilter) {
      return KeyFilter.DEFAULT_MASKS[keyfilter] ? KeyFilter.DEFAULT_MASKS[keyfilter] : keyfilter;
    },
    onKeyPress: function onKeyPress(e, keyfilter, validateOnly) {
      if (validateOnly) {
        return;
      }
      if (e.ctrlKey || e.altKey) {
        return;
      }
      var isPrintableKey = e.key.length === 1;
      if (!isPrintableKey) {
        return;
      }
      var regex = this.getRegex(keyfilter);
      if (!regex.test(e.key)) {
        e.preventDefault();
      }
    },
    onPaste: function onPaste(e, keyfilter, validateOnly) {
      if (validateOnly) {
        return;
      }
      var regex = this.getRegex(keyfilter);
      var clipboard = e.clipboardData.getData('text');

      // loop over each letter pasted and if any fail prevent the paste
      _toConsumableArray(clipboard).forEach(function (c) {
        if (!regex.test(c)) {
          e.preventDefault();
          return false;
        }
      });
    },
    validate: function validate(e, keyfilter) {
      var value = e.target.value,
        validatePattern = true;
      var regex = this.getRegex(keyfilter);
      if (value && !regex.test(value)) {
        validatePattern = false;
      }
      return validatePattern;
    }
  };

  exports.KeyFilter = KeyFilter;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});

this.primereact = this.primereact || {};
this.primereact.tooltip = (function (exports, React, PrimeReact, hooks, portal, utils) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);
  var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
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

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
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

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  var TooltipBase = {
    defaultProps: {
      __TYPE: 'Tooltip',
      appendTo: null,
      at: null,
      autoHide: true,
      autoZIndex: true,
      baseZIndex: 0,
      className: null,
      content: null,
      disabled: false,
      event: null,
      hideDelay: 0,
      hideEvent: 'mouseleave',
      id: null,
      mouseTrack: false,
      mouseTrackLeft: 5,
      mouseTrackTop: 5,
      my: null,
      onBeforeHide: null,
      onBeforeShow: null,
      onHide: null,
      onShow: null,
      position: 'right',
      showDelay: 0,
      showEvent: 'mouseenter',
      showOnDisabled: false,
      style: null,
      target: null,
      updateDelay: 0,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, TooltipBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, TooltipBase.defaultProps);
    }
  };

  var Tooltip = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var props = TooltipBase.getProps(inProps);
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visibleState = _React$useState2[0],
      setVisibleState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(props.position),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      positionState = _React$useState4[0],
      setPositionState = _React$useState4[1];
    var _React$useState5 = React__namespace.useState(''),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      classNameState = _React$useState6[0],
      setClassNameState = _React$useState6[1];
    var elementRef = React__namespace.useRef(null);
    var textRef = React__namespace.useRef(null);
    var currentTargetRef = React__namespace.useRef(null);
    var containerSize = React__namespace.useRef(null);
    var allowHide = React__namespace.useRef(true);
    var timeouts = React__namespace.useRef({});
    var currentMouseEvent = React__namespace.useRef(null);
    var _useResizeListener = hooks.useResizeListener({
        listener: function listener(event) {
          !utils.DomHandler.isTouchDevice() && hide(event);
        }
      }),
      _useResizeListener2 = _slicedToArray(_useResizeListener, 2),
      bindWindowResizeListener = _useResizeListener2[0],
      unbindWindowResizeListener = _useResizeListener2[1];
    var _useOverlayScrollList = hooks.useOverlayScrollListener({
        target: currentTargetRef.current,
        listener: function listener(event) {
          hide(event);
        },
        when: visibleState
      }),
      _useOverlayScrollList2 = _slicedToArray(_useOverlayScrollList, 2),
      bindOverlayScrollListener = _useOverlayScrollList2[0],
      unbindOverlayScrollListener = _useOverlayScrollList2[1];
    var isTargetContentEmpty = function isTargetContentEmpty(target) {
      return !(props.content || getTargetOption(target, 'tooltip'));
    };
    var isContentEmpty = function isContentEmpty(target) {
      return !(props.content || getTargetOption(target, 'tooltip') || props.children);
    };
    var isMouseTrack = function isMouseTrack(target) {
      return getTargetOption(target, 'mousetrack') || props.mouseTrack;
    };
    var isDisabled = function isDisabled(target) {
      return getTargetOption(target, 'disabled') === 'true' || hasTargetOption(target, 'disabled') || props.disabled;
    };
    var isShowOnDisabled = function isShowOnDisabled(target) {
      return getTargetOption(target, 'showondisabled') || props.showOnDisabled;
    };
    var isAutoHide = function isAutoHide() {
      return getTargetOption(currentTargetRef.current, 'autohide') || props.autoHide;
    };
    var getTargetOption = function getTargetOption(target, option) {
      return hasTargetOption(target, "data-pr-".concat(option)) ? target.getAttribute("data-pr-".concat(option)) : null;
    };
    var hasTargetOption = function hasTargetOption(target, option) {
      return target && target.hasAttribute(option);
    };
    var getEvents = function getEvents(target) {
      var showEvents = [getTargetOption(target, 'showevent') || props.showEvent];
      var hideEvents = [getTargetOption(target, 'hideevent') || props.hideEvent];
      if (isMouseTrack(target)) {
        showEvents = ['mousemove'];
        hideEvents = ['mouseleave'];
      } else {
        var event = getTargetOption(target, 'event') || props.event;
        if (event === 'focus') {
          showEvents = ['focus'];
          hideEvents = ['blur'];
        }
        if (event === 'both') {
          showEvents = ['focus', 'mouseenter'];
          hideEvents = ['blur', 'mouseleave'];
        }
      }
      return {
        showEvents: showEvents,
        hideEvents: hideEvents
      };
    };
    var getPosition = function getPosition(target) {
      return getTargetOption(target, 'position') || positionState;
    };
    var getMouseTrackPosition = function getMouseTrackPosition(target) {
      var top = getTargetOption(target, 'mousetracktop') || props.mouseTrackTop;
      var left = getTargetOption(target, 'mousetrackleft') || props.mouseTrackLeft;
      return {
        top: top,
        left: left
      };
    };
    var updateText = function updateText(target, callback) {
      if (textRef.current) {
        var content = getTargetOption(target, 'tooltip') || props.content;
        if (content) {
          textRef.current.innerHTML = ''; // remove children
          textRef.current.appendChild(document.createTextNode(content));
          callback();
        } else if (props.children) {
          callback();
        }
      }
    };
    var updateTooltipState = function updateTooltipState(position) {
      updateText(currentTargetRef.current, function () {
        var _currentMouseEvent$cu = currentMouseEvent.current,
          x = _currentMouseEvent$cu.pageX,
          y = _currentMouseEvent$cu.pageY;
        if (props.autoZIndex && !utils.ZIndexUtils.get(elementRef.current)) {
          utils.ZIndexUtils.set('tooltip', elementRef.current, PrimeReact__default["default"].autoZIndex, props.baseZIndex || PrimeReact__default["default"].zIndex['tooltip']);
        }
        elementRef.current.style.left = '';
        elementRef.current.style.top = '';

        // GitHub #2695 disable pointer events when autohiding
        if (isAutoHide()) {
          elementRef.current.style.pointerEvents = 'none';
        }
        if ((isMouseTrack(currentTargetRef.current) || position == 'mouse') && !containerSize.current) {
          containerSize.current = {
            width: utils.DomHandler.getOuterWidth(elementRef.current),
            height: utils.DomHandler.getOuterHeight(elementRef.current)
          };
        }
        align(currentTargetRef.current, {
          x: x,
          y: y
        }, position);
      });
    };
    var show = function show(e) {
      currentTargetRef.current = e.currentTarget;
      var disabled = isDisabled(currentTargetRef.current);
      var empty = isContentEmpty(isShowOnDisabled(currentTargetRef.current) && disabled ? currentTargetRef.current.firstChild : currentTargetRef.current);
      if (empty || disabled) {
        return;
      }
      currentMouseEvent.current = e;
      if (visibleState) {
        applyDelay('updateDelay', updateTooltipState);
      } else {
        // #2653 give the callback a chance to return false and not continue with display
        var success = sendCallback(props.onBeforeShow, {
          originalEvent: e,
          target: currentTargetRef.current
        });
        if (success) {
          applyDelay('showDelay', function () {
            setVisibleState(true);
            sendCallback(props.onShow, {
              originalEvent: e,
              target: currentTargetRef.current
            });
          });
        }
      }
    };
    var hide = function hide(e) {
      clearTimeouts();
      if (visibleState) {
        var success = sendCallback(props.onBeforeHide, {
          originalEvent: e,
          target: currentTargetRef.current
        });
        if (success) {
          applyDelay('hideDelay', function () {
            if (!isAutoHide() && allowHide.current === false) {
              return;
            }
            utils.ZIndexUtils.clear(elementRef.current);
            utils.DomHandler.removeClass(elementRef.current, 'p-tooltip-active');
            setVisibleState(false);
            sendCallback(props.onHide, {
              originalEvent: e,
              target: currentTargetRef.current
            });
          });
        }
      }
    };
    var align = function align(target, coordinate, position) {
      var left = 0,
        top = 0,
        currentPosition = position || positionState;
      if ((isMouseTrack(target) || currentPosition == 'mouse') && coordinate) {
        var _containerSize = {
          width: utils.DomHandler.getOuterWidth(elementRef.current),
          height: utils.DomHandler.getOuterHeight(elementRef.current)
        };
        left = coordinate.x;
        top = coordinate.y;
        var _getMouseTrackPositio = getMouseTrackPosition(target),
          mouseTrackTop = _getMouseTrackPositio.top,
          mouseTrackLeft = _getMouseTrackPositio.left;
        switch (currentPosition) {
          case 'left':
            left -= _containerSize.width + mouseTrackLeft;
            top -= _containerSize.height / 2 - mouseTrackTop;
            break;
          case 'right':
          case 'mouse':
            left += mouseTrackLeft;
            top -= _containerSize.height / 2 - mouseTrackTop;
            break;
          case 'top':
            left -= _containerSize.width / 2 - mouseTrackLeft;
            top -= _containerSize.height + mouseTrackTop;
            break;
          case 'bottom':
            left -= _containerSize.width / 2 - mouseTrackLeft;
            top += mouseTrackTop;
            break;
        }
        if (left <= 0 || containerSize.current.width > _containerSize.width) {
          elementRef.current.style.left = '0px';
          elementRef.current.style.right = window.innerWidth - _containerSize.width - left + 'px';
        } else {
          elementRef.current.style.right = '';
          elementRef.current.style.left = left + 'px';
        }
        elementRef.current.style.top = top + 'px';
        utils.DomHandler.addClass(elementRef.current, 'p-tooltip-active');
      } else {
        var pos = utils.DomHandler.findCollisionPosition(currentPosition);
        var my = getTargetOption(target, 'my') || props.my || pos.my;
        var at = getTargetOption(target, 'at') || props.at || pos.at;
        elementRef.current.style.padding = '0px';
        utils.DomHandler.flipfitCollision(elementRef.current, target, my, at, function (calculatedPosition) {
          var _calculatedPosition$a = calculatedPosition.at,
            atX = _calculatedPosition$a.x,
            atY = _calculatedPosition$a.y;
          var myX = calculatedPosition.my.x;
          var newPosition = props.at ? atX !== 'center' && atX !== myX ? atX : atY : calculatedPosition.at["".concat(pos.axis)];
          elementRef.current.style.padding = '';
          setPositionState(newPosition);
          updateContainerPosition(newPosition);
          utils.DomHandler.addClass(elementRef.current, 'p-tooltip-active');
        });
      }
    };
    var updateContainerPosition = function updateContainerPosition(position) {
      if (elementRef.current) {
        var style = getComputedStyle(elementRef.current);
        if (position === 'left') elementRef.current.style.left = parseFloat(style.left) - parseFloat(style.paddingLeft) * 2 + 'px';else if (position === 'top') elementRef.current.style.top = parseFloat(style.top) - parseFloat(style.paddingTop) * 2 + 'px';
      }
    };
    var onMouseEnter = function onMouseEnter() {
      if (!isAutoHide()) {
        allowHide.current = false;
      }
    };
    var onMouseLeave = function onMouseLeave(e) {
      if (!isAutoHide()) {
        allowHide.current = true;
        hide(e);
      }
    };
    var bindTargetEvent = function bindTargetEvent(target) {
      if (target) {
        var _getEvents = getEvents(target),
          showEvents = _getEvents.showEvents,
          hideEvents = _getEvents.hideEvents;
        var currentTarget = getTarget(target);
        showEvents.forEach(function (event) {
          return currentTarget.addEventListener(event, show);
        });
        hideEvents.forEach(function (event) {
          return currentTarget.addEventListener(event, hide);
        });
      }
    };
    var unbindTargetEvent = function unbindTargetEvent(target) {
      if (target) {
        var _getEvents2 = getEvents(target),
          showEvents = _getEvents2.showEvents,
          hideEvents = _getEvents2.hideEvents;
        var currentTarget = getTarget(target);
        showEvents.forEach(function (event) {
          return currentTarget.removeEventListener(event, show);
        });
        hideEvents.forEach(function (event) {
          return currentTarget.removeEventListener(event, hide);
        });
      }
    };
    var applyDelay = function applyDelay(delayProp, callback) {
      clearTimeouts();
      var delay = getTargetOption(currentTargetRef.current, delayProp.toLowerCase()) || props[delayProp];
      !!delay ? timeouts.current["".concat(delayProp)] = setTimeout(function () {
        return callback();
      }, delay) : callback();
    };
    var sendCallback = function sendCallback(callback) {
      if (callback) {
        for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          params[_key - 1] = arguments[_key];
        }
        var result = callback.apply(void 0, params);
        if (result === undefined) {
          result = true;
        }
        return result;
      }
      return true;
    };
    var clearTimeouts = function clearTimeouts() {
      Object.values(timeouts.current).forEach(function (t) {
        return clearTimeout(t);
      });
    };
    var getTarget = function getTarget(target) {
      if (target) {
        if (isShowOnDisabled(target)) {
          if (!target.hasWrapper) {
            var wrapper = document.createElement('span');
            target.parentNode.insertBefore(wrapper, target);
            wrapper.appendChild(target);
            target.hasWrapper = true;
            return wrapper;
          } else {
            return target.parentElement;
          }
        } else if (target.hasWrapper) {
          var _target$parentElement;
          (_target$parentElement = target.parentElement).replaceWith.apply(_target$parentElement, _toConsumableArray(target.parentElement.childNodes));
          delete target.hasWrapper;
        }
        return target;
      }
      return null;
    };
    var updateTargetEvents = function updateTargetEvents(target) {
      unloadTargetEvents(target);
      loadTargetEvents(target);
    };
    var loadTargetEvents = function loadTargetEvents(target) {
      setTargetEventOperations(target || props.target, bindTargetEvent);
    };
    var unloadTargetEvents = function unloadTargetEvents(target) {
      setTargetEventOperations(target || props.target, unbindTargetEvent);
    };
    var setTargetEventOperations = function setTargetEventOperations(target, operation) {
      target = utils.ObjectUtils.getRefElement(target);
      if (target) {
        if (utils.DomHandler.isElement(target)) {
          operation(target);
        } else {
          var setEvent = function setEvent(target) {
            var element = utils.DomHandler.find(document, target);
            element.forEach(function (el) {
              operation(el);
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
    };
    hooks.useMountEffect(function () {
      loadTargetEvents();
      if (visibleState && currentTargetRef.current && isDisabled(currentTargetRef.current)) {
        hide();
      }
    });
    hooks.useUpdateEffect(function () {
      loadTargetEvents();
      return function () {
        unloadTargetEvents();
      };
    }, [show, hide, props.target]);
    hooks.useUpdateEffect(function () {
      if (visibleState) {
        var position = getPosition(currentTargetRef.current);
        var classname = getTargetOption(currentTargetRef.current, 'classname');
        setPositionState(position);
        setClassNameState(classname);
        updateTooltipState(position);
        bindWindowResizeListener();
        bindOverlayScrollListener();
      } else {
        setPositionState(props.position);
        setClassNameState('');
        currentTargetRef.current = null;
        containerSize.current = null;
        allowHide.current = true;
      }
      return function () {
        unbindWindowResizeListener();
        unbindOverlayScrollListener();
      };
    }, [visibleState]);
    hooks.useUpdateEffect(function () {
      if (visibleState) {
        applyDelay('updateDelay', function () {
          updateText(currentTargetRef.current, function () {
            align(currentTargetRef.current);
          });
        });
      }
    }, [props.content]);
    hooks.useUnmountEffect(function () {
      clearTimeouts();
      unloadTargetEvents();
      utils.ZIndexUtils.clear(elementRef.current);
    });
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        updateTargetEvents: updateTargetEvents,
        loadTargetEvents: loadTargetEvents,
        unloadTargetEvents: unloadTargetEvents,
        show: show,
        hide: hide,
        getElement: function getElement() {
          return elementRef.current;
        },
        getTarget: function getTarget() {
          return currentTargetRef.current;
        }
      };
    });
    var createElement = function createElement() {
      var otherProps = TooltipBase.getOtherProps(props);
      var tooltipClassName = utils.classNames('p-tooltip p-component', _defineProperty({}, "p-tooltip-".concat(positionState), true), props.className, classNameState);
      var empty = isTargetContentEmpty(currentTargetRef.current);
      return /*#__PURE__*/React__namespace.createElement("div", _extends({
        id: props.id,
        ref: elementRef,
        className: tooltipClassName,
        style: props.style,
        role: "tooltip",
        "aria-hidden": visibleState
      }, otherProps, {
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave
      }), /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-tooltip-arrow"
      }), /*#__PURE__*/React__namespace.createElement("div", {
        ref: textRef,
        className: "p-tooltip-text"
      }, empty && props.children));
    };
    if (visibleState) {
      var element = createElement();
      return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
        element: element,
        appendTo: props.appendTo,
        visible: true
      });
    }
    return null;
  }));
  Tooltip.displayName = 'Tooltip';

  exports.Tooltip = Tooltip;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.hooks, primereact.portal, primereact.utils);

this.primereact = this.primereact || {};
this.primereact.virtualscroller = (function (exports, React, hooks, utils) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
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

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
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

  var VirtualScrollerBase = {
    defaultProps: {
      __TYPE: 'VirtualScroller',
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
      resizeDelay: 10,
      lazy: false,
      disabled: false,
      loaderDisabled: false,
      columns: null,
      loading: undefined,
      autoSize: false,
      showSpacer: true,
      showLoader: false,
      loadingTemplate: null,
      loaderIconTemplate: null,
      itemTemplate: null,
      contentTemplate: null,
      onScroll: null,
      onScrollIndexChange: null,
      onLazyLoad: null,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, VirtualScrollerBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, VirtualScrollerBase.defaultProps);
    }
  };

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var VirtualScroller = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var props = VirtualScrollerBase.getProps(inProps);
    var vertical = props.orientation === 'vertical';
    var horizontal = props.orientation === 'horizontal';
    var both = props.orientation === 'both';
    var _React$useState = React__namespace.useState(both ? {
        rows: 0,
        cols: 0
      } : 0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      firstState = _React$useState2[0],
      setFirstState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(both ? {
        rows: 0,
        cols: 0
      } : 0),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      lastState = _React$useState4[0],
      setLastState = _React$useState4[1];
    var _React$useState5 = React__namespace.useState(both ? {
        rows: 0,
        cols: 0
      } : 0),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      numItemsInViewportState = _React$useState6[0],
      setNumItemsInViewportState = _React$useState6[1];
    var _React$useState7 = React__namespace.useState(props.numToleratedItems),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      numToleratedItemsState = _React$useState8[0],
      setNumToleratedItemsState = _React$useState8[1];
    var _React$useState9 = React__namespace.useState(props.loading || false),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      loadingState = _React$useState10[0],
      setLoadingState = _React$useState10[1];
    var _React$useState11 = React__namespace.useState([]),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      loaderArrState = _React$useState12[0],
      setLoaderArrState = _React$useState12[1];
    var elementRef = React__namespace.useRef(null);
    var _contentRef = React__namespace.useRef(null);
    var _spacerRef = React__namespace.useRef(null);
    var _stickyRef = React__namespace.useRef(null);
    var lastScrollPos = React__namespace.useRef(both ? {
      top: 0,
      left: 0
    } : 0);
    var scrollTimeout = React__namespace.useRef(null);
    var resizeTimeout = React__namespace.useRef(null);
    var defaultWidth = React__namespace.useRef(null);
    var defaultHeight = React__namespace.useRef(null);
    var prevItems = hooks.usePrevious(props.items);
    var prevLoading = hooks.usePrevious(props.loading);
    var _useResizeListener = hooks.useResizeListener({
        listener: function listener(event) {
          return onResize();
        }
      }),
      _useResizeListener2 = _slicedToArray(_useResizeListener, 1),
      bindWindowResizeListener = _useResizeListener2[0];
    var _useEventListener = hooks.useEventListener({
        target: 'window',
        type: 'orientationchange',
        listener: function listener(event) {
          return onResize();
        }
      }),
      _useEventListener2 = _slicedToArray(_useEventListener, 1),
      bindOrientationChangeListener = _useEventListener2[0];
    var getElementRef = function getElementRef() {
      return elementRef;
    };
    var scrollTo = function scrollTo(options) {
      lastScrollPos.current = both ? {
        top: 0,
        left: 0
      } : 0;
      elementRef.current && elementRef.current.scrollTo(options);
    };
    var scrollToIndex = function scrollToIndex(index) {
      var behavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'auto';
      var _calculateNumItems = calculateNumItems(),
        numToleratedItems = _calculateNumItems.numToleratedItems;
      var calculateFirst = function calculateFirst() {
        var _index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var _numT = arguments.length > 1 ? arguments[1] : undefined;
        return _index <= _numT ? 0 : _index;
      };
      var calculateCoord = function calculateCoord(_first, _size) {
        return _first * _size;
      };
      var scrollToItem = function scrollToItem() {
        var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return scrollTo({
          left: left,
          top: top,
          behavior: behavior
        });
      };
      if (both) {
        var newFirst = {
          rows: calculateFirst(index[0], numToleratedItems[0]),
          cols: calculateFirst(index[1], numToleratedItems[1])
        };
        if (newFirst.rows !== firstState.rows || newFirst.cols !== firstState.cols) {
          scrollToItem(calculateCoord(newFirst.cols, props.itemSize[1]), calculateCoord(newFirst.rows, props.itemSize[0]));
        }
      } else {
        var _newFirst = calculateFirst(index, numToleratedItems);
        if (_newFirst !== firstState) {
          horizontal ? scrollToItem(calculateCoord(_newFirst, props.itemSize), 0) : scrollToItem(0, calculateCoord(_newFirst, props.itemSize));
        }
      }
    };
    var scrollInView = function scrollInView(index, to) {
      var behavior = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'auto';
      if (to) {
        var _getRenderedRange = getRenderedRange(),
          first = _getRenderedRange.first,
          viewport = _getRenderedRange.viewport;
        var scrollToItem = function scrollToItem() {
          var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          return scrollTo({
            left: left,
            top: top,
            behavior: behavior
          });
        };
        var isToStart = to === 'to-start';
        var isToEnd = to === 'to-end';
        if (isToStart) {
          if (both) {
            if (viewport.first.rows - first.rows > index[0]) {
              scrollToItem(viewport.first.cols * props.itemSize[1], (viewport.first.rows - 1) * props.itemSize[0]);
            } else if (viewport.first.cols - first.cols > index[1]) {
              scrollToItem((viewport.first.cols - 1) * props.itemSize[1], viewport.first.rows * props.itemSize[0]);
            }
          } else {
            if (viewport.first - first > index) {
              var pos = (viewport.first - 1) * props.itemSize;
              horizontal ? scrollToItem(pos, 0) : scrollToItem(0, pos);
            }
          }
        } else if (isToEnd) {
          if (both) {
            if (viewport.last.rows - first.rows <= index[0] + 1) {
              scrollToItem(viewport.first.cols * props.itemSize[1], (viewport.first.rows + 1) * props.itemSize[0]);
            } else if (viewport.last.cols - first.cols <= index[1] + 1) {
              scrollToItem((viewport.first.cols + 1) * props.itemSize[1], viewport.first.rows * props.itemSize[0]);
            }
          } else {
            if (viewport.last - first <= index + 1) {
              var _pos2 = (viewport.first + 1) * props.itemSize;
              horizontal ? scrollToItem(_pos2, 0) : scrollToItem(0, _pos2);
            }
          }
        }
      } else {
        scrollToIndex(index, behavior);
      }
    };
    var getRows = function getRows() {
      return loadingState ? props.loaderDisabled ? loaderArrState : [] : loadedItems();
    };
    var getColumns = function getColumns() {
      if (props.columns && both || horizontal) {
        return loadingState && props.loaderDisabled ? both ? loaderArrState[0] : loaderArrState : props.columns.slice(both ? firstState.cols : firstState, both ? lastState.cols : lastState);
      }
      return props.columns;
    };
    var getRenderedRange = function getRenderedRange() {
      var calculateFirstInViewport = function calculateFirstInViewport(_pos, _size) {
        return Math.floor(_pos / (_size || _pos));
      };
      var firstInViewport = firstState;
      var lastInViewport = 0;
      if (elementRef.current) {
        var _elementRef$current = elementRef.current,
          scrollTop = _elementRef$current.scrollTop,
          scrollLeft = _elementRef$current.scrollLeft;
        if (both) {
          firstInViewport = {
            rows: calculateFirstInViewport(scrollTop, props.itemSize[0]),
            cols: calculateFirstInViewport(scrollLeft, props.itemSize[1])
          };
          lastInViewport = {
            rows: firstInViewport.rows + numItemsInViewportState.rows,
            cols: firstInViewport.cols + numItemsInViewportState.cols
          };
        } else {
          var scrollPos = horizontal ? scrollLeft : scrollTop;
          firstInViewport = calculateFirstInViewport(scrollPos, props.itemSize);
          lastInViewport = firstInViewport + numItemsInViewportState;
        }
      }
      return {
        first: firstState,
        last: lastState,
        viewport: {
          first: firstInViewport,
          last: lastInViewport
        }
      };
    };
    var calculateNumItems = function calculateNumItems() {
      var contentPos = getContentPosition();
      var contentWidth = elementRef.current ? elementRef.current.offsetWidth - contentPos.left : 0;
      var contentHeight = elementRef.current ? elementRef.current.offsetHeight - contentPos.top : 0;
      var calculateNumItemsInViewport = function calculateNumItemsInViewport(_contentSize, _itemSize) {
        return Math.ceil(_contentSize / (_itemSize || _contentSize));
      };
      var calculateNumToleratedItems = function calculateNumToleratedItems(_numItems) {
        return Math.ceil(_numItems / 2);
      };
      var numItemsInViewport = both ? {
        rows: calculateNumItemsInViewport(contentHeight, props.itemSize[0]),
        cols: calculateNumItemsInViewport(contentWidth, props.itemSize[1])
      } : calculateNumItemsInViewport(horizontal ? contentWidth : contentHeight, props.itemSize);
      var numToleratedItems = numToleratedItemsState || (both ? [calculateNumToleratedItems(numItemsInViewport.rows), calculateNumToleratedItems(numItemsInViewport.cols)] : calculateNumToleratedItems(numItemsInViewport));
      return {
        numItemsInViewport: numItemsInViewport,
        numToleratedItems: numToleratedItems
      };
    };
    var calculateOptions = function calculateOptions() {
      var _calculateNumItems2 = calculateNumItems(),
        numItemsInViewport = _calculateNumItems2.numItemsInViewport,
        numToleratedItems = _calculateNumItems2.numToleratedItems;
      var calculateLast = function calculateLast(_first, _num, _numT, _isCols) {
        return getLast(_first + _num + (_first < _numT ? 2 : 3) * _numT, _isCols);
      };
      var last = both ? {
        rows: calculateLast(firstState.rows, numItemsInViewport.rows, numToleratedItems[0]),
        cols: calculateLast(firstState.cols, numItemsInViewport.cols, numToleratedItems[1], true)
      } : calculateLast(firstState, numItemsInViewport, numToleratedItems);
      setNumItemsInViewportState(numItemsInViewport);
      setNumToleratedItemsState(numToleratedItems);
      setLastState(last);
      if (props.showLoader) {
        setLoaderArrState(both ? Array.from({
          length: numItemsInViewport.rows
        }).map(function () {
          return Array.from({
            length: numItemsInViewport.cols
          });
        }) : Array.from({
          length: numItemsInViewport
        }));
      }
      if (props.lazy) {
        props.onLazyLoad && props.onLazyLoad({
          first: firstState,
          last: last
        });
      }
    };
    var calculateAutoSize = function calculateAutoSize(loading) {
      if (props.autoSize && !loading) {
        Promise.resolve().then(function () {
          if (_contentRef.current) {
            _contentRef.current.style.minHeight = _contentRef.current.style.minWidth = 'auto';
            var _contentRef$current = _contentRef.current,
              offsetWidth = _contentRef$current.offsetWidth,
              offsetHeight = _contentRef$current.offsetHeight;
            (both || horizontal) && (elementRef.current.style.width = (offsetWidth < defaultWidth.current ? offsetWidth : defaultWidth.current) + 'px');
            (both || vertical) && (elementRef.current.style.height = (offsetHeight < defaultHeight.current ? offsetHeight : defaultHeight.current) + 'px');
            _contentRef.current.style.minHeight = _contentRef.current.style.minWidth = '';
          }
        });
      }
    };
    var getLast = function getLast() {
      var last = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var isCols = arguments.length > 1 ? arguments[1] : undefined;
      return props.items ? Math.min(isCols ? (props.columns || props.items[0]).length : props.items.length, last) : 0;
    };
    var getContentPosition = function getContentPosition() {
      if (_contentRef.current) {
        var style = getComputedStyle(_contentRef.current);
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
    };
    var setSize = function setSize() {
      if (elementRef.current) {
        var parentElement = elementRef.current.parentElement;
        var width = props.scrollWidth || "".concat(elementRef.current.offsetWidth || parentElement.offsetWidth, "px");
        var height = props.scrollHeight || "".concat(elementRef.current.offsetHeight || parentElement.offsetHeight, "px");
        var setProp = function setProp(_name, _value) {
          return elementRef.current.style[_name] = _value;
        };
        if (both || horizontal) {
          setProp('height', height);
          setProp('width', width);
        } else {
          setProp('height', height);
        }
      }
    };
    var setSpacerSize = function setSpacerSize() {
      var items = props.items;
      if (_spacerRef.current && items) {
        var contentPos = getContentPosition();
        var setProp = function setProp(_name, _value, _size) {
          var _cpos = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
          return _spacerRef.current.style[_name] = (_value || []).length * _size + _cpos + 'px';
        };
        if (both) {
          setProp('height', items, props.itemSize[0], contentPos.y);
          setProp('width', props.columns || items[1], props.itemSize[1], contentPos.x);
        } else {
          horizontal ? setProp('width', props.columns || items, props.itemSize, contentPos.x) : setProp('height', items, props.itemSize, contentPos.y);
        }
      }
    };
    var setContentPosition = function setContentPosition(pos) {
      if (_contentRef.current) {
        var first = pos ? pos.first : firstState;
        var calculateTranslateVal = function calculateTranslateVal(_first, _size) {
          return _first * _size;
        };
        var setTransform = function setTransform() {
          var _x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var _y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          _stickyRef.current && (_stickyRef.current.style.top = "-".concat(_y, "px"));
          _contentRef.current.style.transform = "translate3d(".concat(_x, "px, ").concat(_y, "px, 0)");
        };
        if (both) {
          setTransform(calculateTranslateVal(first.cols, props.itemSize[1]), calculateTranslateVal(first.rows, props.itemSize[0]));
        } else {
          var translateVal = calculateTranslateVal(first, props.itemSize);
          horizontal ? setTransform(translateVal, 0) : setTransform(0, translateVal);
        }
      }
    };
    var onScrollPositionChange = function onScrollPositionChange(event) {
      var target = event.target;
      var contentPos = getContentPosition();
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
        if (_currentIndex <= _numT) return 0;else return Math.max(0, _isScrollDownOrRight ? _currentIndex < _triggerIndex ? _first : _currentIndex - _numT : _currentIndex > _triggerIndex ? _first : _currentIndex - 2 * _numT);
      };
      var calculateLast = function calculateLast(_currentIndex, _first, _last, _num, _numT, _isCols) {
        var lastValue = _first + _num + 2 * _numT;
        if (_currentIndex >= _numT) {
          lastValue += _numT + 1;
        }
        return getLast(lastValue, _isCols);
      };
      var scrollTop = calculateScrollPos(target.scrollTop, contentPos.top);
      var scrollLeft = calculateScrollPos(target.scrollLeft, contentPos.left);
      var newFirst = both ? {
        rows: 0,
        cols: 0
      } : 0;
      var newLast = lastState;
      var isRangeChanged = false;
      var newScrollPos = lastScrollPos.current;
      if (both) {
        var isScrollDown = lastScrollPos.current.top <= scrollTop;
        var isScrollRight = lastScrollPos.current.left <= scrollLeft;
        var currentIndex = {
          rows: calculateCurrentIndex(scrollTop, props.itemSize[0]),
          cols: calculateCurrentIndex(scrollLeft, props.itemSize[1])
        };
        var triggerIndex = {
          rows: calculateTriggerIndex(currentIndex.rows, firstState.rows, lastState.rows, numItemsInViewportState.rows, numToleratedItemsState[0], isScrollDown),
          cols: calculateTriggerIndex(currentIndex.cols, firstState.cols, lastState.cols, numItemsInViewportState.cols, numToleratedItemsState[1], isScrollRight)
        };
        newFirst = {
          rows: calculateFirst(currentIndex.rows, triggerIndex.rows, firstState.rows, lastState.rows, numItemsInViewportState.rows, numToleratedItemsState[0], isScrollDown),
          cols: calculateFirst(currentIndex.cols, triggerIndex.cols, firstState.cols, lastState.cols, numItemsInViewportState.cols, numToleratedItemsState[1], isScrollRight)
        };
        newLast = {
          rows: calculateLast(currentIndex.rows, newFirst.rows, lastState.rows, numItemsInViewportState.rows, numToleratedItemsState[0]),
          cols: calculateLast(currentIndex.cols, newFirst.cols, lastState.cols, numItemsInViewportState.cols, numToleratedItemsState[1], true)
        };
        isRangeChanged = newFirst.rows !== firstState.rows || newLast.rows !== lastState.rows || newFirst.cols !== firstState.cols || newLast.cols !== lastState.cols;
        newScrollPos = {
          top: scrollTop,
          left: scrollLeft
        };
      } else {
        var scrollPos = horizontal ? scrollLeft : scrollTop;
        var isScrollDownOrRight = lastScrollPos.current <= scrollPos;
        var _currentIndex2 = calculateCurrentIndex(scrollPos, props.itemSize);
        var _triggerIndex2 = calculateTriggerIndex(_currentIndex2, firstState, lastState, numItemsInViewportState, numToleratedItemsState, isScrollDownOrRight);
        newFirst = calculateFirst(_currentIndex2, _triggerIndex2, firstState, lastState, numItemsInViewportState, numToleratedItemsState, isScrollDownOrRight);
        newLast = calculateLast(_currentIndex2, newFirst, lastState, numItemsInViewportState, numToleratedItemsState);
        isRangeChanged = newFirst !== firstState || newLast !== lastState;
        newScrollPos = scrollPos;
      }
      return {
        first: newFirst,
        last: newLast,
        isRangeChanged: isRangeChanged,
        scrollPos: newScrollPos
      };
    };
    var onScrollChange = function onScrollChange(event) {
      var _onScrollPositionChan = onScrollPositionChange(event),
        first = _onScrollPositionChan.first,
        last = _onScrollPositionChan.last,
        isRangeChanged = _onScrollPositionChan.isRangeChanged,
        scrollPos = _onScrollPositionChan.scrollPos;
      if (isRangeChanged) {
        var newState = {
          first: first,
          last: last
        };
        setContentPosition(newState);
        setFirstState(first);
        setLastState(last);
        lastScrollPos.current = scrollPos;
        props.onScrollIndexChange && props.onScrollIndexChange(newState);
        if (props.lazy) {
          props.onLazyLoad && props.onLazyLoad(newState);
        }
      }
    };
    var onScroll = function onScroll(event) {
      props.onScroll && props.onScroll(event);
      if (props.delay) {
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
        if (!loadingState && props.showLoader) {
          var _onScrollPositionChan2 = onScrollPositionChange(event),
            changed = _onScrollPositionChan2.isRangeChanged;
          changed && setLoadingState(true);
        }
        scrollTimeout.current = setTimeout(function () {
          onScrollChange(event);
          if (loadingState && props.showLoader && (!props.lazy || props.loading === undefined)) {
            setLoadingState(false);
          }
        }, props.delay);
      } else {
        onScrollChange(event);
      }
    };
    var onResize = function onResize() {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      resizeTimeout.current = setTimeout(function () {
        if (elementRef.current) {
          var _ref = [utils.DomHandler.getWidth(elementRef.current), utils.DomHandler.getHeight(elementRef.current)],
            width = _ref[0],
            height = _ref[1];
          var isDiffWidth = width !== defaultWidth.current,
            isDiffHeight = height !== defaultHeight.current;
          var reinit = both ? isDiffWidth || isDiffHeight : horizontal ? isDiffWidth : vertical ? isDiffHeight : false;
          if (reinit) {
            setNumToleratedItemsState(props.numToleratedItems);
            defaultWidth.current = width;
            defaultHeight.current = height;
          }
        }
      }, props.resizeDelay);
    };
    var getOptions = function getOptions(renderedIndex) {
      var count = (props.items || []).length;
      var index = both ? firstState.rows + renderedIndex : firstState + renderedIndex;
      return {
        index: index,
        count: count,
        first: index === 0,
        last: index === count - 1,
        even: index % 2 === 0,
        odd: index % 2 !== 0,
        props: props
      };
    };
    var loaderOptions = function loaderOptions(index, extOptions) {
      var count = loaderArrState.length;
      return _objectSpread({
        index: index,
        count: count,
        first: index === 0,
        last: index === count - 1,
        even: index % 2 === 0,
        odd: index % 2 !== 0,
        props: props
      }, extOptions);
    };
    var loadedItems = function loadedItems() {
      var items = props.items;
      if (items && !loadingState) {
        if (both) return items.slice(firstState.rows, lastState.rows).map(function (item) {
          return props.columns ? item : item.slice(firstState.cols, lastState.cols);
        });else if (horizontal && props.columns) return items;else return items.slice(firstState, lastState);
      }
      return [];
    };
    var init = function init() {
      if (!props.disabled) {
        setSize();
        calculateOptions();
        setSpacerSize();
      }
    };
    hooks.useMountEffect(function () {
      if (!props.disabled) {
        init();
        bindWindowResizeListener();
        bindOrientationChangeListener();
        defaultWidth.current = utils.DomHandler.getWidth(elementRef.current);
        defaultHeight.current = utils.DomHandler.getHeight(elementRef.current);
      }
    });
    hooks.useUpdateEffect(function () {
      init();
    }, [props.itemSize, props.scrollHeight]);
    hooks.useUpdateEffect(function () {
      if (props.numToleratedItems !== numToleratedItemsState) {
        setNumToleratedItemsState(props.numToleratedItems);
      }
    }, [props.numToleratedItems]);
    hooks.useUpdateEffect(function () {
      if (props.numToleratedItems === numToleratedItemsState) {
        init(); // reinit after resizing
      }
    }, [numToleratedItemsState]);
    hooks.useUpdateEffect(function () {
      if (!prevItems || prevItems.length !== (props.items || []).length) {
        init();
      }
      var loading = loadingState;
      if (props.lazy && prevLoading !== props.loading && props.loading !== loadingState) {
        setLoadingState(props.loading);
        loading = props.loading;
      }
      calculateAutoSize(loading);
    });
    hooks.useUpdateEffect(function () {
      lastScrollPos.current = both ? {
        top: 0,
        left: 0
      } : 0;
    }, [props.orientation]);
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElementRef: getElementRef,
        scrollTo: scrollTo,
        scrollToIndex: scrollToIndex,
        scrollInView: scrollInView,
        getRenderedRange: getRenderedRange
      };
    });
    var createLoaderItem = function createLoaderItem(index) {
      var extOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = loaderOptions(index, extOptions);
      var content = utils.ObjectUtils.getJSXElement(props.loadingTemplate, options);
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, {
        key: index
      }, content);
    };
    var createLoader = function createLoader() {
      if (!props.loaderDisabled && props.showLoader && loadingState) {
        var className = utils.classNames('p-virtualscroller-loader', {
          'p-component-overlay': !props.loadingTemplate
        });
        var content = /*#__PURE__*/React__namespace.createElement("i", {
          className: "p-virtualscroller-loading-icon pi pi-spinner pi-spin"
        });
        if (props.loadingTemplate) {
          content = loaderArrState.map(function (_, index) {
            return createLoaderItem(index, both && {
              numCols: numItemsInViewportState.cols
            });
          });
        } else if (props.loaderIconTemplate) {
          var defaultContentOptions = {
            className: 'p-virtualscroller-loading-icon',
            element: content,
            props: props
          };
          content = utils.ObjectUtils.getJSXElement(props.loaderIconTemplate, defaultContentOptions);
        }
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: className
        }, content);
      }
      return null;
    };
    var createSpacer = function createSpacer() {
      if (props.showSpacer) {
        return /*#__PURE__*/React__namespace.createElement("div", {
          ref: _spacerRef,
          className: "p-virtualscroller-spacer"
        });
      }
      return null;
    };
    var createItem = function createItem(item, index) {
      var options = getOptions(index);
      var content = utils.ObjectUtils.getJSXElement(props.itemTemplate, item, options);
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, {
        key: options.index
      }, content);
    };
    var createItems = function createItems() {
      var items = loadedItems();
      return items.map(createItem);
    };
    var createContent = function createContent() {
      var items = createItems();
      var className = utils.classNames('p-virtualscroller-content', {
        'p-virtualscroller-loading': loadingState
      });
      var content = /*#__PURE__*/React__namespace.createElement("div", {
        ref: _contentRef,
        className: className
      }, items);
      if (props.contentTemplate) {
        var defaultOptions = {
          className: className,
          contentRef: function contentRef(el) {
            return _contentRef.current = utils.ObjectUtils.getRefElement(el);
          },
          spacerRef: function spacerRef(el) {
            return _spacerRef.current = utils.ObjectUtils.getRefElement(el);
          },
          stickyRef: function stickyRef(el) {
            return _stickyRef.current = utils.ObjectUtils.getRefElement(el);
          },
          items: loadedItems(),
          getItemOptions: function getItemOptions(index) {
            return getOptions(index);
          },
          children: items,
          element: content,
          props: props,
          loading: loadingState,
          getLoaderOptions: function getLoaderOptions(index, ext) {
            return loaderOptions(index, ext);
          },
          loadingTemplate: props.loadingTemplate,
          itemSize: props.itemSize,
          rows: getRows(),
          columns: getColumns(),
          vertical: vertical,
          horizontal: horizontal,
          both: both
        };
        return utils.ObjectUtils.getJSXElement(props.contentTemplate, defaultOptions);
      }
      return content;
    };
    if (props.disabled) {
      var content = utils.ObjectUtils.getJSXElement(props.contentTemplate, {
        items: props.items,
        rows: props.items,
        columns: props.columns
      });
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, props.children, content);
    } else {
      var otherProps = VirtualScrollerBase.getOtherProps(props);
      var className = utils.classNames('p-virtualscroller', {
        'p-both-scroll': both,
        'p-virtualscroller-both': both,
        'p-virtualscroller-horizontal': horizontal,
        'p-horizontal-scroll': horizontal
      }, props.className);
      var loader = createLoader();
      var _content = createContent();
      var spacer = createSpacer();
      return /*#__PURE__*/React__namespace.createElement("div", _extends({
        ref: elementRef,
        className: className,
        tabIndex: 0,
        style: props.style
      }, otherProps, {
        onScroll: onScroll
      }), _content, spacer, loader);
    }
  }));
  VirtualScroller.displayName = 'VirtualScroller';

  exports.VirtualScroller = VirtualScroller;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.hooks, primereact.utils);

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
this.primereact.checkbox = (function (exports, React, hooks, tooltip, utils) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
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

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
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

  var CheckboxBase = {
    defaultProps: {
      __TYPE: 'Checkbox',
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
      onChange: null,
      onMouseDown: null,
      onContextMenu: null,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, CheckboxBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, CheckboxBase.defaultProps);
    }
  };

  var Checkbox = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var props = CheckboxBase.getProps(inProps);
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focusedState = _React$useState2[0],
      setFocusedState = _React$useState2[1];
    var elementRef = React__namespace.useRef(null);
    var inputRef = React__namespace.useRef(props.inputRef);
    var onClick = function onClick(event) {
      if (!props.disabled && !props.readOnly && props.onChange) {
        var _checked = isChecked();
        var checkboxClicked = event.target instanceof HTMLDivElement || event.target instanceof HTMLSpanElement;
        var isInputToggled = event.target === inputRef.current;
        var isCheckboxToggled = checkboxClicked && event.target.checked !== _checked;
        if (isInputToggled || isCheckboxToggled) {
          var value = _checked ? props.falseValue : props.trueValue;
          props.onChange({
            originalEvent: event,
            value: props.value,
            checked: value,
            stopPropagation: function stopPropagation() {},
            preventDefault: function preventDefault() {},
            target: {
              type: 'checkbox',
              name: props.name,
              id: props.id,
              value: props.value,
              checked: value
            }
          });
        }
        utils.DomHandler.focus(inputRef.current);
        event.preventDefault();
      }
    };
    var onFocus = function onFocus() {
      setFocusedState(true);
    };
    var onBlur = function onBlur() {
      setFocusedState(false);
    };
    var onKeyDown = function onKeyDown(event) {
      if (event.code === 'Space' || event.key === ' ') {
        // event.key is for Android support
        onClick(event);
      }
    };
    var isChecked = function isChecked() {
      return props.checked === props.trueValue;
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        focus: function focus() {
          return utils.DomHandler.focus(inputRef.current);
        },
        getElement: function getElement() {
          return elementRef.current;
        },
        getInput: function getInput() {
          return inputRef.current;
        }
      };
    });
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(inputRef, props.inputRef);
    }, [inputRef, props.inputRef]);
    hooks.useUpdateEffect(function () {
      inputRef.current.checked = isChecked();
    }, [props.checked, props.trueValue]);
    var checked = isChecked();
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var otherProps = CheckboxBase.getOtherProps(props);
    var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
    var className = utils.classNames('p-checkbox p-component', {
      'p-checkbox-checked': checked,
      'p-checkbox-disabled': props.disabled,
      'p-checkbox-focused': focusedState
    }, props.className);
    var boxClass = utils.classNames('p-checkbox-box', {
      'p-highlight': checked,
      'p-disabled': props.disabled,
      'p-focus': focusedState
    });
    var icon = utils.IconUtils.getJSXIcon(checked ? props.icon : '', {
      className: 'p-checkbox-icon p-c'
    }, {
      props: props,
      checked: checked
    });
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: elementRef,
      id: props.id,
      className: className,
      style: props.style
    }, otherProps, {
      onClick: onClick,
      onContextMenu: props.onContextMenu,
      onMouseDown: props.onMouseDown
    }), /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-hidden-accessible"
    }, /*#__PURE__*/React__namespace.createElement("input", _extends({
      ref: inputRef,
      type: "checkbox",
      id: props.inputId,
      name: props.name,
      tabIndex: props.tabIndex,
      defaultChecked: checked,
      onFocus: onFocus,
      onBlur: onBlur,
      onKeyDown: onKeyDown,
      disabled: props.disabled,
      readOnly: props.readOnly,
      required: props.required
    }, ariaProps))), /*#__PURE__*/React__namespace.createElement("div", {
      className: boxClass
    }, icon)), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip
    }, props.tooltipOptions)));
  }));
  Checkbox.displayName = 'Checkbox';

  exports.Checkbox = Checkbox;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.hooks, primereact.tooltip, primereact.utils);

this.primereact = this.primereact || {};
this.primereact.button = (function (exports, React, ripple, tooltip, utils) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
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

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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

  var ButtonBase = {
    defaultProps: {
      __TYPE: 'Button',
      label: null,
      icon: null,
      iconPos: 'left',
      badge: null,
      severity: null,
      rounded: false,
      raised: false,
      outlined: false,
      text: false,
      link: false,
      badgeClassName: null,
      tooltip: null,
      size: null,
      tooltipOptions: null,
      disabled: false,
      loading: false,
      loadingIcon: 'pi pi-spinner pi-spin',
      visible: true,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, ButtonBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, ButtonBase.defaultProps);
    }
  };

  var Button = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var _classNames2;
    var props = ButtonBase.getProps(inProps);
    var elementRef = React__namespace.useRef(ref);
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(elementRef, ref);
    }, [elementRef, ref]);
    if (props.visible === false) {
      return null;
    }
    var createIcon = function createIcon() {
      var icon = props.loading ? props.loadingIcon : props.icon;
      var className = utils.classNames('p-button-icon p-c', _defineProperty({
        'p-button-loading-icon': props.loading
      }, "p-button-icon-".concat(props.iconPos), props.label));
      return utils.IconUtils.getJSXIcon(icon, {
        className: className
      }, {
        props: props
      });
    };
    var createLabel = function createLabel() {
      if (props.label) {
        return /*#__PURE__*/React__namespace.createElement("span", {
          className: "p-button-label p-c"
        }, props.label);
      }
      return !props.children && !props.label && /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-button-label p-c",
        dangerouslySetInnerHTML: {
          __html: '&nbsp;'
        }
      });
    };
    var createBadge = function createBadge() {
      if (props.badge) {
        var badgeClassName = utils.classNames('p-badge', props.badgeClassName);
        return /*#__PURE__*/React__namespace.createElement("span", {
          className: badgeClassName
        }, props.badge);
      }
      return null;
    };
    var disabled = props.disabled || props.loading;
    var showTooltip = !disabled || props.tooltipOptions && props.tooltipOptions.showOnDisabled;
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip) && showTooltip;
    var otherProps = ButtonBase.getOtherProps(props);
    var className = utils.classNames('p-button p-component', props.className, (_classNames2 = {
      'p-button-icon-only': (props.icon || props.loading && props.loadingIcon) && !props.label && !props.children,
      'p-button-vertical': (props.iconPos === 'top' || props.iconPos === 'bottom') && props.label,
      'p-disabled': disabled,
      'p-button-loading': props.loading,
      'p-button-outlined': props.outlined,
      'p-button-raised': props.raised,
      'p-button-link': props.link,
      'p-button-text': props.text,
      'p-button-rounded': props.rounded,
      'p-button-loading-label-only': props.loading && !props.icon && props.label
    }, _defineProperty(_classNames2, "p-button-loading-".concat(props.iconPos), props.loading && props.loadingIcon && props.label), _defineProperty(_classNames2, "p-button-".concat(props.size), props.size), _defineProperty(_classNames2, "p-button-".concat(props.severity), props.severity), _classNames2));
    var icon = createIcon();
    var label = createLabel();
    var badge = createBadge();
    var defaultAriaLabel = props.label ? props.label + (props.badge ? ' ' + props.badge : '') : props['aria-label'];
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("button", _extends({
      ref: elementRef,
      "aria-label": defaultAriaLabel
    }, otherProps, {
      className: className,
      disabled: disabled
    }), icon, label, props.children, badge, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null)), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip
    }, props.tooltipOptions)));
  }));
  Button.displayName = 'Button';

  exports.Button = Button;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.ripple, primereact.tooltip, primereact.utils);

this.primereact = this.primereact || {};
this.primereact.inputtext = (function (exports, React, keyfilter, tooltip, utils) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
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

  var InputTextBase = {
    defaultProps: {
      __TYPE: 'InputText',
      keyfilter: null,
      validateOnly: false,
      tooltip: null,
      tooltipOptions: null,
      onInput: null,
      onKeyDown: null,
      onPaste: null,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, InputTextBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, InputTextBase.defaultProps);
    }
  };

  var InputText = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var props = InputTextBase.getProps(inProps);
    var elementRef = React__namespace.useRef(ref);
    var onKeyDown = function onKeyDown(event) {
      props.onKeyDown && props.onKeyDown(event);
      if (props.keyfilter) {
        keyfilter.KeyFilter.onKeyPress(event, props.keyfilter, props.validateOnly);
      }
    };
    var onInput = function onInput(event) {
      var validatePattern = true;
      if (props.keyfilter && props.validateOnly) {
        validatePattern = keyfilter.KeyFilter.validate(event, props.keyfilter);
      }
      props.onInput && props.onInput(event, validatePattern);
      if (!props.onChange) {
        var target = event.target;
        utils.ObjectUtils.isNotEmpty(target.value) ? utils.DomHandler.addClass(target, 'p-filled') : utils.DomHandler.removeClass(target, 'p-filled');
      }
    };
    var onPaste = function onPaste(event) {
      props.onPaste && props.onPaste(event);
      if (props.keyfilter) {
        keyfilter.KeyFilter.onPaste(event, props.keyfilter, props.validateOnly);
      }
    };
    var currentValue = elementRef.current && elementRef.current.value;
    var isFilled = React__namespace.useMemo(function () {
      return utils.ObjectUtils.isNotEmpty(props.value) || utils.ObjectUtils.isNotEmpty(props.defaultValue) || utils.ObjectUtils.isNotEmpty(currentValue);
    }, [props.value, props.defaultValue, currentValue]);
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(elementRef, ref);
    }, [elementRef, ref]);
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var otherProps = InputTextBase.getOtherProps(props);
    var className = utils.classNames('p-inputtext p-component', {
      'p-disabled': props.disabled,
      'p-filled': isFilled
    }, props.className);
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("input", _extends({
      ref: elementRef
    }, otherProps, {
      className: className,
      onInput: onInput,
      onKeyDown: onKeyDown,
      onPaste: onPaste
    })), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip
    }, props.tooltipOptions)));
  }));
  InputText.displayName = 'InputText';

  exports.InputText = InputText;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.keyfilter, primereact.tooltip, primereact.utils);

this.primereact = this.primereact || {};
this.primereact.inputnumber = (function (exports, React, hooks, inputtext, ripple, tooltip, utils) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
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

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
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

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  var InputNumberBase = {
    defaultProps: {
      __TYPE: 'InputNumber',
      allowEmpty: true,
      ariaLabelledBy: null,
      autoFocus: false,
      buttonLayout: 'stacked',
      className: null,
      currency: undefined,
      currencyDisplay: undefined,
      decrementButtonClassName: null,
      decrementButtonIcon: 'pi pi-angle-down',
      disabled: false,
      format: true,
      id: null,
      incrementButtonClassName: null,
      incrementButtonIcon: 'pi pi-angle-up',
      inputClassName: null,
      inputId: null,
      inputMode: null,
      inputRef: null,
      inputStyle: null,
      locale: undefined,
      localeMatcher: undefined,
      max: null,
      maxFractionDigits: undefined,
      maxLength: null,
      min: null,
      minFractionDigits: undefined,
      mode: 'decimal',
      name: null,
      onBlur: null,
      onChange: null,
      onFocus: null,
      onKeyDown: null,
      onValueChange: null,
      pattern: null,
      placeholder: null,
      prefix: null,
      readOnly: false,
      required: false,
      showButtons: false,
      size: null,
      step: 1,
      style: null,
      suffix: null,
      tabIndex: null,
      tooltip: null,
      tooltipOptions: null,
      type: 'text',
      useGrouping: true,
      value: null,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, InputNumberBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, InputNumberBase.defaultProps);
    }
  };

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var InputNumber = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var props = InputNumberBase.getProps(inProps);
    var _React$useState = React__namespace.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focusedState = _React$useState2[0],
      setFocusedState = _React$useState2[1];
    var elementRef = React__namespace.useRef(null);
    var inputRef = React__namespace.useRef(null);
    var timer = React__namespace.useRef(null);
    var lastValue = React__namespace.useRef(null);
    var numberFormat = React__namespace.useRef(null);
    var groupChar = React__namespace.useRef(null);
    var prefixChar = React__namespace.useRef(null);
    var suffixChar = React__namespace.useRef(null);
    var isSpecialChar = React__namespace.useRef(null);
    var _numeral = React__namespace.useRef(null);
    var _group = React__namespace.useRef(null);
    var _minusSign = React__namespace.useRef(null);
    var _currency = React__namespace.useRef(null);
    var _decimal = React__namespace.useRef(null);
    var _suffix = React__namespace.useRef(null);
    var _prefix = React__namespace.useRef(null);
    var _index = React__namespace.useRef(null);
    var stacked = props.showButtons && props.buttonLayout === 'stacked';
    var horizontal = props.showButtons && props.buttonLayout === 'horizontal';
    var vertical = props.showButtons && props.buttonLayout === 'vertical';
    var inputMode = props.inputMode || (props.mode === 'decimal' && !props.minFractionDigits ? 'numeric' : 'decimal');
    var getOptions = function getOptions() {
      return {
        localeMatcher: props.localeMatcher,
        style: props.mode,
        currency: props.currency,
        currencyDisplay: props.currencyDisplay,
        useGrouping: props.useGrouping,
        minimumFractionDigits: props.minFractionDigits,
        maximumFractionDigits: props.maxFractionDigits
      };
    };
    var constructParser = function constructParser() {
      numberFormat.current = new Intl.NumberFormat(props.locale, getOptions());
      var numerals = _toConsumableArray(new Intl.NumberFormat(props.locale, {
        useGrouping: false
      }).format(9876543210)).reverse();
      var index = new Map(numerals.map(function (d, i) {
        return [d, i];
      }));
      _numeral.current = new RegExp("[".concat(numerals.join(''), "]"), 'g');
      _group.current = getGroupingExpression();
      _minusSign.current = getMinusSignExpression();
      _currency.current = getCurrencyExpression();
      _decimal.current = getDecimalExpression();
      _suffix.current = getSuffixExpression();
      _prefix.current = getPrefixExpression();
      _index.current = function (d) {
        return index.get(d);
      };
    };
    var escapeRegExp = function escapeRegExp(text) {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    };
    var getDecimalExpression = function getDecimalExpression() {
      var formatter = new Intl.NumberFormat(props.locale, _objectSpread(_objectSpread({}, getOptions()), {}, {
        useGrouping: false
      }));
      return new RegExp("[".concat(formatter.format(1.1).replace(_currency.current, '').trim().replace(_numeral.current, ''), "]"), 'g');
    };
    var getGroupingExpression = function getGroupingExpression() {
      var formatter = new Intl.NumberFormat(props.locale, {
        useGrouping: true
      });
      groupChar.current = formatter.format(1000000).trim().replace(_numeral.current, '').charAt(0);
      return new RegExp("[".concat(groupChar.current, "]"), 'g');
    };
    var getMinusSignExpression = function getMinusSignExpression() {
      var formatter = new Intl.NumberFormat(props.locale, {
        useGrouping: false
      });
      return new RegExp("[".concat(formatter.format(-1).trim().replace(_numeral.current, ''), "]"), 'g');
    };
    var getCurrencyExpression = function getCurrencyExpression() {
      if (props.currency) {
        var formatter = new Intl.NumberFormat(props.locale, {
          style: 'currency',
          currency: props.currency,
          currencyDisplay: props.currencyDisplay,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });
        return new RegExp("[".concat(formatter.format(1).replace(/\s/g, '').replace(_numeral.current, '').replace(_group.current, ''), "]"), 'g');
      }
      return new RegExp("[]", 'g');
    };
    var getPrefixExpression = function getPrefixExpression() {
      if (props.prefix) {
        prefixChar.current = props.prefix;
      } else {
        var formatter = new Intl.NumberFormat(props.locale, {
          style: props.mode,
          currency: props.currency,
          currencyDisplay: props.currencyDisplay
        });
        prefixChar.current = formatter.format(1).split('1')[0];
      }
      return new RegExp("".concat(escapeRegExp(prefixChar.current || '')), 'g');
    };
    var getSuffixExpression = function getSuffixExpression() {
      if (props.suffix) {
        suffixChar.current = props.suffix;
      } else {
        var formatter = new Intl.NumberFormat(props.locale, {
          style: props.mode,
          currency: props.currency,
          currencyDisplay: props.currencyDisplay,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });
        suffixChar.current = formatter.format(1).split('1')[1];
      }
      return new RegExp("".concat(escapeRegExp(suffixChar.current || '')), 'g');
    };
    var formatValue = function formatValue(value) {
      if (value != null) {
        if (value === '-') {
          // Minus sign
          return value;
        }
        if (props.format) {
          var formatter = new Intl.NumberFormat(props.locale, getOptions());
          var _formattedValue = formatter.format(value);
          if (props.prefix) {
            _formattedValue = props.prefix + _formattedValue;
          }
          if (props.suffix) {
            _formattedValue = _formattedValue + props.suffix;
          }
          return _formattedValue;
        }
        return value.toString();
      }
      return '';
    };
    var parseValue = function parseValue(text) {
      var filteredText = text.replace(_suffix.current, '').replace(_prefix.current, '').trim().replace(/\s/g, '').replace(_currency.current, '').replace(_group.current, '').replace(_minusSign.current, '-').replace(_decimal.current, '.').replace(_numeral.current, _index.current);
      if (filteredText) {
        if (filteredText === '-')
          // Minus sign
          return filteredText;
        var parsedValue = +filteredText;
        return isNaN(parsedValue) ? null : parsedValue;
      }
      return null;
    };
    var repeat = function repeat(event, interval, dir) {
      var i = interval || 500;
      clearTimer();
      timer.current = setTimeout(function () {
        repeat(event, 40, dir);
      }, i);
      spin(event, dir);
    };
    var spin = function spin(event, dir) {
      if (inputRef.current) {
        var step = props.step * dir;
        var currentValue = parseValue(inputRef.current.value) || 0;
        var newValue = validateValue(currentValue + step);
        if (props.maxLength && props.maxLength < formatValue(newValue).length) {
          return;
        }

        // #3913 onChange should be called before onValueChange
        handleOnChange(event, currentValue, newValue);
        // touch devices trigger the keyboard to display because of setSelectionRange
        !utils.DomHandler.isTouchDevice() && updateInput(newValue, null, 'spin');
        updateModel(event, newValue);
      }
    };
    var onUpButtonMouseDown = function onUpButtonMouseDown(event) {
      if (!props.disabled && !props.readOnly) {
        props.autoFocus && utils.DomHandler.focus(inputRef.current, props.autoFocus);
        repeat(event, null, 1);
        event.preventDefault();
      }
    };
    var onUpButtonMouseUp = function onUpButtonMouseUp() {
      if (!props.disabled && !props.readOnly) {
        clearTimer();
      }
    };
    var onUpButtonMouseLeave = function onUpButtonMouseLeave() {
      if (!props.disabled && !props.readOnly) {
        clearTimer();
      }
    };
    var onUpButtonKeyUp = function onUpButtonKeyUp() {
      if (!props.disabled && !props.readOnly) {
        clearTimer();
      }
    };
    var onUpButtonKeyDown = function onUpButtonKeyDown(event) {
      if (!props.disabled && !props.readOnly && (event.keyCode === 32 || event.keyCode === 13)) {
        repeat(event, null, 1);
      }
    };
    var onDownButtonMouseDown = function onDownButtonMouseDown(event) {
      if (!props.disabled && !props.readOnly) {
        props.autoFocus && utils.DomHandler.focus(inputRef.current, props.autoFocus);
        repeat(event, null, -1);
        event.preventDefault();
      }
    };
    var onDownButtonMouseUp = function onDownButtonMouseUp() {
      if (!props.disabled && !props.readOnly) {
        clearTimer();
      }
    };
    var onDownButtonMouseLeave = function onDownButtonMouseLeave() {
      if (!props.disabled && !props.readOnly) {
        clearTimer();
      }
    };
    var onDownButtonKeyUp = function onDownButtonKeyUp() {
      if (!props.disabled && !props.readOnly) {
        clearTimer();
      }
    };
    var onDownButtonKeyDown = function onDownButtonKeyDown(event) {
      if (!props.disabled && !props.readOnly && (event.keyCode === 32 || event.keyCode === 13)) {
        repeat(event, null, -1);
      }
    };
    var onInput = function onInput(event) {
      if (props.disabled || props.readOnly) {
        return;
      }
      if (isSpecialChar.current) {
        event.target.value = lastValue.current;
      }
      isSpecialChar.current = false;
    };
    var onInputKeyDown = function onInputKeyDown(event) {
      if (props.disabled || props.readOnly) {
        return;
      }
      lastValue.current = event.target.value;
      if (event.shiftKey || event.altKey) {
        isSpecialChar.current = true;
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
          spin(event, 1);
          event.preventDefault();
          break;

        //down
        case 40:
          spin(event, -1);
          event.preventDefault();
          break;

        //left
        case 37:
          if (!isNumeralChar(inputValue.charAt(selectionStart - 1))) {
            event.preventDefault();
          }
          break;

        //right
        case 39:
          if (!isNumeralChar(inputValue.charAt(selectionStart))) {
            event.preventDefault();
          }
          break;

        //enter and tab
        case 13:
        case 9:
          newValueStr = validateValue(parseValue(inputValue));
          inputRef.current.value = formatValue(newValueStr);
          inputRef.current.setAttribute('aria-valuenow', newValueStr);
          updateModel(event, newValueStr);
          break;

        //backspace
        case 8:
          event.preventDefault();
          if (selectionStart === selectionEnd) {
            var deleteChar = inputValue.charAt(selectionStart - 1);
            var _getDecimalCharIndexe = getDecimalCharIndexes(inputValue),
              decimalCharIndex = _getDecimalCharIndexe.decimalCharIndex,
              decimalCharIndexWithoutPrefix = _getDecimalCharIndexe.decimalCharIndexWithoutPrefix;
            if (isNumeralChar(deleteChar)) {
              var decimalLength = getDecimalLength(inputValue);
              if (_group.current.test(deleteChar)) {
                _group.current.lastIndex = 0;
                newValueStr = inputValue.slice(0, selectionStart - 2) + inputValue.slice(selectionStart - 1);
              } else if (_decimal.current.test(deleteChar)) {
                _decimal.current.lastIndex = 0;
                if (decimalLength) {
                  inputRef.current.setSelectionRange(selectionStart - 1, selectionStart - 1);
                } else {
                  newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                }
              } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                var insertedText = isDecimalMode() && (props.minFractionDigits || 0) < decimalLength ? '' : '0';
                newValueStr = inputValue.slice(0, selectionStart - 1) + insertedText + inputValue.slice(selectionStart);
              } else if (decimalCharIndexWithoutPrefix === 1) {
                newValueStr = inputValue.slice(0, selectionStart - 1) + '0' + inputValue.slice(selectionStart);
                newValueStr = parseValue(newValueStr) > 0 ? newValueStr : '';
              } else {
                newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
              }
            }
            updateValue(event, newValueStr, null, 'delete-single');
          } else {
            newValueStr = deleteRange(inputValue, selectionStart, selectionEnd);
            updateValue(event, newValueStr, null, 'delete-range');
          }
          break;

        // del
        case 46:
          event.preventDefault();
          if (selectionStart === selectionEnd) {
            var _deleteChar = inputValue.charAt(selectionStart);
            var _getDecimalCharIndexe2 = getDecimalCharIndexes(inputValue),
              _decimalCharIndex = _getDecimalCharIndexe2.decimalCharIndex,
              _decimalCharIndexWithoutPrefix = _getDecimalCharIndexe2.decimalCharIndexWithoutPrefix;
            if (isNumeralChar(_deleteChar)) {
              var _decimalLength = getDecimalLength(inputValue);
              if (_group.current.test(_deleteChar)) {
                _group.current.lastIndex = 0;
                newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 2);
              } else if (_decimal.current.test(_deleteChar)) {
                _decimal.current.lastIndex = 0;
                if (_decimalLength) {
                  inputRef.current.setSelectionRange(selectionStart + 1, selectionStart + 1);
                } else {
                  newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                }
              } else if (_decimalCharIndex > 0 && selectionStart > _decimalCharIndex) {
                var _insertedText = isDecimalMode() && (props.minFractionDigits || 0) < _decimalLength ? '' : '0';
                newValueStr = inputValue.slice(0, selectionStart) + _insertedText + inputValue.slice(selectionStart + 1);
              } else if (_decimalCharIndexWithoutPrefix === 1) {
                newValueStr = inputValue.slice(0, selectionStart) + '0' + inputValue.slice(selectionStart + 1);
                newValueStr = parseValue(newValueStr) > 0 ? newValueStr : '';
              } else {
                newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
              }
            }
            updateValue(event, newValueStr, null, 'delete-back-single');
          } else {
            newValueStr = deleteRange(inputValue, selectionStart, selectionEnd);
            updateValue(event, newValueStr, null, 'delete-range');
          }
          break;
      }
      if (props.onKeyDown) {
        props.onKeyDown(event);
      }
    };
    var onInputKeyPress = function onInputKeyPress(event) {
      if (props.disabled || props.readOnly) {
        return;
      }
      var code = event.which || event.keyCode;
      if (code !== 13) {
        // to submit a form
        event.preventDefault();
      }
      var _char = String.fromCharCode(code);
      var _isDecimalSign = isDecimalSign(_char);
      var _isMinusSign = isMinusSign(_char);
      if (48 <= code && code <= 57 || _isMinusSign || _isDecimalSign) {
        insert(event, _char, {
          isDecimalSign: _isDecimalSign,
          isMinusSign: _isMinusSign
        });
      }
    };
    var onPaste = function onPaste(event) {
      event.preventDefault();
      if (props.disabled || props.readOnly) {
        return;
      }
      var data = (event.clipboardData || window['clipboardData']).getData('Text');
      if (data) {
        var filteredData = parseValue(data);
        if (filteredData != null) {
          insert(event, filteredData.toString());
        }
      }
    };
    var allowMinusSign = function allowMinusSign() {
      return props.min === null || props.min < 0;
    };
    var isMinusSign = function isMinusSign(_char2) {
      if (_minusSign.current.test(_char2) || _char2 === '-') {
        _minusSign.current.lastIndex = 0;
        return true;
      }
      return false;
    };
    var isDecimalSign = function isDecimalSign(_char3) {
      if (_decimal.current.test(_char3)) {
        _decimal.current.lastIndex = 0;
        return true;
      }
      return false;
    };
    var isDecimalMode = function isDecimalMode() {
      return props.mode === 'decimal';
    };
    var getDecimalCharIndexes = function getDecimalCharIndexes(val) {
      var decimalCharIndex = val.search(_decimal.current);
      _decimal.current.lastIndex = 0;
      var filteredVal = val.replace(_prefix.current, '').trim().replace(/\s/g, '').replace(_currency.current, '');
      var decimalCharIndexWithoutPrefix = filteredVal.search(_decimal.current);
      _decimal.current.lastIndex = 0;
      return {
        decimalCharIndex: decimalCharIndex,
        decimalCharIndexWithoutPrefix: decimalCharIndexWithoutPrefix
      };
    };
    var getCharIndexes = function getCharIndexes(val) {
      var decimalCharIndex = val.search(_decimal.current);
      _decimal.current.lastIndex = 0;
      var minusCharIndex = val.search(_minusSign.current);
      _minusSign.current.lastIndex = 0;
      var suffixCharIndex = val.search(_suffix.current);
      _suffix.current.lastIndex = 0;
      var currencyCharIndex = val.search(_currency.current);
      _currency.current.lastIndex = 0;
      return {
        decimalCharIndex: decimalCharIndex,
        minusCharIndex: minusCharIndex,
        suffixCharIndex: suffixCharIndex,
        currencyCharIndex: currencyCharIndex
      };
    };
    var insert = function insert(event, text) {
      var sign = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        isDecimalSign: false,
        isMinusSign: false
      };
      var minusCharIndexOnText = text.search(_minusSign.current);
      _minusSign.current.lastIndex = 0;
      if (!allowMinusSign() && minusCharIndexOnText !== -1) {
        return;
      }
      var selectionStart = inputRef.current.selectionStart;
      var selectionEnd = inputRef.current.selectionEnd;
      var inputValue = inputRef.current.value.trim();
      var _getCharIndexes = getCharIndexes(inputValue),
        decimalCharIndex = _getCharIndexes.decimalCharIndex,
        minusCharIndex = _getCharIndexes.minusCharIndex,
        suffixCharIndex = _getCharIndexes.suffixCharIndex,
        currencyCharIndex = _getCharIndexes.currencyCharIndex;
      var newValueStr;
      if (sign.isMinusSign) {
        if (selectionStart === 0) {
          newValueStr = inputValue;
          if (minusCharIndex === -1 || selectionEnd !== 0) {
            newValueStr = insertText(inputValue, text, 0, selectionEnd);
          }
          updateValue(event, newValueStr, text, 'insert');
        }
      } else if (sign.isDecimalSign) {
        if (decimalCharIndex > 0 && selectionStart === decimalCharIndex) {
          updateValue(event, inputValue, text, 'insert');
        } else if (decimalCharIndex > selectionStart && decimalCharIndex < selectionEnd) {
          newValueStr = insertText(inputValue, text, selectionStart, selectionEnd);
          updateValue(event, newValueStr, text, 'insert');
        } else if (decimalCharIndex === -1 && props.maxFractionDigits) {
          newValueStr = insertText(inputValue, text, selectionStart, selectionEnd);
          updateValue(event, newValueStr, text, 'insert');
        }
      } else {
        var maxFractionDigits = numberFormat.current.resolvedOptions().maximumFractionDigits;
        var operation = selectionStart !== selectionEnd ? 'range-insert' : 'insert';
        if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
          if (selectionStart + text.length - (decimalCharIndex + 1) <= maxFractionDigits) {
            var charIndex = currencyCharIndex >= selectionStart ? currencyCharIndex - 1 : suffixCharIndex >= selectionStart ? suffixCharIndex : inputValue.length;
            newValueStr = inputValue.slice(0, selectionStart) + text + inputValue.slice(selectionStart + text.length, charIndex) + inputValue.slice(charIndex);
            updateValue(event, newValueStr, text, operation);
          }
        } else {
          newValueStr = insertText(inputValue, text, selectionStart, selectionEnd);
          updateValue(event, newValueStr, text, operation);
        }
      }
    };
    var insertText = function insertText(value, text, start, end) {
      var textSplit = text === '.' ? text : text.split('.');
      if (textSplit.length === 2) {
        var decimalCharIndex = value.slice(start, end).search(_decimal.current);
        _decimal.current.lastIndex = 0;
        return decimalCharIndex > 0 ? value.slice(0, start) + formatValue(text) + value.slice(end) : value || formatValue(text);
      } else if (end - start === value.length) {
        return formatValue(text);
      } else if (start === 0) {
        var suffix = utils.ObjectUtils.isLetter(value[end]) ? end - 1 : end;
        return text + value.slice(suffix);
      } else if (end === value.length) {
        return value.slice(0, start) + text;
      } else {
        return value.slice(0, start) + text + value.slice(end);
      }
    };
    var deleteRange = function deleteRange(value, start, end) {
      var newValueStr;
      if (end - start === value.length) newValueStr = '';else if (start === 0) newValueStr = value.slice(end);else if (end === value.length) newValueStr = value.slice(0, start);else newValueStr = value.slice(0, start) + value.slice(end);
      return newValueStr;
    };
    var initCursor = function initCursor() {
      var selectionStart = inputRef.current.selectionStart;
      var inputValue = inputRef.current.value;
      var valueLength = inputValue.length;
      var index = null;

      // remove prefix
      var prefixLength = (prefixChar.current || '').length;
      inputValue = inputValue.replace(_prefix.current, '');
      selectionStart = selectionStart - prefixLength;
      var _char4 = inputValue.charAt(selectionStart);
      if (isNumeralChar(_char4)) {
        return selectionStart + prefixLength;
      }

      //left
      var i = selectionStart - 1;
      while (i >= 0) {
        _char4 = inputValue.charAt(i);
        if (isNumeralChar(_char4)) {
          index = i + prefixLength;
          break;
        } else {
          i--;
        }
      }
      if (index !== null) {
        inputRef.current.setSelectionRange(index + 1, index + 1);
      } else {
        i = selectionStart;
        while (i < valueLength) {
          _char4 = inputValue.charAt(i);
          if (isNumeralChar(_char4)) {
            index = i + prefixLength;
            break;
          } else {
            i++;
          }
        }
        if (index !== null) {
          inputRef.current.setSelectionRange(index, index);
        }
      }
      return index || 0;
    };
    var onInputClick = function onInputClick() {
      initCursor();
    };
    var isNumeralChar = function isNumeralChar(_char5) {
      if (_char5.length === 1 && (_numeral.current.test(_char5) || _decimal.current.test(_char5) || _group.current.test(_char5) || _minusSign.current.test(_char5))) {
        resetRegex();
        return true;
      } else {
        return false;
      }
    };
    var resetRegex = function resetRegex() {
      _numeral.current.lastIndex = 0;
      _decimal.current.lastIndex = 0;
      _group.current.lastIndex = 0;
      _minusSign.current.lastIndex = 0;
    };
    var updateValue = function updateValue(event, valueStr, insertedValueStr, operation) {
      var currentValue = inputRef.current.value;
      var newValue = null;
      if (valueStr != null) {
        newValue = evaluateEmpty(parseValue(valueStr));
        updateInput(newValue, insertedValueStr, operation, valueStr);
        handleOnChange(event, currentValue, newValue);
      }
    };
    var evaluateEmpty = function evaluateEmpty(newValue) {
      return !newValue && !props.allowEmpty ? props.min || 0 : newValue;
    };
    var handleOnChange = function handleOnChange(event, currentValue, newValue) {
      if (props.onChange && isValueChanged(currentValue, newValue)) {
        props.onChange({
          originalEvent: event,
          value: newValue
        });
      }
    };
    var isValueChanged = function isValueChanged(currentValue, newValue) {
      if (newValue === null && currentValue !== null) {
        return true;
      }
      if (newValue != null) {
        var parsedCurrentValue = typeof currentValue === 'string' ? parseValue(currentValue) : currentValue;
        return newValue !== parsedCurrentValue;
      }
      return false;
    };
    var validateValue = function validateValue(value) {
      if (value === '-') {
        return null;
      }
      return validateValueByLimit(value);
    };
    var validateValueByLimit = function validateValueByLimit(value) {
      if (utils.ObjectUtils.isEmpty(value)) {
        return null;
      }
      if (props.min !== null && value < props.min) {
        return props.min;
      }
      if (props.max !== null && value > props.max) {
        return props.max;
      }
      return value;
    };
    var updateInput = function updateInput(value, insertedValueStr, operation, valueStr) {
      insertedValueStr = insertedValueStr || '';
      var inputEl = inputRef.current;
      var inputValue = inputEl.value;
      var newValue = formatValue(value);
      var currentLength = inputValue.length;
      if (newValue !== valueStr) {
        newValue = concatValues(newValue, valueStr);
      }
      if (currentLength === 0) {
        inputEl.value = newValue;
        inputEl.setSelectionRange(0, 0);
        var index = initCursor();
        var selectionEnd = index + insertedValueStr.length;
        inputEl.setSelectionRange(selectionEnd, selectionEnd);
      } else {
        var selectionStart = inputEl.selectionStart;
        var _selectionEnd = inputEl.selectionEnd;
        if (props.maxLength && props.maxLength < newValue.length) {
          return;
        }
        inputEl.value = newValue;
        var newLength = newValue.length;
        if (operation === 'range-insert') {
          var startValue = parseValue((inputValue || '').slice(0, selectionStart));
          var startValueStr = startValue !== null ? startValue.toString() : '';
          var startExpr = startValueStr.split('').join("(".concat(groupChar.current, ")?"));
          var sRegex = new RegExp(startExpr, 'g');
          sRegex.test(newValue);
          var tExpr = insertedValueStr.split('').join("(".concat(groupChar.current, ")?"));
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
          var isGroupChar = _group.current.test(nextChar);
          if (isGroupChar && diff === 1) {
            _selectionEnd += 1;
          } else if (!isGroupChar && isNumeralChar(prevChar)) {
            _selectionEnd += -1 * diff + 1;
          }
          _group.current.lastIndex = 0;
          inputEl.setSelectionRange(_selectionEnd, _selectionEnd);
        } else if (inputValue === '-' && operation === 'insert') {
          inputEl.setSelectionRange(0, 0);
          var _index2 = initCursor();
          var _selectionEnd2 = _index2 + insertedValueStr.length + 1;
          inputEl.setSelectionRange(_selectionEnd2, _selectionEnd2);
        } else {
          _selectionEnd = _selectionEnd + (newLength - currentLength);
          inputEl.setSelectionRange(_selectionEnd, _selectionEnd);
        }
      }
      inputEl.setAttribute('aria-valuenow', value);
    };
    var updateInputValue = function updateInputValue(newValue) {
      newValue = evaluateEmpty(newValue);
      var inputEl = inputRef.current;
      var value = inputEl.value;
      var _formattedValue = formattedValue(newValue);
      if (value !== _formattedValue) {
        inputEl.value = _formattedValue;
        inputEl.setAttribute('aria-valuenow', newValue);
      }
    };
    var formattedValue = function formattedValue(val) {
      return formatValue(evaluateEmpty(val));
    };
    var concatValues = function concatValues(val1, val2) {
      if (val1 && val2) {
        var decimalCharIndex = val2.search(_decimal.current);
        _decimal.current.lastIndex = 0;
        return decimalCharIndex !== -1 ? val1.split(_decimal.current)[0] + val2.slice(decimalCharIndex) : val1;
      }
      return val1;
    };
    var getDecimalLength = function getDecimalLength(value) {
      if (value) {
        var valueSplit = value.split(_decimal.current);
        if (valueSplit.length === 2) {
          return valueSplit[1].replace(_suffix.current, '').trim().replace(/\s/g, '').replace(_currency.current, '').length;
        }
      }
      return 0;
    };
    var updateModel = function updateModel(event, value) {
      if (props.onValueChange) {
        props.onValueChange({
          originalEvent: event,
          value: value,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            name: props.name,
            id: props.id,
            value: value
          }
        });
      }
    };
    var onInputFocus = function onInputFocus(event) {
      setFocusedState(true);
      props.onFocus && props.onFocus(event);
      if ((props.suffix || props.currency || props.prefix) && inputRef.current) {
        // GitHub #1866 Cursor must be placed before/after symbol or arrow keys don't work
        var selectionEnd = initCursor();
        inputRef.current.setSelectionRange(selectionEnd, selectionEnd);
      }
    };
    var onInputBlur = function onInputBlur(event) {
      setFocusedState(false);
      if (inputRef.current) {
        var currentValue = inputRef.current.value;
        if (isValueChanged(currentValue, props.value)) {
          var newValue = validateValue(parseValue(currentValue));
          updateInputValue(newValue);
          updateModel(event, newValue);
        }
      }
      props.onBlur && props.onBlur(event);
    };
    var clearTimer = function clearTimer() {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
    var changeValue = function changeValue() {
      updateInputValue(validateValueByLimit(props.value));
      var newValue = validateValue(props.value);
      if (props.value !== null && props.value !== newValue) {
        updateModel(null, newValue);
      }
    };
    var getFormatter = function getFormatter() {
      return numberFormat.current;
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        focus: function focus() {
          return utils.DomHandler.focus(inputRef.current);
        },
        getFormatter: getFormatter,
        getElement: function getElement() {
          return elementRef.current;
        },
        getInput: function getInput() {
          return inputRef.current;
        }
      };
    });
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(inputRef, props.inputRef);
    }, [inputRef, props.inputRef]);
    hooks.useMountEffect(function () {
      constructParser();
      var newValue = validateValue(props.value);
      if (props.value !== null && props.value !== newValue) {
        updateModel(null, newValue);
      }
    });
    hooks.useUpdateEffect(function () {
      constructParser();
      changeValue();
    }, [props.locale, props.localeMatcher, props.mode, props.currency, props.currencyDisplay, props.useGrouping, props.minFractionDigits, props.maxFractionDigits, props.suffix, props.prefix]);
    hooks.useUpdateEffect(function () {
      changeValue();
    }, [props.value]);
    var createInputElement = function createInputElement() {
      var className = utils.classNames('p-inputnumber-input', props.inputClassName);
      var valueToRender = formattedValue(props.value);
      return /*#__PURE__*/React__namespace.createElement(inputtext.InputText, _extends({
        ref: inputRef,
        id: props.inputId,
        style: props.inputStyle,
        role: "spinbutton",
        className: className,
        defaultValue: valueToRender,
        type: props.type,
        size: props.size,
        tabIndex: props.tabIndex,
        inputMode: inputMode,
        maxLength: props.maxLength,
        disabled: props.disabled,
        required: props.required,
        pattern: props.pattern,
        placeholder: props.placeholder,
        readOnly: props.readOnly,
        name: props.name,
        autoFocus: props.autoFocus,
        onKeyDown: onInputKeyDown,
        onKeyPress: onInputKeyPress,
        onInput: onInput,
        onClick: onInputClick,
        onBlur: onInputBlur,
        onFocus: onInputFocus,
        onPaste: onPaste,
        min: props.min,
        max: props.max,
        "aria-valuemin": props.min,
        "aria-valuemax": props.max,
        "aria-valuenow": props.value
      }, ariaProps, dataProps));
    };
    var createUpButton = function createUpButton() {
      var className = utils.classNames('p-inputnumber-button p-inputnumber-button-up p-button p-button-icon-only p-component', {
        'p-disabled': props.disabled
      }, props.incrementButtonClassName);
      var icon = utils.classNames('p-button-icon', props.incrementButtonIcon);
      return /*#__PURE__*/React__namespace.createElement("button", {
        type: "button",
        className: className,
        onPointerLeave: onUpButtonMouseLeave,
        onPointerDown: onUpButtonMouseDown,
        onPointerUp: onUpButtonMouseUp,
        onKeyDown: onUpButtonKeyDown,
        onKeyUp: onUpButtonKeyUp,
        disabled: props.disabled,
        tabIndex: -1
      }, /*#__PURE__*/React__namespace.createElement("span", {
        className: icon
      }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    };
    var createDownButton = function createDownButton() {
      var className = utils.classNames('p-inputnumber-button p-inputnumber-button-down p-button p-button-icon-only p-component', {
        'p-disabled': props.disabled
      }, props.decrementButtonClassName);
      var icon = utils.classNames('p-button-icon', props.decrementButtonIcon);
      return /*#__PURE__*/React__namespace.createElement("button", {
        type: "button",
        className: className,
        onPointerLeave: onDownButtonMouseLeave,
        onPointerDown: onDownButtonMouseDown,
        onPointerUp: onDownButtonMouseUp,
        onKeyDown: onDownButtonKeyDown,
        onKeyUp: onDownButtonKeyUp,
        disabled: props.disabled,
        tabIndex: -1
      }, /*#__PURE__*/React__namespace.createElement("span", {
        className: icon
      }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    };
    var createButtonGroup = function createButtonGroup() {
      var upButton = props.showButtons && createUpButton();
      var downButton = props.showButtons && createDownButton();
      if (stacked) {
        return /*#__PURE__*/React__namespace.createElement("span", {
          className: "p-inputnumber-button-group"
        }, upButton, downButton);
      }
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, upButton, downButton);
    };
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var otherProps = InputNumberBase.getOtherProps(props);
    var dataProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.DATA_PROPS);
    var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
    var className = utils.classNames('p-inputnumber p-component p-inputwrapper', {
      'p-inputwrapper-filled': props.value != null && props.value.toString().length > 0,
      'p-inputwrapper-focus': focusedState,
      'p-inputnumber-buttons-stacked': stacked,
      'p-inputnumber-buttons-horizontal': horizontal,
      'p-inputnumber-buttons-vertical': vertical
    }, props.className);
    var inputElement = createInputElement();
    var buttonGroup = createButtonGroup();
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("span", _extends({
      ref: elementRef,
      id: props.id,
      className: className,
      style: props.style
    }, otherProps), inputElement, buttonGroup), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip
    }, props.tooltipOptions)));
  }));
  InputNumber.displayName = 'InputNumber';

  exports.InputNumber = InputNumber;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.hooks, primereact.inputtext, primereact.ripple, primereact.tooltip, primereact.utils);

this.primereact = this.primereact || {};
this.primereact.messages = (function (exports, React, reactTransitionGroup, csstransition, utils, api, hooks, ripple) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
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

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
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

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  var MessagesBase = {
    defaultProps: {
      __TYPE: 'Messages',
      id: null,
      className: null,
      style: null,
      transitionOptions: null,
      onRemove: null,
      onClick: null,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, MessagesBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, MessagesBase.defaultProps);
    }
  };

  var UIMessage = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var _props$message = props.message,
      severity = _props$message.severity,
      content = _props$message.content,
      summary = _props$message.summary,
      detail = _props$message.detail,
      closable = _props$message.closable,
      life = _props$message.life,
      sticky = _props$message.sticky,
      icon = _props$message.icon;
    var _useTimeout = hooks.useTimeout(function () {
        onClose(null);
      }, life || 3000, !sticky),
      _useTimeout2 = _slicedToArray(_useTimeout, 1),
      clearTimer = _useTimeout2[0];
    var onClose = function onClose(event) {
      clearTimer();
      props.onClose && props.onClose(props.message);
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    var onClick = function onClick() {
      props.onClick && props.onClick(props.message);
    };
    var createCloseIcon = function createCloseIcon() {
      if (closable !== false) {
        var ariaLabel = api.localeOption('close');
        return /*#__PURE__*/React__namespace.createElement("button", {
          type: "button",
          className: "p-message-close p-link",
          "aria-label": ariaLabel,
          onClick: onClose
        }, /*#__PURE__*/React__namespace.createElement("i", {
          className: "p-message-close-icon pi pi-times",
          "aria-hidden": "true"
        }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
      }
      return null;
    };
    var createMessage = function createMessage() {
      if (props.message) {
        var iconValue = icon;
        if (!iconValue) {
          iconValue = utils.classNames('pi', {
            'pi-info-circle': severity === 'info',
            'pi-exclamation-triangle': severity === 'warn',
            'pi-times-circle': severity === 'error',
            'pi-check': severity === 'success'
          });
        }
        var iconContent = utils.IconUtils.getJSXIcon(iconValue, {
          className: 'p-message-icon'
        }, {
          props: props
        });
        return content || /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, iconContent, /*#__PURE__*/React__namespace.createElement("span", {
          className: "p-message-summary"
        }, summary), /*#__PURE__*/React__namespace.createElement("span", {
          className: "p-message-detail"
        }, detail));
      }
      return null;
    };
    var className = utils.classNames('p-message p-component p-message-' + severity);
    var closeIcon = createCloseIcon();
    var message = createMessage();
    return /*#__PURE__*/React__namespace.createElement("div", {
      ref: ref,
      className: className,
      onClick: onClick
    }, /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-message-wrapper"
    }, message, closeIcon));
  }));
  UIMessage.displayName = 'UIMessage';

  var messageIdx = 0;
  var Messages = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var props = MessagesBase.getProps(inProps);
    var _React$useState = React__namespace.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      messagesState = _React$useState2[0],
      setMessagesState = _React$useState2[1];
    var elementRef = React__namespace.useRef(null);
    var show = function show(value) {
      if (value) {
        var messages = assignIdentifiers(value, true);
        if (Array.isArray(value)) {
          for (var i = 0; i < value.length; i++) {
            value[i].id = messageIdx++;
            messages = [].concat(_toConsumableArray(messagesState), _toConsumableArray(value));
          }
        } else {
          value.id = messageIdx++;
          messages = messagesState ? [].concat(_toConsumableArray(messagesState), [value]) : [value];
        }
        setMessagesState(messages);
      }
    };
    var assignIdentifiers = function assignIdentifiers(value, copy) {
      var messages;
      if (Array.isArray(value)) {
        for (var i = 0; i < value.length; i++) {
          value[i].id = messageIdx++;
          if (copy) {
            messages = [].concat(_toConsumableArray(messagesState), _toConsumableArray(value));
          } else {
            messages = value;
          }
        }
      } else {
        value.id = messageIdx++;
        if (copy) {
          messages = messagesState ? [].concat(_toConsumableArray(messagesState), [value]) : [value];
        } else {
          messages = [value];
        }
      }
      return messages;
    };
    var clear = function clear() {
      setMessagesState([]);
    };
    var replace = function replace(value) {
      var replaced = assignIdentifiers(value, false);
      setMessagesState(replaced);
    };
    var onClose = function onClose(message) {
      setMessagesState(messagesState.filter(function (msg) {
        return msg.id !== message.id;
      }));
      props.onRemove && props.onRemove(message);
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        show: show,
        replace: replace,
        clear: clear,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    var otherProps = MessagesBase.getOtherProps(props);
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      id: props.id,
      ref: elementRef,
      className: props.className,
      style: props.style
    }, otherProps), /*#__PURE__*/React__namespace.createElement(reactTransitionGroup.TransitionGroup, null, messagesState && messagesState.map(function (message) {
      var messageRef = /*#__PURE__*/React__namespace.createRef();
      return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
        nodeRef: messageRef,
        key: message.id,
        classNames: "p-message",
        unmountOnExit: true,
        timeout: {
          enter: 300,
          exit: 300
        },
        options: props.transitionOptions
      }, /*#__PURE__*/React__namespace.createElement(UIMessage, {
        ref: messageRef,
        message: message,
        onClick: props.onClick,
        onClose: onClose
      }));
    })));
  }));
  Messages.displayName = 'Messages';

  exports.Messages = Messages;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, ReactTransitionGroup, primereact.csstransition, primereact.utils, primereact.api, primereact.hooks, primereact.ripple);

this.primereact = this.primereact || {};
this.primereact.progressbar = (function (exports, React, utils) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
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

  var ProgressBarBase = {
    defaultProps: {
      __TYPE: 'ProgressBar',
      id: null,
      value: null,
      showValue: true,
      unit: '%',
      style: null,
      className: null,
      mode: 'determinate',
      displayValueTemplate: null,
      color: null,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, ProgressBarBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, ProgressBarBase.defaultProps);
    }
  };

  var ProgressBar = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var props = ProgressBarBase.getProps(inProps);
    var elementRef = React__namespace.useRef(null);
    var createLabel = function createLabel() {
      if (props.showValue && props.value != null) {
        var label = props.displayValueTemplate ? props.displayValueTemplate(props.value) : props.value + props.unit;
        return label;
      }
      return null;
    };
    var createDeterminate = function createDeterminate() {
      var otherProps = ProgressBarBase.getOtherProps(props);
      var className = utils.classNames('p-progressbar p-component p-progressbar-determinate', props.className);
      var label = createLabel();
      return /*#__PURE__*/React__namespace.createElement("div", _extends({
        role: "progressbar",
        id: props.id,
        ref: elementRef,
        className: className,
        style: props.style,
        "aria-valuemin": "0",
        "aria-valuenow": props.value,
        "aria-valuemax": "100"
      }, otherProps), /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-progressbar-value p-progressbar-value-animate",
        style: {
          width: props.value + '%',
          display: 'flex',
          backgroundColor: props.color
        }
      }, props.value != null && props.value !== 0 && props.showValue && /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-progressbar-label"
      }, label)));
    };
    var createIndeterminate = function createIndeterminate() {
      var otherProps = ProgressBarBase.getOtherProps(props);
      var className = utils.classNames('p-progressbar p-component p-progressbar-indeterminate', props.className);
      return /*#__PURE__*/React__namespace.createElement("div", _extends({
        role: "progressbar",
        id: props.id,
        ref: elementRef,
        className: className,
        style: props.style
      }, otherProps), /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-progressbar-indeterminate-container"
      }, /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-progressbar-value p-progressbar-value-animate",
        style: {
          backgroundColor: props.color
        }
      })));
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    if (props.mode === 'determinate') return createDeterminate();else if (props.mode === 'indeterminate') return createIndeterminate();else throw new Error(props.mode + " is not a valid mode for the ProgressBar. Valid values are 'determinate' and 'indeterminate'");
  }));
  ProgressBar.displayName = 'ProgressBar';

  exports.ProgressBar = ProgressBar;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils);

this.primereact = this.primereact || {};
this.primereact.dropdown = (function (exports, React, PrimeReact, hooks, overlayservice, tooltip, utils, csstransition, portal, virtualscroller, ripple) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);
  var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
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

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }

  function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
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

  var DropdownBase = {
    defaultProps: {
      __TYPE: 'Dropdown',
      appendTo: null,
      ariaLabel: null,
      ariaLabelledBy: null,
      autoFocus: false,
      className: null,
      clearIcon: 'pi pi-times',
      dataKey: null,
      disabled: false,
      dropdownIcon: 'pi pi-chevron-down',
      editable: false,
      emptyFilterMessage: null,
      emptyMessage: null,
      filter: false,
      filterBy: null,
      filterInputAutoFocus: true,
      filterLocale: undefined,
      filterMatchMode: 'contains',
      filterPlaceholder: null,
      filterTemplate: null,
      focusInputRef: null,
      id: null,
      inputId: null,
      inputRef: null,
      itemTemplate: null,
      maxLength: null,
      name: null,
      onBlur: null,
      onChange: null,
      onContextMenu: null,
      onFilter: null,
      onFocus: null,
      onHide: null,
      onMouseDown: null,
      onShow: null,
      optionDisabled: null,
      optionGroupChildren: null,
      optionGroupLabel: null,
      optionGroupTemplate: null,
      optionLabel: null,
      optionValue: null,
      options: null,
      panelClassName: null,
      panelStyle: null,
      placeholder: null,
      required: false,
      resetFilterOnHide: false,
      scrollHeight: '200px',
      showClear: false,
      showFilterClear: false,
      showOnFocus: false,
      style: null,
      tabIndex: null,
      tooltip: null,
      tooltipOptions: null,
      transitionOptions: null,
      value: null,
      valueTemplate: null,
      virtualScrollerOptions: null,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, DropdownBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, DropdownBase.defaultProps);
    }
  };

  var DropdownItem = /*#__PURE__*/React__namespace.memo(function (props) {
    var onClick = function onClick(event) {
      if (props.onClick) {
        props.onClick({
          originalEvent: event,
          option: props.option
        });
      }
    };
    var className = utils.classNames('p-dropdown-item', {
      'p-highlight': props.selected,
      'p-disabled': props.disabled,
      'p-dropdown-item-empty': !props.label || props.label.length === 0
    }, props.option && props.option.className);
    var content = props.template ? utils.ObjectUtils.getJSXElement(props.template, props.option) : props.label;
    return /*#__PURE__*/React__namespace.createElement("li", {
      className: className,
      style: props.style,
      onClick: onClick,
      "aria-label": props.label,
      key: props.label,
      role: "option",
      "aria-selected": props.selected
    }, content, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
  });
  DropdownItem.displayName = 'DropdownItem';

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var DropdownPanel = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var virtualScrollerRef = React__namespace.useRef(null);
    var filterInputRef = React__namespace.useRef(null);
    var isEmptyFilter = !(props.visibleOptions && props.visibleOptions.length) && props.hasFilter;
    var filterOptions = {
      filter: function filter(e) {
        return onFilterInputChange(e);
      },
      reset: function reset() {
        return props.resetFilter();
      }
    };
    var onEnter = function onEnter() {
      props.onEnter(function () {
        if (virtualScrollerRef.current) {
          var selectedIndex = props.getSelectedOptionIndex();
          if (selectedIndex !== -1) {
            setTimeout(function () {
              return virtualScrollerRef.current.scrollToIndex(selectedIndex);
            }, 0);
          }
        }
      });
    };
    var onEntered = function onEntered() {
      props.onEntered(function () {
        if (props.filter && props.filterInputAutoFocus) {
          utils.DomHandler.focus(filterInputRef.current, false);
        }
      });
    };
    var onFilterInputChange = function onFilterInputChange(event) {
      virtualScrollerRef.current && virtualScrollerRef.current.scrollToIndex(0);
      props.onFilterInputChange && props.onFilterInputChange(event);
    };
    var createGroupChildren = function createGroupChildren(optionGroup, style) {
      var groupChildren = props.getOptionGroupChildren(optionGroup);
      return groupChildren.map(function (option, j) {
        var optionLabel = props.getOptionLabel(option);
        var optionKey = j + '_' + props.getOptionRenderKey(option);
        var disabled = props.isOptionDisabled(option);
        return /*#__PURE__*/React__namespace.createElement(DropdownItem, {
          key: optionKey,
          label: optionLabel,
          option: option,
          style: style,
          template: props.itemTemplate,
          selected: props.isSelected(option),
          disabled: disabled,
          onClick: props.onOptionClick
        });
      });
    };
    var createEmptyMessage = function createEmptyMessage(emptyMessage, isFilter) {
      var message = utils.ObjectUtils.getJSXElement(emptyMessage, props) || PrimeReact.localeOption(isFilter ? 'emptyFilterMessage' : 'emptyMessage');
      return /*#__PURE__*/React__namespace.createElement("li", {
        className: "p-dropdown-empty-message"
      }, message);
    };
    var createItem = function createItem(option, index) {
      var scrollerOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var style = {
        height: scrollerOptions.props ? scrollerOptions.props.itemSize : undefined
      };
      if (props.optionGroupLabel) {
        var groupContent = props.optionGroupTemplate ? utils.ObjectUtils.getJSXElement(props.optionGroupTemplate, option, index) : props.getOptionGroupLabel(option);
        var groupChildrenContent = createGroupChildren(option, style);
        var key = index + '_' + props.getOptionGroupRenderKey(option);
        return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, {
          key: key
        }, /*#__PURE__*/React__namespace.createElement("li", {
          className: "p-dropdown-item-group",
          style: style
        }, groupContent), groupChildrenContent);
      } else {
        var optionLabel = props.getOptionLabel(option);
        var optionKey = index + '_' + props.getOptionRenderKey(option);
        var disabled = props.isOptionDisabled(option);
        return /*#__PURE__*/React__namespace.createElement(DropdownItem, {
          key: optionKey,
          label: optionLabel,
          option: option,
          style: style,
          template: props.itemTemplate,
          selected: props.isSelected(option),
          disabled: disabled,
          onClick: props.onOptionClick
        });
      }
    };
    var createItems = function createItems() {
      if (utils.ObjectUtils.isNotEmpty(props.visibleOptions)) {
        return props.visibleOptions.map(createItem);
      } else if (props.hasFilter) {
        return createEmptyMessage(props.emptyFilterMessage, true);
      }
      return createEmptyMessage(props.emptyMessage);
    };
    var createFilterClearIcon = function createFilterClearIcon() {
      if (props.showFilterClear && props.filterValue) {
        var ariaLabel = PrimeReact.localeOption('clear');
        return /*#__PURE__*/React__namespace.createElement("i", {
          className: "p-dropdown-filter-clear-icon pi pi-times",
          "aria-label": ariaLabel,
          onClick: function onClick() {
            return props.onFilterClearIconClick(function () {
              return utils.DomHandler.focus(filterInputRef.current);
            });
          }
        });
      }
      return null;
    };
    var createFilter = function createFilter() {
      if (props.filter) {
        var clearIcon = createFilterClearIcon();
        var containerClassName = utils.classNames('p-dropdown-filter-container', {
          'p-dropdown-clearable-filter': !!clearIcon
        });
        var content = /*#__PURE__*/React__namespace.createElement("div", {
          className: containerClassName
        }, /*#__PURE__*/React__namespace.createElement("input", {
          ref: filterInputRef,
          type: "text",
          autoComplete: "off",
          className: "p-dropdown-filter p-inputtext p-component",
          placeholder: props.filterPlaceholder,
          onKeyDown: props.onFilterInputKeyDown,
          onChange: onFilterInputChange,
          value: props.filterValue
        }), clearIcon, /*#__PURE__*/React__namespace.createElement("i", {
          className: "p-dropdown-filter-icon pi pi-search"
        }));
        if (props.filterTemplate) {
          var defaultContentOptions = {
            className: containerClassName,
            element: content,
            filterOptions: filterOptions,
            filterInputKeyDown: props.onFilterInputKeyDown,
            filterInputChange: onFilterInputChange,
            filterIconClassName: 'p-dropdown-filter-icon pi pi-search',
            clearIcon: clearIcon,
            props: props
          };
          content = utils.ObjectUtils.getJSXElement(props.filterTemplate, defaultContentOptions);
        }
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-dropdown-header"
        }, content);
      }
      return null;
    };
    var createContent = function createContent() {
      if (props.virtualScrollerOptions) {
        var virtualScrollerProps = _objectSpread$1(_objectSpread$1({}, props.virtualScrollerOptions), {
          style: _objectSpread$1(_objectSpread$1({}, props.virtualScrollerOptions.style), {
            height: props.scrollHeight
          }),
          className: utils.classNames('p-dropdown-items-wrapper', props.virtualScrollerOptions.className),
          items: props.visibleOptions,
          autoSize: true,
          onLazyLoad: function onLazyLoad(event) {
            return props.virtualScrollerOptions.onLazyLoad(_objectSpread$1(_objectSpread$1({}, event), {
              filter: props.filterValue
            }));
          },
          itemTemplate: function itemTemplate(item, options) {
            return item && createItem(item, options.index, options);
          },
          contentTemplate: function contentTemplate(options) {
            var className = utils.classNames('p-dropdown-items', options.className);
            var content = isEmptyFilter ? createEmptyMessage() : options.children;
            return /*#__PURE__*/React__namespace.createElement("ul", {
              ref: options.contentRef,
              className: className,
              role: "listbox"
            }, content);
          }
        });
        return /*#__PURE__*/React__namespace.createElement(virtualscroller.VirtualScroller, _extends({
          ref: virtualScrollerRef
        }, virtualScrollerProps));
      } else {
        var items = createItems();
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-dropdown-items-wrapper",
          style: {
            maxHeight: props.scrollHeight || 'auto'
          }
        }, /*#__PURE__*/React__namespace.createElement("ul", {
          className: "p-dropdown-items",
          role: "listbox"
        }, items));
      }
    };
    var createElement = function createElement() {
      var className = utils.classNames('p-dropdown-panel p-component', props.panelClassName, {
        'p-input-filled': PrimeReact__default["default"].inputStyle === 'filled',
        'p-ripple-disabled': PrimeReact__default["default"].ripple === false
      });
      var filter = createFilter();
      var content = createContent();
      return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
        nodeRef: ref,
        classNames: "p-connected-overlay",
        "in": props["in"],
        timeout: {
          enter: 120,
          exit: 100
        },
        options: props.transitionOptions,
        unmountOnExit: true,
        onEnter: onEnter,
        onEntering: props.onEntering,
        onEntered: onEntered,
        onExit: props.onExit,
        onExited: props.onExited
      }, /*#__PURE__*/React__namespace.createElement("div", {
        ref: ref,
        className: className,
        style: props.panelStyle,
        onClick: props.onClick
      }, filter, content));
    };
    var element = createElement();
    return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
      element: element,
      appendTo: props.appendTo
    });
  }));
  DropdownPanel.displayName = 'DropdownPanel';

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  var Dropdown = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var props = DropdownBase.getProps(inProps);
    var _React$useState = React__namespace.useState(''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      filterState = _React$useState2[0],
      setFilterState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      focusedState = _React$useState4[0],
      setFocusedState = _React$useState4[1];
    var _React$useState5 = React__namespace.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      overlayVisibleState = _React$useState6[0],
      setOverlayVisibleState = _React$useState6[1];
    var elementRef = React__namespace.useRef(null);
    var overlayRef = React__namespace.useRef(null);
    var inputRef = React__namespace.useRef(props.inputRef);
    var focusInputRef = React__namespace.useRef(props.focusInputRef);
    var searchTimeout = React__namespace.useRef(null);
    var searchValue = React__namespace.useRef(null);
    var currentSearchChar = React__namespace.useRef(null);
    var isLazy = props.virtualScrollerOptions && props.virtualScrollerOptions.lazy;
    var hasFilter = utils.ObjectUtils.isNotEmpty(filterState);
    var appendTo = props.appendTo || PrimeReact__default["default"].appendTo;
    var _useOverlayListener = hooks.useOverlayListener({
        target: elementRef,
        overlay: overlayRef,
        listener: function listener(event, _ref) {
          var type = _ref.type,
            valid = _ref.valid;
          if (valid) {
            type === 'outside' ? !isClearClicked(event) && hide() : hide();
          }
        },
        when: overlayVisibleState
      }),
      _useOverlayListener2 = _slicedToArray(_useOverlayListener, 2),
      bindOverlayListener = _useOverlayListener2[0],
      unbindOverlayListener = _useOverlayListener2[1];
    var getVisibleOptions = function getVisibleOptions() {
      if (hasFilter && !isLazy) {
        var filterValue = filterState.trim().toLocaleLowerCase(props.filterLocale);
        var searchFields = props.filterBy ? props.filterBy.split(',') : [props.optionLabel || 'label'];
        if (props.optionGroupLabel) {
          var filteredGroups = [];
          var _iterator = _createForOfIteratorHelper(props.options),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var optgroup = _step.value;
              var filteredSubOptions = PrimeReact.FilterService.filter(getOptionGroupChildren(optgroup), searchFields, filterValue, props.filterMatchMode, props.filterLocale);
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
          return PrimeReact.FilterService.filter(props.options, searchFields, filterValue, props.filterMatchMode, props.filterLocale);
        }
      } else {
        return props.options;
      }
    };
    var isClearClicked = function isClearClicked(event) {
      return utils.DomHandler.hasClass(event.target, 'p-dropdown-clear-icon') || utils.DomHandler.hasClass(event.target, 'p-dropdown-filter-clear-icon');
    };
    var onClick = function onClick(event) {
      if (props.disabled) {
        return;
      }
      props.onClick && props.onClick(event);

      // do not continue if the user defined click wants to prevent it
      if (event.defaultPrevented) {
        return;
      }
      if (utils.DomHandler.hasClass(event.target, 'p-dropdown-clear-icon') || event.target.tagName === 'INPUT') {
        return;
      } else if (!overlayRef.current || !(overlayRef.current && overlayRef.current.contains(event.target))) {
        utils.DomHandler.focus(focusInputRef.current);
        overlayVisibleState ? hide() : show();
      }
    };
    var onInputFocus = function onInputFocus(event) {
      if (props.showOnFocus && !overlayVisibleState) {
        show();
      }
      setFocusedState(true);
      props.onFocus && props.onFocus(event);
    };
    var onInputBlur = function onInputBlur(event) {
      setFocusedState(false);
      if (props.onBlur) {
        setTimeout(function () {
          var currentValue = inputRef.current ? inputRef.current.value : undefined;
          props.onBlur({
            originalEvent: event.originalEvent,
            value: currentValue,
            stopPropagation: function stopPropagation() {},
            preventDefault: function preventDefault() {},
            target: {
              name: props.name,
              id: props.id,
              value: currentValue
            }
          });
        }, 200);
      }
    };
    var onPanelClick = function onPanelClick(event) {
      overlayservice.OverlayService.emit('overlay-click', {
        originalEvent: event,
        target: elementRef.current
      });
    };
    var onInputKeyDown = function onInputKeyDown(event) {
      switch (event.which) {
        //down
        case 40:
          onDownKey(event);
          break;

        //up
        case 38:
          onUpKey(event);
          break;

        //space and enter
        case 32:
        case 13:
          overlayVisibleState ? hide() : show();
          event.preventDefault();
          break;

        //escape and tab
        case 27:
        case 9:
          hide();
          break;
        default:
          search(event);
          break;
      }
    };
    var onFilterInputKeyDown = function onFilterInputKeyDown(event) {
      switch (event.which) {
        //down
        case 40:
          onDownKey(event);
          break;

        //up
        case 38:
          onUpKey(event);
          break;

        //enter and escape
        case 13:
        case 27:
          hide();
          event.preventDefault();
          break;
      }
    };
    var onUpKey = function onUpKey(event) {
      if (visibleOptions) {
        var prevOption = findPrevOption(getSelectedOptionIndex());
        if (prevOption) {
          selectItem({
            originalEvent: event,
            option: prevOption
          });
        }
      }
      event.preventDefault();
    };
    var onDownKey = function onDownKey(event) {
      if (visibleOptions) {
        if (!overlayVisibleState && event.altKey) {
          show();
        } else {
          var nextOption = findNextOption(getSelectedOptionIndex());
          if (nextOption) {
            selectItem({
              originalEvent: event,
              option: nextOption
            });
          }
        }
      }
      event.preventDefault();
    };
    var findNextOption = function findNextOption(index) {
      if (props.optionGroupLabel) {
        var groupIndex = index === -1 ? 0 : index.group;
        var optionIndex = index === -1 ? -1 : index.option;
        var option = findNextOptionInList(getOptionGroupChildren(visibleOptions[groupIndex]), optionIndex);
        if (option) return option;else if (groupIndex + 1 !== visibleOptions.length) return findNextOption({
          group: groupIndex + 1,
          option: -1
        });else return null;
      }
      return findNextOptionInList(visibleOptions, index);
    };
    var findNextOptionInList = function findNextOptionInList(list, index) {
      var i = index + 1;
      if (i === list.length) {
        return null;
      }
      var option = list[i];
      return isOptionDisabled(option) ? findNextOptionInList(i) : option;
    };
    var findPrevOption = function findPrevOption(index) {
      if (index === -1) {
        return null;
      }
      if (props.optionGroupLabel) {
        var groupIndex = index.group;
        var optionIndex = index.option;
        var option = findPrevOptionInList(getOptionGroupChildren(visibleOptions[groupIndex]), optionIndex);
        if (option) return option;else if (groupIndex > 0) return findPrevOption({
          group: groupIndex - 1,
          option: getOptionGroupChildren(visibleOptions[groupIndex - 1]).length
        });else return null;
      }
      return findPrevOptionInList(visibleOptions, index);
    };
    var findPrevOptionInList = function findPrevOptionInList(list, index) {
      var i = index - 1;
      if (i < 0) {
        return null;
      }
      var option = list[i];
      return isOptionDisabled(option) ? findPrevOption(i) : option;
    };
    var search = function search(event) {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      var _char = event.key;
      if (_char === 'Shift' || _char === 'Control' || _char === 'Alt') {
        return;
      }
      if (currentSearchChar.current === _char) searchValue.current = _char;else searchValue.current = searchValue.current ? searchValue.current + _char : _char;
      currentSearchChar.current = _char;
      if (searchValue.current) {
        var searchIndex = getSelectedOptionIndex();
        var newOption = props.optionGroupLabel ? searchOptionInGroup(searchIndex) : searchOption(searchIndex + 1);
        if (newOption) {
          selectItem({
            originalEvent: event,
            option: newOption
          });
        }
      }
      searchTimeout.current = setTimeout(function () {
        searchValue.current = null;
      }, 250);
    };
    var searchOption = function searchOption(index) {
      if (searchValue.current) {
        return searchOptionInRange(index, visibleOptions.length) || searchOptionInRange(0, index);
      }
      return null;
    };
    var searchOptionInRange = function searchOptionInRange(start, end) {
      for (var i = start; i < end; i++) {
        var opt = visibleOptions[i];
        if (matchesSearchValue(opt)) {
          return opt;
        }
      }
      return null;
    };
    var searchOptionInGroup = function searchOptionInGroup(index) {
      var searchIndex = index === -1 ? {
        group: 0,
        option: -1
      } : index;
      for (var i = searchIndex.group; i < visibleOptions.length; i++) {
        var groupOptions = getOptionGroupChildren(visibleOptions[i]);
        for (var j = searchIndex.group === i ? searchIndex.option + 1 : 0; j < groupOptions.length; j++) {
          if (matchesSearchValue(groupOptions[j])) {
            return groupOptions[j];
          }
        }
      }
      for (var _i = 0; _i <= searchIndex.group; _i++) {
        var _groupOptions = getOptionGroupChildren(visibleOptions[_i]);
        for (var _j = 0; _j < (searchIndex.group === _i ? searchIndex.option : _groupOptions.length); _j++) {
          if (matchesSearchValue(_groupOptions[_j])) {
            return _groupOptions[_j];
          }
        }
      }
      return null;
    };
    var matchesSearchValue = function matchesSearchValue(option) {
      var label = getOptionLabel(option);
      if (!label) {
        return false;
      }
      label = label.toLocaleLowerCase(props.filterLocale);
      return label.startsWith(searchValue.current.toLocaleLowerCase(props.filterLocale));
    };
    var onEditableInputChange = function onEditableInputChange(event) {
      if (props.onChange) {
        props.onChange({
          originalEvent: event.originalEvent,
          value: event.target.value,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            name: props.name,
            id: props.id,
            value: event.target.value
          }
        });
      }
    };
    var onEditableInputFocus = function onEditableInputFocus(event) {
      setFocusedState(true);
      hide();
      props.onFocus && props.onFocus(event);
    };
    var onOptionClick = function onOptionClick(event) {
      var option = event.option;
      if (!option.disabled) {
        selectItem(event);
        utils.DomHandler.focus(focusInputRef.current);
      }
      hide();
    };
    var onFilterInputChange = function onFilterInputChange(event) {
      var filter = event.target.value;
      setFilterState(filter);
      if (props.onFilter) {
        props.onFilter({
          originalEvent: event,
          filter: filter
        });
      }
    };
    var onFilterClearIconClick = function onFilterClearIconClick(callback) {
      resetFilter(callback);
    };
    var resetFilter = function resetFilter(callback) {
      setFilterState('');
      props.onFilter && props.onFilter({
        filter: ''
      });
      callback && callback();
    };
    var clear = function clear(event) {
      if (props.onChange) {
        props.onChange({
          originalEvent: event,
          value: undefined,
          stopPropagation: function stopPropagation() {},
          preventDefault: function preventDefault() {},
          target: {
            name: props.name,
            id: props.id,
            value: undefined
          }
        });
      }
      updateEditableLabel();
    };
    var selectItem = function selectItem(event) {
      if (selectedOption !== event.option) {
        updateEditableLabel(event.option);
        var optionValue = getOptionValue(event.option);
        if (props.onChange) {
          props.onChange({
            originalEvent: event.originalEvent,
            value: optionValue,
            stopPropagation: function stopPropagation() {},
            preventDefault: function preventDefault() {},
            target: {
              name: props.name,
              id: props.id,
              value: optionValue
            }
          });
        }
      }
    };
    var getSelectedOptionIndex = function getSelectedOptionIndex(options) {
      options = options || visibleOptions;
      if (props.value != null && options) {
        if (props.optionGroupLabel) {
          for (var i = 0; i < options.length; i++) {
            var selectedOptionIndex = findOptionIndexInList(props.value, getOptionGroupChildren(options[i]));
            if (selectedOptionIndex !== -1) {
              return {
                group: i,
                option: selectedOptionIndex
              };
            }
          }
        } else {
          return findOptionIndexInList(props.value, options);
        }
      }
      return -1;
    };
    var equalityKey = function equalityKey() {
      return props.optionValue ? null : props.dataKey;
    };
    var findOptionIndexInList = function findOptionIndexInList(value, list) {
      var key = equalityKey();
      return list.findIndex(function (item) {
        return utils.ObjectUtils.equals(value, getOptionValue(item), key);
      });
    };
    var isSelected = function isSelected(option) {
      return utils.ObjectUtils.equals(props.value, getOptionValue(option), equalityKey());
    };
    var show = function show() {
      setOverlayVisibleState(true);
    };
    var hide = function hide() {
      setOverlayVisibleState(false);
    };
    var onOverlayEnter = function onOverlayEnter(callback) {
      utils.ZIndexUtils.set('overlay', overlayRef.current, PrimeReact__default["default"].autoZIndex, PrimeReact__default["default"].zIndex['overlay']);
      alignOverlay();
      callback && callback();
    };
    var onOverlayEntered = function onOverlayEntered(callback) {
      callback && callback();
      bindOverlayListener();
      props.onShow && props.onShow();
    };
    var onOverlayExit = function onOverlayExit() {
      unbindOverlayListener();
    };
    var onOverlayExited = function onOverlayExited() {
      if (props.filter && props.resetFilterOnHide) {
        resetFilter();
      }
      utils.ZIndexUtils.clear(overlayRef.current);
      props.onHide && props.onHide();
    };
    var alignOverlay = function alignOverlay() {
      utils.DomHandler.alignOverlay(overlayRef.current, inputRef.current.parentElement, props.appendTo || PrimeReact__default["default"].appendTo);
    };
    var scrollInView = function scrollInView() {
      var highlightItem = utils.DomHandler.findSingle(overlayRef.current, 'li.p-highlight');
      if (highlightItem && highlightItem.scrollIntoView) {
        highlightItem.scrollIntoView({
          block: 'nearest',
          inline: 'nearest'
        });
      }
    };
    var updateEditableLabel = function updateEditableLabel(option) {
      if (inputRef.current) {
        inputRef.current.value = option ? getOptionLabel(option) : props.value || '';
      }
    };
    var getOptionLabel = function getOptionLabel(option) {
      return props.optionLabel ? utils.ObjectUtils.resolveFieldData(option, props.optionLabel) : option && option['label'] !== undefined ? option['label'] : option;
    };
    var getOptionValue = function getOptionValue(option) {
      return props.optionValue ? utils.ObjectUtils.resolveFieldData(option, props.optionValue) : option && option['value'] !== undefined ? option['value'] : option;
    };
    var getOptionRenderKey = function getOptionRenderKey(option) {
      return props.dataKey ? utils.ObjectUtils.resolveFieldData(option, props.dataKey) : getOptionLabel(option);
    };
    var isOptionDisabled = function isOptionDisabled(option) {
      if (props.optionDisabled) {
        return utils.ObjectUtils.isFunction(props.optionDisabled) ? props.optionDisabled(option) : utils.ObjectUtils.resolveFieldData(option, props.optionDisabled);
      }
      return option && option['disabled'] !== undefined ? option['disabled'] : false;
    };
    var getOptionGroupRenderKey = function getOptionGroupRenderKey(optionGroup) {
      return utils.ObjectUtils.resolveFieldData(optionGroup, props.optionGroupLabel);
    };
    var getOptionGroupLabel = function getOptionGroupLabel(optionGroup) {
      return utils.ObjectUtils.resolveFieldData(optionGroup, props.optionGroupLabel);
    };
    var getOptionGroupChildren = function getOptionGroupChildren(optionGroup) {
      return utils.ObjectUtils.resolveFieldData(optionGroup, props.optionGroupChildren);
    };
    var updateInputField = function updateInputField() {
      if (props.editable && inputRef.current) {
        var label = selectedOption ? getOptionLabel(selectedOption) : null;
        var value = label || props.value || '';
        inputRef.current.value = value;
      }
    };
    var getSelectedOption = function getSelectedOption() {
      var index = getSelectedOptionIndex(props.options);
      return index !== -1 ? props.optionGroupLabel ? getOptionGroupChildren(props.options[index.group])[index.option] : props.options[index] : null;
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        show: show,
        hide: hide,
        focus: function focus() {
          return utils.DomHandler.focus(focusInputRef.current);
        },
        getElement: function getElement() {
          return elementRef.current;
        },
        getOverlay: function getOverlay() {
          return overlayRef.current;
        },
        getInput: function getInput() {
          return inputRef.current;
        },
        getFocusInput: function getFocusInput() {
          return focusInputRef.current;
        }
      };
    });
    React__namespace.useEffect(function () {
      utils.ObjectUtils.combinedRefs(inputRef, props.inputRef);
      utils.ObjectUtils.combinedRefs(focusInputRef, props.focusInputRef);
    }, [inputRef, props.inputRef, focusInputRef, props.focusInputRef]);
    hooks.useMountEffect(function () {
      if (props.autoFocus) {
        utils.DomHandler.focus(focusInputRef.current, props.autoFocus);
      }
    });
    hooks.useUpdateEffect(function () {
      if (overlayVisibleState && props.value) {
        scrollInView();
      }
    }, [overlayVisibleState, props.value]);
    hooks.useUpdateEffect(function () {
      if (overlayVisibleState && filterState && props.filter) {
        alignOverlay();
      }
    }, [overlayVisibleState, filterState, props.filter]);
    hooks.useUpdateEffect(function () {
      if (filterState && (!props.options || props.options.length === 0)) {
        setFilterState('');
      }
      updateInputField();
      if (inputRef.current) {
        inputRef.current.selectedIndex = 1;
      }
    });
    hooks.useUnmountEffect(function () {
      utils.ZIndexUtils.clear(overlayRef.current);
    });
    var createHiddenSelect = function createHiddenSelect() {
      var option = {
        value: '',
        label: props.placeholder
      };
      if (selectedOption) {
        var optionValue = getOptionValue(selectedOption);
        option = {
          value: _typeof(optionValue) === 'object' ? props.options.findIndex(function (o) {
            return o === optionValue;
          }) : optionValue,
          label: getOptionLabel(selectedOption)
        };
      }
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-hidden-accessible p-dropdown-hidden-select"
      }, /*#__PURE__*/React__namespace.createElement("select", {
        ref: inputRef,
        required: props.required,
        defaultValue: option.value,
        name: props.name,
        tabIndex: -1,
        "aria-hidden": "true"
      }, /*#__PURE__*/React__namespace.createElement("option", {
        value: option.value
      }, option.label)));
    };
    var createKeyboardHelper = function createKeyboardHelper() {
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-hidden-accessible"
      }, /*#__PURE__*/React__namespace.createElement("input", _extends({
        ref: focusInputRef,
        id: props.inputId,
        type: "text",
        readOnly: true,
        "aria-haspopup": "listbox",
        onFocus: onInputFocus,
        onBlur: onInputBlur,
        onKeyDown: onInputKeyDown,
        disabled: props.disabled,
        tabIndex: props.tabIndex
      }, ariaProps)));
    };
    var createLabel = function createLabel() {
      var label = utils.ObjectUtils.isNotEmpty(selectedOption) ? getOptionLabel(selectedOption) : null;
      if (props.editable) {
        var value = label || props.value || '';
        return /*#__PURE__*/React__namespace.createElement("input", _extends({
          ref: inputRef,
          type: "text",
          defaultValue: value,
          className: "p-dropdown-label p-inputtext",
          disabled: props.disabled,
          placeholder: props.placeholder,
          maxLength: props.maxLength,
          onInput: onEditableInputChange,
          onFocus: onEditableInputFocus,
          onBlur: onInputBlur,
          "aria-haspopup": "listbox"
        }, ariaProps));
      } else {
        var _className = utils.classNames('p-dropdown-label p-inputtext', {
          'p-placeholder': label === null && props.placeholder,
          'p-dropdown-label-empty': label === null && !props.placeholder
        });
        var content = props.valueTemplate ? utils.ObjectUtils.getJSXElement(props.valueTemplate, selectedOption, props) : label || props.placeholder || 'empty';
        return /*#__PURE__*/React__namespace.createElement("span", {
          ref: inputRef,
          className: _className
        }, content);
      }
    };
    var createClearIcon = function createClearIcon() {
      if (props.value != null && props.showClear && !props.disabled) {
        var iconClassName = utils.classNames('p-dropdown-clear-icon p-clickable');
        var iconProps = {
          className: iconClassName,
          onPointerUp: clear
        };
        return utils.IconUtils.getJSXIcon(props.clearIcon, iconProps);
      }
      return null;
    };
    var createDropdownIcon = function createDropdownIcon() {
      var iconClassName = utils.classNames('p-dropdown-trigger-icon p-clickable');
      var icon = utils.IconUtils.getJSXIcon(props.dropdownIcon, {
        className: iconClassName
      });
      var ariaLabel = props.placeholder || props.ariaLabel;
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-dropdown-trigger",
        role: "button",
        "aria-haspopup": "listbox",
        "aria-expanded": overlayVisibleState,
        "aria-label": ariaLabel
      }, icon);
    };
    var visibleOptions = getVisibleOptions();
    var selectedOption = getSelectedOption();
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var otherProps = DropdownBase.getOtherProps(props);
    var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
    var className = utils.classNames('p-dropdown p-component p-inputwrapper', {
      'p-disabled': props.disabled,
      'p-focus': focusedState,
      'p-dropdown-clearable': props.showClear && !props.disabled,
      'p-inputwrapper-filled': utils.ObjectUtils.isNotEmpty(props.value),
      'p-inputwrapper-focus': focusedState || overlayVisibleState
    }, props.className);
    var hiddenSelect = createHiddenSelect();
    var keyboardHelper = createKeyboardHelper();
    var labelElement = createLabel();
    var dropdownIcon = createDropdownIcon();
    var clearIcon = createClearIcon();
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
      ref: elementRef,
      id: props.id,
      className: className,
      style: props.style
    }, otherProps, {
      onClick: onClick,
      onMouseDown: props.onMouseDown,
      onContextMenu: props.onContextMenu
    }), keyboardHelper, hiddenSelect, labelElement, clearIcon, dropdownIcon, /*#__PURE__*/React__namespace.createElement(DropdownPanel, _extends({
      ref: overlayRef,
      visibleOptions: visibleOptions
    }, props, {
      appendTo: appendTo,
      onClick: onPanelClick,
      onOptionClick: onOptionClick,
      filterValue: filterState,
      hasFilter: hasFilter,
      onFilterClearIconClick: onFilterClearIconClick,
      resetFilter: resetFilter,
      onFilterInputKeyDown: onFilterInputKeyDown,
      onFilterInputChange: onFilterInputChange,
      getOptionLabel: getOptionLabel,
      getOptionRenderKey: getOptionRenderKey,
      isOptionDisabled: isOptionDisabled,
      getOptionGroupChildren: getOptionGroupChildren,
      getOptionGroupLabel: getOptionGroupLabel,
      getOptionGroupRenderKey: getOptionGroupRenderKey,
      isSelected: isSelected,
      getSelectedOptionIndex: getSelectedOptionIndex,
      "in": overlayVisibleState,
      onEnter: onOverlayEnter,
      onEntered: onOverlayEntered,
      onExit: onOverlayExit,
      onExited: onOverlayExited
    }))), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip
    }, props.tooltipOptions)));
  }));
  Dropdown.displayName = 'Dropdown';

  exports.Dropdown = Dropdown;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.hooks, primereact.overlayservice, primereact.tooltip, primereact.utils, primereact.csstransition, primereact.portal, primereact.virtualscroller, primereact.ripple);

this.primereact = this.primereact || {};
this.primereact.dialog = (function (exports, React, PrimeReact, csstransition, hooks, portal, ripple, utils) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);
  var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
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

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
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

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  var DialogBase = {
    defaultProps: {
      __TYPE: 'Dialog',
      appendTo: null,
      ariaCloseIconLabel: null,
      baseZIndex: 0,
      blockScroll: false,
      breakpoints: null,
      className: null,
      closable: true,
      closeOnEscape: true,
      contentClassName: null,
      contentStyle: null,
      dismissableMask: false,
      draggable: true,
      focusOnShow: true,
      footer: null,
      header: null,
      headerClassName: null,
      headerStyle: null,
      icons: null,
      id: null,
      keepInViewport: true,
      maskClassName: null,
      maskStyle: null,
      maximizable: false,
      maximized: false,
      minX: 0,
      minY: 0,
      modal: true,
      onClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragStart: null,
      onHide: null,
      onMaskClick: null,
      onMaximize: null,
      onResize: null,
      onResizeEnd: null,
      onResizeStart: null,
      onShow: null,
      position: 'center',
      resizable: true,
      rtl: false,
      showHeader: true,
      style: null,
      transitionOptions: null,
      visible: false,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, DialogBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, DialogBase.defaultProps);
    }
  };

  var Dialog = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var props = DialogBase.getProps(inProps);
    var uniqueId = props.id ? props.id : utils.UniqueComponentId();
    var _React$useState = React__namespace.useState(uniqueId),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      idState = _React$useState2[0];
      _React$useState2[1];
    var _React$useState3 = React__namespace.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      maskVisibleState = _React$useState4[0],
      setMaskVisibleState = _React$useState4[1];
    var _React$useState5 = React__namespace.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      visibleState = _React$useState6[0],
      setVisibleState = _React$useState6[1];
    var _React$useState7 = React__namespace.useState(props.maximized),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      maximizedState = _React$useState8[0],
      setMaximizedState = _React$useState8[1];
    var dialogRef = React__namespace.useRef(null);
    var maskRef = React__namespace.useRef(null);
    var contentRef = React__namespace.useRef(null);
    var headerRef = React__namespace.useRef(null);
    var footerRef = React__namespace.useRef(null);
    var closeRef = React__namespace.useRef(null);
    var dragging = React__namespace.useRef(false);
    var resizing = React__namespace.useRef(false);
    var lastPageX = React__namespace.useRef(null);
    var lastPageY = React__namespace.useRef(null);
    var styleElement = React__namespace.useRef(null);
    var attributeSelector = React__namespace.useRef(uniqueId);
    var maximized = props.onMaximize ? props.maximized : maximizedState;
    var _useEventListener = hooks.useEventListener({
        type: 'keydown',
        listener: function listener(event) {
          return onKeyDown(event);
        }
      }),
      _useEventListener2 = _slicedToArray(_useEventListener, 2),
      bindDocumentKeyDownListener = _useEventListener2[0],
      unbindDocumentKeyDownListener = _useEventListener2[1];
    var _useEventListener3 = hooks.useEventListener({
        type: 'mousemove',
        target: function target() {
          return window.document;
        },
        listener: function listener(event) {
          return onResize(event);
        }
      }),
      _useEventListener4 = _slicedToArray(_useEventListener3, 2),
      bindDocumentResizeListener = _useEventListener4[0],
      unbindDocumentResizeListener = _useEventListener4[1];
    var _useEventListener5 = hooks.useEventListener({
        type: 'mouseup',
        target: function target() {
          return window.document;
        },
        listener: function listener(event) {
          return onResizeEnd(event);
        }
      }),
      _useEventListener6 = _slicedToArray(_useEventListener5, 2),
      bindDocumentResizeEndListener = _useEventListener6[0],
      unbindDocumentResizEndListener = _useEventListener6[1];
    var _useEventListener7 = hooks.useEventListener({
        type: 'mousemove',
        target: function target() {
          return window.document;
        },
        listener: function listener(event) {
          return onDrag(event);
        }
      }),
      _useEventListener8 = _slicedToArray(_useEventListener7, 2),
      bindDocumentDragListener = _useEventListener8[0],
      unbindDocumentDragListener = _useEventListener8[1];
    var _useEventListener9 = hooks.useEventListener({
        type: 'mouseup',
        target: function target() {
          return window.document;
        },
        listener: function listener(event) {
          return onDragEnd(event);
        }
      }),
      _useEventListener10 = _slicedToArray(_useEventListener9, 2),
      bindDocumentDragEndListener = _useEventListener10[0],
      unbindDocumentDragEndListener = _useEventListener10[1];
    var onClose = function onClose(event) {
      props.onHide();
      event.preventDefault();
    };
    var focus = function focus() {
      var activeElement = document.activeElement;
      var isActiveElementInDialog = activeElement && dialogRef.current && dialogRef.current.contains(activeElement);
      if (!isActiveElementInDialog && props.closable && props.showHeader) {
        closeRef.current.focus();
      }
    };
    var onMaskClick = function onMaskClick(event) {
      if (props.dismissableMask && props.modal && maskRef.current === event.target) {
        onClose(event);
      }
      props.onMaskClick && props.onMaskClick(event);
    };
    var toggleMaximize = function toggleMaximize(event) {
      if (props.onMaximize) {
        props.onMaximize({
          originalEvent: event,
          maximized: !maximized
        });
      } else {
        setMaximizedState(function (prevMaximized) {
          return !prevMaximized;
        });
      }
      event.preventDefault();
    };
    var onKeyDown = function onKeyDown(event) {
      var currentTarget = event.currentTarget;
      if (!currentTarget || !currentTarget.primeDialogParams) {
        return;
      }
      var params = currentTarget.primeDialogParams;
      var paramLength = params.length;
      var dialogId = params[paramLength - 1] ? params[paramLength - 1].id : undefined;
      if (dialogId !== idState) {
        return;
      }
      var dialog = document.getElementById(dialogId);
      if (props.closable && props.closeOnEscape && event.key === 'Escape') {
        onClose(event);
        event.stopImmediatePropagation();
        params.splice(paramLength - 1, 1);
      } else if (event.key === 'Tab') {
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
    };
    var onDragStart = function onDragStart(event) {
      if (utils.DomHandler.hasClass(event.target, 'p-dialog-header-icon') || utils.DomHandler.hasClass(event.target.parentElement, 'p-dialog-header-icon')) {
        return;
      }
      if (props.draggable) {
        dragging.current = true;
        lastPageX.current = event.pageX;
        lastPageY.current = event.pageY;
        dialogRef.current.style.margin = '0';
        utils.DomHandler.addClass(document.body, 'p-unselectable-text');
        props.onDragStart && props.onDragStart(event);
      }
    };
    var onDrag = function onDrag(event) {
      if (dragging.current) {
        var width = utils.DomHandler.getOuterWidth(dialogRef.current);
        var height = utils.DomHandler.getOuterHeight(dialogRef.current);
        var deltaX = event.pageX - lastPageX.current;
        var deltaY = event.pageY - lastPageY.current;
        var offset = dialogRef.current.getBoundingClientRect();
        var leftPos = offset.left + deltaX;
        var topPos = offset.top + deltaY;
        var viewport = utils.DomHandler.getViewport();
        dialogRef.current.style.position = 'fixed';
        if (props.keepInViewport) {
          if (leftPos >= props.minX && leftPos + width < viewport.width) {
            lastPageX.current = event.pageX;
            dialogRef.current.style.left = leftPos + 'px';
          }
          if (topPos >= props.minY && topPos + height < viewport.height) {
            lastPageY.current = event.pageY;
            dialogRef.current.style.top = topPos + 'px';
          }
        } else {
          lastPageX.current = event.pageX;
          dialogRef.current.style.left = leftPos + 'px';
          lastPageY.current = event.pageY;
          dialogRef.current.style.top = topPos + 'px';
        }
        props.onDrag && props.onDrag(event);
      }
    };
    var onDragEnd = function onDragEnd(event) {
      if (dragging.current) {
        dragging.current = false;
        utils.DomHandler.removeClass(document.body, 'p-unselectable-text');
        props.onDragEnd && props.onDragEnd(event);
      }
    };
    var onResizeStart = function onResizeStart(event) {
      if (props.resizable) {
        resizing.current = true;
        lastPageX.current = event.pageX;
        lastPageY.current = event.pageY;
        utils.DomHandler.addClass(document.body, 'p-unselectable-text');
        props.onResizeStart && props.onResizeStart(event);
      }
    };
    var convertToPx = function convertToPx(value, property, viewport) {
      !viewport && (viewport = utils.DomHandler.getViewport());
      var val = parseInt(value);
      if (/^(\d+|(\.\d+))(\.\d+)?%$/.test(value)) {
        return val * (viewport[property] / 100);
      }
      return val;
    };
    var onResize = function onResize(event) {
      if (resizing.current) {
        var deltaX = event.pageX - lastPageX.current;
        var deltaY = event.pageY - lastPageY.current;
        var width = utils.DomHandler.getOuterWidth(dialogRef.current);
        var height = utils.DomHandler.getOuterHeight(dialogRef.current);
        var offset = dialogRef.current.getBoundingClientRect();
        var viewport = utils.DomHandler.getViewport();
        var hasBeenDragged = !parseInt(dialogRef.current.style.top) || !parseInt(dialogRef.current.style.left);
        var minWidth = convertToPx(dialogRef.current.style.minWidth, 'width', viewport);
        var minHeight = convertToPx(dialogRef.current.style.minHeight, 'height', viewport);
        var newWidth = width + deltaX;
        var newHeight = height + deltaY;
        if (hasBeenDragged) {
          newWidth += deltaX;
          newHeight += deltaY;
        }
        if ((!minWidth || newWidth > minWidth) && offset.left + newWidth < viewport.width) {
          dialogRef.current.style.width = newWidth + 'px';
        }
        if ((!minHeight || newHeight > minHeight) && offset.top + newHeight < viewport.height) {
          dialogRef.current.style.height = newHeight + 'px';
        }
        lastPageX.current = event.pageX;
        lastPageY.current = event.pageY;
        props.onResize && props.onResize(event);
      }
    };
    var onResizeEnd = function onResizeEnd(event) {
      if (resizing.current) {
        resizing.current = false;
        utils.DomHandler.removeClass(document.body, 'p-unselectable-text');
        props.onResizeEnd && props.onResizeEnd(event);
      }
    };
    var resetPosition = function resetPosition() {
      dialogRef.current.style.position = '';
      dialogRef.current.style.left = '';
      dialogRef.current.style.top = '';
      dialogRef.current.style.margin = '';
    };
    var getPositionClass = function getPositionClass() {
      var positions = ['center', 'left', 'right', 'top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right'];
      var pos = positions.find(function (item) {
        return item === props.position || item.replace('-', '') === props.position;
      });
      return pos ? "p-dialog-".concat(pos) : '';
    };
    var onEnter = function onEnter() {
      dialogRef.current.setAttribute(attributeSelector.current, '');
    };
    var onEntered = function onEntered() {
      props.onShow && props.onShow();
      if (props.focusOnShow) {
        focus();
      }
      enableDocumentSettings();
    };
    var onExiting = function onExiting() {
      if (props.modal) {
        utils.DomHandler.addClass(maskRef.current, 'p-component-overlay-leave');
      }
      if (props.blockScroll) {
        utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
      }
    };
    var onExited = function onExited() {
      dragging.current = false;
      utils.ZIndexUtils.clear(maskRef.current);
      setMaskVisibleState(false);
      disableDocumentSettings();
    };
    var enableDocumentSettings = function enableDocumentSettings() {
      bindGlobalListeners();
      if (props.blockScroll || props.maximizable && maximized) {
        utils.DomHandler.addClass(document.body, 'p-overflow-hidden');
      }
    };
    var disableDocumentSettings = function disableDocumentSettings() {
      unbindGlobalListeners();
      var isMaximized = props.maximizable && maximized;
      if (props.modal) {
        var hasBlockScroll = document.primeDialogParams && document.primeDialogParams.some(function (param) {
          return param.hasBlockScroll;
        });
        if (hasBlockScroll || isMaximized) {
          utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
        }
      } else if (props.blockScroll || isMaximized) {
        utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
      }
    };
    var bindGlobalListeners = function bindGlobalListeners() {
      if (props.draggable) {
        bindDocumentDragListener();
        bindDocumentDragEndListener();
      }
      if (props.resizable) {
        bindDocumentResizeListener();
        bindDocumentResizeEndListener();
      }
      bindDocumentKeyDownListener();
      var newParam = {
        id: idState,
        hasBlockScroll: props.blockScroll
      };
      document.primeDialogParams = document.primeDialogParams ? [].concat(_toConsumableArray(document.primeDialogParams), [newParam]) : [newParam];
    };
    var unbindGlobalListeners = function unbindGlobalListeners() {
      unbindDocumentDragListener();
      unbindDocumentDragEndListener();
      unbindDocumentResizeListener();
      unbindDocumentResizEndListener();
      unbindDocumentKeyDownListener();
      document.primeDialogParams = document.primeDialogParams && document.primeDialogParams.filter(function (param) {
        return param.id !== idState;
      });
    };
    var createStyle = function createStyle() {
      styleElement.current = utils.DomHandler.createInlineStyle(PrimeReact__default["default"].nonce);
      var innerHTML = '';
      for (var breakpoint in props.breakpoints) {
        innerHTML += "\n                @media screen and (max-width: ".concat(breakpoint, ") {\n                    .p-dialog[").concat(attributeSelector.current, "] {\n                        width: ").concat(props.breakpoints[breakpoint], " !important;\n                    }\n                }\n            ");
      }
      styleElement.current.innerHTML = innerHTML;
    };
    var changeScrollOnMaximizable = function changeScrollOnMaximizable() {
      if (!props.blockScroll) {
        var funcName = maximized ? 'addClass' : 'removeClass';
        utils.DomHandler[funcName](document.body, 'p-overflow-hidden');
      }
    };
    hooks.useMountEffect(function () {
      if (props.visible) {
        setMaskVisibleState(true);
      }
      if (props.breakpoints) {
        createStyle();
      }
    });
    hooks.useUpdateEffect(function () {
      if (props.visible && !maskVisibleState) {
        setMaskVisibleState(true);
      }
      if (props.visible !== visibleState && maskVisibleState) {
        setVisibleState(props.visible);
      }
    });
    hooks.useUpdateEffect(function () {
      if (maskVisibleState) {
        utils.ZIndexUtils.set('modal', maskRef.current, PrimeReact__default["default"].autoZIndex, props.baseZIndex || PrimeReact__default["default"].zIndex['modal']);
        setVisibleState(true);
      }
    }, [maskVisibleState]);
    hooks.useUpdateEffect(function () {
      changeScrollOnMaximizable();
    }, [props.maximized, maximizedState]);
    hooks.useUnmountEffect(function () {
      disableDocumentSettings();
      utils.DomHandler.removeInlineStyle(styleElement.current);
      utils.ZIndexUtils.clear(maskRef.current);
    });
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        resetPosition: resetPosition,
        getElement: function getElement() {
          return dialogRef.current;
        },
        getMask: function getMask() {
          return maskRef.current;
        },
        getContent: function getContent() {
          return contentRef.current;
        },
        getHeader: function getHeader() {
          return headerRef.current;
        },
        getFooter: function getFooter() {
          return footerRef.current;
        },
        getCloseButton: function getCloseButton() {
          return closeRef.current;
        }
      };
    });
    var createCloseIcon = function createCloseIcon() {
      if (props.closable) {
        var ariaLabel = props.ariaCloseIconLabel || PrimeReact.localeOption('close');
        return /*#__PURE__*/React__namespace.createElement("button", {
          ref: closeRef,
          type: "button",
          className: "p-dialog-header-icon p-dialog-header-close p-link",
          "aria-label": ariaLabel,
          onClick: onClose
        }, /*#__PURE__*/React__namespace.createElement("span", {
          className: "p-dialog-header-close-icon pi pi-times",
          "aria-hidden": "true"
        }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
      }
      return null;
    };
    var createMaximizeIcon = function createMaximizeIcon() {
      var iconClassName = utils.classNames('p-dialog-header-maximize-icon pi', {
        'pi-window-maximize': !maximized,
        'pi-window-minimize': maximized
      });
      if (props.maximizable) {
        return /*#__PURE__*/React__namespace.createElement("button", {
          type: "button",
          className: "p-dialog-header-icon p-dialog-header-maximize p-link",
          onClick: toggleMaximize
        }, /*#__PURE__*/React__namespace.createElement("span", {
          className: iconClassName
        }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
      }
      return null;
    };
    var createHeader = function createHeader() {
      if (props.showHeader) {
        var closeIcon = createCloseIcon();
        var maximizeIcon = createMaximizeIcon();
        var icons = utils.ObjectUtils.getJSXElement(props.icons, props);
        var header = utils.ObjectUtils.getJSXElement(props.header, props);
        var headerId = idState + '_header';
        var headerClassName = utils.classNames('p-dialog-header', props.headerClassName);
        return /*#__PURE__*/React__namespace.createElement("div", {
          ref: headerRef,
          style: props.headerStyle,
          className: headerClassName,
          onMouseDown: onDragStart
        }, /*#__PURE__*/React__namespace.createElement("div", {
          id: headerId,
          className: "p-dialog-title"
        }, header), /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-dialog-header-icons"
        }, icons, maximizeIcon, closeIcon));
      }
      return null;
    };
    var createContent = function createContent() {
      var className = utils.classNames('p-dialog-content', props.contentClassName);
      var contentId = idState + '_content';
      return /*#__PURE__*/React__namespace.createElement("div", {
        id: contentId,
        ref: contentRef,
        className: className,
        style: props.contentStyle
      }, props.children);
    };
    var createFooter = function createFooter() {
      var footer = utils.ObjectUtils.getJSXElement(props.footer, props);
      return footer && /*#__PURE__*/React__namespace.createElement("div", {
        ref: footerRef,
        className: "p-dialog-footer"
      }, footer);
    };
    var createResizer = function createResizer() {
      if (props.resizable) {
        return /*#__PURE__*/React__namespace.createElement("span", {
          className: "p-resizable-handle",
          style: {
            zIndex: 90
          },
          onMouseDown: onResizeStart
        });
      }
      return null;
    };
    var createElement = function createElement() {
      var otherProps = DialogBase.getOtherProps(props);
      var className = utils.classNames('p-dialog p-component', props.className, {
        'p-dialog-rtl': props.rtl,
        'p-dialog-maximized': maximized,
        'p-dialog-default': !maximized,
        'p-input-filled': PrimeReact__default["default"].inputStyle === 'filled',
        'p-ripple-disabled': PrimeReact__default["default"].ripple === false
      });
      var maskClassName = utils.classNames('p-dialog-mask', getPositionClass(), {
        'p-component-overlay p-component-overlay-enter': props.modal,
        'p-dialog-visible': maskVisibleState,
        'p-dialog-draggable': props.draggable,
        'p-dialog-resizable': props.resizable
      }, props.maskClassName);
      var header = createHeader();
      var content = createContent();
      var footer = createFooter();
      var resizer = createResizer();
      var headerId = idState + '_header';
      var contentId = idState + '_content';
      var transitionTimeout = {
        enter: props.position === 'center' ? 150 : 300,
        exit: props.position === 'center' ? 150 : 300
      };
      return /*#__PURE__*/React__namespace.createElement("div", {
        ref: maskRef,
        style: props.maskStyle,
        className: maskClassName,
        onClick: onMaskClick
      }, /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
        nodeRef: dialogRef,
        classNames: "p-dialog",
        timeout: transitionTimeout,
        "in": visibleState,
        options: props.transitionOptions,
        unmountOnExit: true,
        onEnter: onEnter,
        onEntered: onEntered,
        onExiting: onExiting,
        onExited: onExited
      }, /*#__PURE__*/React__namespace.createElement("div", _extends({
        ref: dialogRef,
        id: idState,
        className: className,
        style: props.style,
        onClick: props.onClick,
        role: "dialog"
      }, otherProps, {
        "aria-labelledby": headerId,
        "aria-describedby": contentId,
        "aria-modal": props.modal
      }), header, content, footer, resizer)));
    };
    var createDialog = function createDialog() {
      var element = createElement();
      return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
        element: element,
        appendTo: props.appendTo,
        visible: true
      });
    };
    return maskVisibleState && createDialog();
  });
  Dialog.displayName = 'Dialog';

  exports.Dialog = Dialog;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.csstransition, primereact.hooks, primereact.portal, primereact.ripple, primereact.utils);

this.primereact = this.primereact || {};
this.primereact.paginator = (function (exports, React, hooks, utils, api, ripple, inputnumber, dropdown) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
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

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
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

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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

  var PaginatorBase = {
    defaultProps: {
      __TYPE: 'Paginator',
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
      currentPageReportTemplate: '({currentPage} of {totalPages})',
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, PaginatorBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, PaginatorBase.defaultProps);
    }
  };
  var CurrentPageReportBase = {
    defaultProps: {
      __TYPE: 'CurrentPageReport',
      pageCount: null,
      page: null,
      first: null,
      rows: null,
      totalRecords: null,
      reportTemplate: '({currentPage} of {totalPages})',
      template: null,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, CurrentPageReportBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, CurrentPageReportBase.defaultProps);
    }
  };
  var FirstPageLinkBase = {
    defaultProps: {
      __TYPE: 'FirstPageLink',
      disabled: false,
      onClick: null,
      template: null,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, FirstPageLinkBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, FirstPageLinkBase.defaultProps);
    }
  };
  var JumpToPageInputBase = {
    defaultProps: {
      __TYPE: 'JumpToPageInput',
      page: null,
      rows: null,
      pageCount: null,
      disabled: false,
      template: null,
      onChange: null,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, JumpToPageInputBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, JumpToPageInputBase.defaultProps);
    }
  };
  var LastPageLinkBase = {
    defaultProps: {
      __TYPE: 'LastPageLink',
      disabled: false,
      onClick: null,
      template: null,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, LastPageLinkBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, LastPageLinkBase.defaultProps);
    }
  };
  var NextPageLinkBase = {
    defaultProps: {
      __TYPE: 'NextPageLink',
      disabled: false,
      onClick: null,
      template: null,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, NextPageLinkBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, NextPageLinkBase.defaultProps);
    }
  };
  var PageLinksBase = {
    defaultProps: {
      __TYPE: 'PageLinks',
      value: null,
      page: null,
      rows: null,
      pageCount: null,
      links: null,
      template: null,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, PageLinksBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, PageLinksBase.defaultProps);
    }
  };
  var PrevPageLinkBase = {
    defaultProps: {
      __TYPE: 'PrevPageLink',
      disabled: false,
      onClick: null,
      template: null,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, PrevPageLinkBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, PrevPageLinkBase.defaultProps);
    }
  };
  var RowsPerPageDropdownBase = {
    defaultProps: {
      __TYPE: 'RowsPerPageDropdown',
      options: null,
      value: null,
      page: null,
      pageCount: null,
      totalRecords: 0,
      appendTo: null,
      onChange: null,
      template: null,
      disabled: false,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, RowsPerPageDropdownBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, RowsPerPageDropdownBase.defaultProps);
    }
  };

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var CurrentPageReport = /*#__PURE__*/React__namespace.memo(function (inProps) {
    var props = CurrentPageReportBase.getProps(inProps);
    var report = {
      currentPage: props.page + 1,
      totalPages: props.pageCount,
      first: Math.min(props.first + 1, props.totalRecords),
      last: Math.min(props.first + props.rows, props.totalRecords),
      rows: props.rows,
      totalRecords: props.totalRecords
    };
    var text = props.reportTemplate.replace('{currentPage}', report.currentPage).replace('{totalPages}', report.totalPages).replace('{first}', report.first).replace('{last}', report.last).replace('{rows}', report.rows).replace('{totalRecords}', report.totalRecords);
    var element = /*#__PURE__*/React__namespace.createElement("span", {
      className: "p-paginator-current"
    }, text);
    if (props.template) {
      var defaultOptions = _objectSpread(_objectSpread({}, report), {
        className: 'p-paginator-current',
        element: element,
        props: props
      });
      return utils.ObjectUtils.getJSXElement(props.template, defaultOptions);
    }
    return element;
  });
  CurrentPageReport.displayName = 'CurrentPageReport';

  var FirstPageLink = /*#__PURE__*/React__namespace.memo(function (inProps) {
    var props = FirstPageLinkBase.getProps(inProps);
    var className = utils.classNames('p-paginator-first p-paginator-element p-link', {
      'p-disabled': props.disabled
    });
    var iconClassName = 'p-paginator-icon pi pi-angle-double-left';
    var element = /*#__PURE__*/React__namespace.createElement("button", {
      type: "button",
      className: className,
      onClick: props.onClick,
      disabled: props.disabled,
      "aria-label": api.ariaLabel('firstPageLabel')
    }, /*#__PURE__*/React__namespace.createElement("span", {
      className: iconClassName
    }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    if (props.template) {
      var defaultOptions = {
        onClick: props.onClick,
        className: className,
        iconClassName: iconClassName,
        disabled: props.disabled,
        element: element,
        props: props
      };
      return utils.ObjectUtils.getJSXElement(props.template, defaultOptions);
    }
    return element;
  });
  FirstPageLink.displayName = 'FirstPageLink';

  var JumpToPageInput = /*#__PURE__*/React__namespace.memo(function (inProps) {
    var props = JumpToPageInputBase.getProps(inProps);
    var onChange = function onChange(event) {
      if (props.onChange) {
        props.onChange(props.rows * (event.value - 1), props.rows);
      }
    };
    var value = props.pageCount > 0 ? props.page + 1 : 0;
    var element = /*#__PURE__*/React__namespace.createElement(inputnumber.InputNumber, {
      value: value,
      onChange: onChange,
      className: "p-paginator-page-input",
      disabled: props.disabled
    });
    if (props.template) {
      var defaultOptions = {
        value: value,
        onChange: onChange,
        disabled: props.disabled,
        className: 'p-paginator-page-input',
        element: element,
        props: props
      };
      return utils.ObjectUtils.getJSXElement(props.template, defaultOptions);
    }
    return element;
  });
  JumpToPageInput.displayName = 'JumpToPageInput';

  var LastPageLink = /*#__PURE__*/React__namespace.memo(function (inProps) {
    var props = LastPageLinkBase.getProps(inProps);
    var className = utils.classNames('p-paginator-last p-paginator-element p-link', {
      'p-disabled': props.disabled
    });
    var iconClassName = 'p-paginator-icon pi pi-angle-double-right';
    var element = /*#__PURE__*/React__namespace.createElement("button", {
      type: "button",
      className: className,
      onClick: props.onClick,
      disabled: props.disabled,
      "aria-label": api.ariaLabel('lastPageLabel')
    }, /*#__PURE__*/React__namespace.createElement("span", {
      className: iconClassName
    }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    if (props.template) {
      var defaultOptions = {
        onClick: props.onClick,
        className: className,
        iconClassName: iconClassName,
        disabled: props.disabled,
        element: element,
        props: props
      };
      return utils.ObjectUtils.getJSXElement(props.template, defaultOptions);
    }
    return element;
  });
  LastPageLink.displayName = 'LastPageLink';

  var NextPageLink = /*#__PURE__*/React__namespace.memo(function (inProps) {
    var props = NextPageLinkBase.getProps(inProps);
    var className = utils.classNames('p-paginator-next p-paginator-element p-link', {
      'p-disabled': props.disabled
    });
    var iconClassName = 'p-paginator-icon pi pi-angle-right';
    var element = /*#__PURE__*/React__namespace.createElement("button", {
      type: "button",
      className: className,
      onClick: props.onClick,
      disabled: props.disabled,
      "aria-label": api.ariaLabel('nextPageLabel')
    }, /*#__PURE__*/React__namespace.createElement("span", {
      className: iconClassName
    }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    if (props.template) {
      var defaultOptions = {
        onClick: props.onClick,
        className: className,
        iconClassName: iconClassName,
        disabled: props.disabled,
        element: element,
        props: props
      };
      return utils.ObjectUtils.getJSXElement(props.template, defaultOptions);
    }
    return element;
  });
  NextPageLink.displayName = 'NextPageLink';

  var PageLinks = /*#__PURE__*/React__namespace.memo(function (inProps) {
    var props = PageLinksBase.getProps(inProps);
    var onPageLinkClick = function onPageLinkClick(event, pageLink) {
      if (props.onClick) {
        props.onClick({
          originalEvent: event,
          value: pageLink
        });
      }
      event.preventDefault();
    };
    var elements;
    if (props.value) {
      var startPageInView = props.value[0];
      var endPageInView = props.value[props.value.length - 1];
      elements = props.value.map(function (pageLink) {
        var className = utils.classNames('p-paginator-page p-paginator-element p-link', {
          'p-paginator-page-start': pageLink === startPageInView,
          'p-paginator-page-end': pageLink === endPageInView,
          'p-highlight': pageLink - 1 === props.page
        });
        var element = /*#__PURE__*/React__namespace.createElement("button", {
          type: "button",
          className: className,
          onClick: function onClick(e) {
            return onPageLinkClick(e, pageLink);
          },
          "aria-label": "".concat(api.ariaLabel('pageLabel'), " ").concat(pageLink + 1)
        }, pageLink, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
        if (props.template) {
          var defaultOptions = {
            onClick: function onClick(e) {
              return onPageLinkClick(e, pageLink);
            },
            className: className,
            view: {
              startPage: startPageInView - 1,
              endPage: endPageInView - 1
            },
            page: pageLink - 1,
            currentPage: props.page,
            totalPages: props.pageCount,
            element: element,
            props: props
          };
          element = utils.ObjectUtils.getJSXElement(props.template, defaultOptions);
        }
        return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, {
          key: pageLink
        }, element);
      });
    }
    return /*#__PURE__*/React__namespace.createElement("span", {
      className: "p-paginator-pages"
    }, elements);
  });
  PageLinks.displayName = 'PageLinks';

  var PrevPageLink = /*#__PURE__*/React__namespace.memo(function (inProps) {
    var props = PrevPageLinkBase.getProps(inProps);
    var className = utils.classNames('p-paginator-prev p-paginator-element p-link', {
      'p-disabled': props.disabled
    });
    var iconClassName = 'p-paginator-icon pi pi-angle-left';
    var element = /*#__PURE__*/React__namespace.createElement("button", {
      type: "button",
      className: className,
      onClick: props.onClick,
      disabled: props.disabled,
      "aria-label": api.ariaLabel('previousPageLabel')
    }, /*#__PURE__*/React__namespace.createElement("span", {
      className: iconClassName
    }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    if (props.template) {
      var defaultOptions = {
        onClick: props.onClick,
        className: className,
        iconClassName: iconClassName,
        disabled: props.disabled,
        element: element,
        props: props
      };
      return utils.ObjectUtils.getJSXElement(props.template, defaultOptions);
    }
    return element;
  });
  PrevPageLink.displayName = 'PrevPageLink';

  var RowsPerPageDropdown = /*#__PURE__*/React__namespace.memo(function (inProps) {
    var props = RowsPerPageDropdownBase.getProps(inProps);
    var hasOptions = props.options && props.options.length > 0;
    var options = hasOptions ? props.options.map(function (opt) {
      return {
        label: String(opt),
        value: opt
      };
    }) : [];
    var ariaLabel = api.localeOption('choose');
    var element = hasOptions ? /*#__PURE__*/React__namespace.createElement(dropdown.Dropdown, {
      value: props.value,
      options: options,
      onChange: props.onChange,
      appendTo: props.appendTo,
      disabled: props.disabled,
      placeholder: ariaLabel,
      "aria-label": ariaLabel
    }) : null;
    if (props.template) {
      var defaultOptions = {
        value: props.value,
        options: options,
        onChange: props.onChange,
        appendTo: props.appendTo,
        currentPage: props.page,
        totalPages: props.pageCount,
        totalRecords: props.totalRecords,
        disabled: props.disabled,
        element: element,
        props: props
      };
      return utils.ObjectUtils.getJSXElement(props.template, defaultOptions);
    }
    return element;
  });
  RowsPerPageDropdown.displayName = 'RowsPerPageDropdown';

  var Paginator = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var props = PaginatorBase.getProps(inProps);
    var elementRef = React__namespace.useRef(null);
    var rppChanged = React__namespace.useRef(false);
    var page = Math.floor(props.first / props.rows);
    var pageCount = Math.ceil(props.totalRecords / props.rows);
    var isFirstPage = page === 0;
    var isLastPage = page === pageCount - 1;
    var isEmpty = pageCount === 0;
    var calculatePageLinkBoundaries = function calculatePageLinkBoundaries() {
      var numberOfPages = pageCount;
      var visiblePages = Math.min(props.pageLinkSize, numberOfPages);

      //calculate range, keep current in middle if necessary
      var start = Math.max(0, Math.ceil(page - visiblePages / 2));
      var end = Math.min(numberOfPages - 1, start + visiblePages - 1);

      //check when approaching to last page
      var delta = props.pageLinkSize - (end - start + 1);
      start = Math.max(0, start - delta);
      return [start, end];
    };
    var updatePageLinks = function updatePageLinks() {
      var pageLinks = [];
      var boundaries = calculatePageLinkBoundaries();
      var start = boundaries[0];
      var end = boundaries[1];
      for (var i = start; i <= end; i++) {
        pageLinks.push(i + 1);
      }
      return pageLinks;
    };
    var changePage = function changePage(first, rows) {
      var pc = pageCount;
      var p = Math.floor(first / rows);
      if (p >= 0 && p < pc) {
        var newPageState = {
          first: first,
          rows: rows,
          page: p,
          pageCount: pc
        };
        if (props.onPageChange) {
          props.onPageChange(newPageState);
        }
      }
    };
    var changePageToFirst = function changePageToFirst(event) {
      changePage(0, props.rows);
      event.preventDefault();
    };
    var changePageToPrev = function changePageToPrev(event) {
      changePage(props.first - props.rows, props.rows);
      event.preventDefault();
    };
    var onPageLinkClick = function onPageLinkClick(event) {
      changePage((event.value - 1) * props.rows, props.rows);
    };
    var changePageToNext = function changePageToNext(event) {
      changePage(props.first + props.rows, props.rows);
      event.preventDefault();
    };
    var changePageToLast = function changePageToLast(event) {
      changePage((pageCount - 1) * props.rows, props.rows);
      event.preventDefault();
    };
    var onRowsChange = function onRowsChange(event) {
      var rows = event.value;
      rppChanged.current = rows !== props.rows;
      changePage(0, rows);
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    hooks.useUpdateEffect(function () {
      if (!rppChanged.current) {
        changePage(props.first, props.rows);
      }
      rppChanged.current = false;
    }, [props.rows]);
    hooks.useUpdateEffect(function () {
      if (page > 0 && props.first >= props.totalRecords) {
        changePage((pageCount - 1) * props.rows, props.rows);
      }
    }, [props.totalRecords]);
    var createElement = function createElement(key, template) {
      var element;
      switch (key) {
        case 'FirstPageLink':
          element = /*#__PURE__*/React__namespace.createElement(FirstPageLink, {
            key: key,
            onClick: changePageToFirst,
            disabled: isFirstPage || isEmpty,
            template: template
          });
          break;
        case 'PrevPageLink':
          element = /*#__PURE__*/React__namespace.createElement(PrevPageLink, {
            key: key,
            onClick: changePageToPrev,
            disabled: isFirstPage || isEmpty,
            template: template
          });
          break;
        case 'NextPageLink':
          element = /*#__PURE__*/React__namespace.createElement(NextPageLink, {
            key: key,
            onClick: changePageToNext,
            disabled: isLastPage || isEmpty,
            template: template
          });
          break;
        case 'LastPageLink':
          element = /*#__PURE__*/React__namespace.createElement(LastPageLink, {
            key: key,
            onClick: changePageToLast,
            disabled: isLastPage || isEmpty,
            template: template
          });
          break;
        case 'PageLinks':
          element = /*#__PURE__*/React__namespace.createElement(PageLinks, {
            key: key,
            value: updatePageLinks(),
            page: page,
            rows: props.rows,
            pageCount: pageCount,
            onClick: onPageLinkClick,
            template: template
          });
          break;
        case 'RowsPerPageDropdown':
          element = /*#__PURE__*/React__namespace.createElement(RowsPerPageDropdown, {
            key: key,
            value: props.rows,
            page: page,
            pageCount: pageCount,
            totalRecords: props.totalRecords,
            options: props.rowsPerPageOptions,
            onChange: onRowsChange,
            appendTo: props.dropdownAppendTo,
            template: template,
            disabled: isEmpty
          });
          break;
        case 'CurrentPageReport':
          element = /*#__PURE__*/React__namespace.createElement(CurrentPageReport, {
            reportTemplate: props.currentPageReportTemplate,
            key: key,
            page: page,
            pageCount: pageCount,
            first: props.first,
            rows: props.rows,
            totalRecords: props.totalRecords,
            template: template
          });
          break;
        case 'JumpToPageInput':
          element = /*#__PURE__*/React__namespace.createElement(JumpToPageInput, {
            key: key,
            rows: props.rows,
            page: page,
            pageCount: pageCount,
            onChange: changePage,
            disabled: isEmpty,
            template: template
          });
          break;
        default:
          element = null;
          break;
      }
      return element;
    };
    var createElements = function createElements() {
      var template = props.template;
      if (template) {
        if (_typeof(template) === 'object') {
          return template.layout ? template.layout.split(' ').map(function (value) {
            var key = value.trim();
            return createElement(key, template[key]);
          }) : Object.entries(template).map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              _template = _ref2[1];
            return createElement(key, _template);
          });
        }
        return template.split(' ').map(function (value) {
          return createElement(value.trim());
        });
      }
      return null;
    };
    if (!props.alwaysShow && pageCount === 1) {
      return null;
    } else {
      var otherProps = PaginatorBase.getOtherProps(props);
      var className = utils.classNames('p-paginator p-component', props.className);
      var leftContent = utils.ObjectUtils.getJSXElement(props.leftContent, props);
      var rightContent = utils.ObjectUtils.getJSXElement(props.rightContent, props);
      var elements = createElements();
      var leftElement = leftContent && /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-paginator-left-content"
      }, leftContent);
      var rightElement = rightContent && /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-paginator-right-content"
      }, rightContent);
      return /*#__PURE__*/React__namespace.createElement("div", _extends({
        ref: elementRef,
        className: className,
        style: props.style
      }, otherProps), leftElement, elements, rightElement);
    }
  }));
  Paginator.displayName = 'Paginator';

  exports.Paginator = Paginator;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.hooks, primereact.utils, primereact.api, primereact.ripple, primereact.inputnumber, primereact.dropdown);

this.primereact = this.primereact || {};
this.primereact.tree = (function (exports, React, utils, api, ripple) {
  'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
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

  function _arrayLikeToArray$2(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
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

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest();
  }

  var TreeBase = {
    defaultProps: {
      __TYPE: 'Tree',
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
      filterTemplate: null,
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
      onNodeDoubleClick: null,
      children: undefined
    },
    getProps: function getProps(props) {
      return utils.ObjectUtils.getMergedProps(props, TreeBase.defaultProps);
    },
    getOtherProps: function getOtherProps(props) {
      return utils.ObjectUtils.getDiffProps(props, TreeBase.defaultProps);
    }
  };

  function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
  function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var UITreeNode = /*#__PURE__*/React__namespace.memo(function (props) {
    var contentRef = React__namespace.useRef(null);
    var nodeTouched = React__namespace.useRef(false);
    var isLeaf = props.isNodeLeaf(props.node);
    var expanded = (props.expandedKeys ? props.expandedKeys[props.node.key] !== undefined : false) || props.node.expanded;
    var expand = function expand(event) {
      var expandedKeys = props.expandedKeys ? _objectSpread$1({}, props.expandedKeys) : {};
      expandedKeys[props.node.key] = true;
      props.onToggle({
        originalEvent: event,
        value: expandedKeys
      });
      invokeToggleEvents(event, true);
    };
    var collapse = function collapse(event) {
      var expandedKeys = _objectSpread$1({}, props.expandedKeys);
      delete expandedKeys[props.node.key];
      props.onToggle({
        originalEvent: event,
        value: expandedKeys
      });
      invokeToggleEvents(event, false);
    };
    var onTogglerClick = function onTogglerClick(event) {
      if (props.disabled) {
        return;
      }
      expanded ? collapse(event) : expand(event);
      event.preventDefault();
      event.stopPropagation();
    };
    var invokeToggleEvents = function invokeToggleEvents(event, isExpanded) {
      if (isExpanded) {
        if (props.onExpand) {
          props.onExpand({
            originalEvent: event,
            node: props.node
          });
        }
      } else {
        if (props.onCollapse) {
          props.onCollapse({
            originalEvent: event,
            node: props.node
          });
        }
      }
    };
    var onNodeKeyDown = function onNodeKeyDown(event) {
      if (props.disabled) {
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
            focusNode(listElement.children[0]);
          } else {
            var nextNodeElement = nodeElement.nextElementSibling;
            while (nextNodeElement) {
              if (!utils.DomHandler.hasClass(nextNodeElement, 'p-treenode-droppoint')) {
                break;
              }
              nextNodeElement = nextNodeElement.nextElementSibling;
            }
            if (nextNodeElement) {
              focusNode(nextNodeElement);
            } else {
              var nextSiblingAncestor = findNextSiblingOfAncestor(nodeElement);
              nextSiblingAncestor && focusNode(nextSiblingAncestor);
            }
          }
          event.preventDefault();
          break;

        //up arrow
        case 38:
          if (nodeElement.previousElementSibling) {
            focusNode(findLastVisibleDescendant(nodeElement.previousElementSibling));
          } else {
            var parentNodeElement = getParentNodeElement(nodeElement);
            parentNodeElement && focusNode(parentNodeElement);
          }
          event.preventDefault();
          break;

        //right arrow
        case 39:
          if (!expanded) {
            expand(event);
          }
          event.preventDefault();
          break;

        //left arrow
        case 37:
          if (expanded) {
            collapse(event);
          }
          event.preventDefault();
          break;

        //enter
        case 13:
          onClick(event);
          event.preventDefault();
          break;
      }
    };
    var findNextSiblingOfAncestor = function findNextSiblingOfAncestor(nodeElement) {
      var parentNodeElement = getParentNodeElement(nodeElement);
      return parentNodeElement ? parentNodeElement.nextElementSibling || findNextSiblingOfAncestor(parentNodeElement) : null;
    };
    var findLastVisibleDescendant = function findLastVisibleDescendant(nodeElement) {
      var childrenListElement = nodeElement.children[1];
      if (childrenListElement) {
        var lastChildElement = childrenListElement.children[childrenListElement.children.length - 1];
        return findLastVisibleDescendant(lastChildElement);
      } else {
        return nodeElement;
      }
    };
    var getParentNodeElement = function getParentNodeElement(nodeElement) {
      var parentNodeElement = nodeElement.parentElement.parentElement;
      return utils.DomHandler.hasClass(parentNodeElement, 'p-treenode') ? parentNodeElement : null;
    };
    var focusNode = function focusNode(element) {
      element && element.children[0] && element.children[0].focus();
    };
    var onClick = function onClick(event) {
      if (props.onClick) {
        props.onClick({
          originalEvent: event,
          node: props.node
        });
      }
      var targetNode = event.target.nodeName;
      if (props.disabled || targetNode === 'INPUT' || targetNode === 'BUTTON' || targetNode === 'A' || utils.DomHandler.hasClass(event.target, 'p-clickable')) {
        return;
      }
      if (props.selectionMode && props.node.selectable !== false) {
        var selectionKeys;
        if (isCheckboxSelectionMode()) {
          var checked = isChecked();
          selectionKeys = props.selectionKeys ? _objectSpread$1({}, props.selectionKeys) : {};
          if (checked) {
            if (props.propagateSelectionDown) propagateDown(props.node, false, selectionKeys);else delete selectionKeys[props.node.key];
            if (props.propagateSelectionUp && props.onPropagateUp) {
              props.onPropagateUp({
                originalEvent: event,
                check: false,
                selectionKeys: selectionKeys
              });
            }
            if (props.onUnselect) {
              props.onUnselect({
                originalEvent: event,
                node: props.node
              });
            }
          } else {
            if (props.propagateSelectionDown) propagateDown(props.node, true, selectionKeys);else selectionKeys[props.node.key] = {
              checked: true
            };
            if (props.propagateSelectionUp && props.onPropagateUp) {
              props.onPropagateUp({
                originalEvent: event,
                check: true,
                selectionKeys: selectionKeys
              });
            }
            if (props.onSelect) {
              props.onSelect({
                originalEvent: event,
                node: props.node
              });
            }
          }
        } else {
          var selected = isSelected();
          var metaSelection = nodeTouched.current ? false : props.metaKeySelection;
          if (metaSelection) {
            var metaKey = event.metaKey || event.ctrlKey;
            if (selected && metaKey) {
              if (isSingleSelectionMode()) {
                selectionKeys = null;
              } else {
                selectionKeys = _objectSpread$1({}, props.selectionKeys);
                delete selectionKeys[props.node.key];
              }
              if (props.onUnselect) {
                props.onUnselect({
                  originalEvent: event,
                  node: props.node
                });
              }
            } else {
              if (isSingleSelectionMode()) {
                selectionKeys = props.node.key;
              } else if (isMultipleSelectionMode()) {
                selectionKeys = !metaKey ? {} : props.selectionKeys ? _objectSpread$1({}, props.selectionKeys) : {};
                selectionKeys[props.node.key] = true;
              }
              if (props.onSelect) {
                props.onSelect({
                  originalEvent: event,
                  node: props.node
                });
              }
            }
          } else {
            if (isSingleSelectionMode()) {
              if (selected) {
                selectionKeys = null;
                if (props.onUnselect) {
                  props.onUnselect({
                    originalEvent: event,
                    node: props.node
                  });
                }
              } else {
                selectionKeys = props.node.key;
                if (props.onSelect) {
                  props.onSelect({
                    originalEvent: event,
                    node: props.node
                  });
                }
              }
            } else {
              if (selected) {
                selectionKeys = _objectSpread$1({}, props.selectionKeys);
                delete selectionKeys[props.node.key];
                if (props.onUnselect) {
                  props.onUnselect({
                    originalEvent: event,
                    node: props.node
                  });
                }
              } else {
                selectionKeys = props.selectionKeys ? _objectSpread$1({}, props.selectionKeys) : {};
                selectionKeys[props.node.key] = true;
                if (props.onSelect) {
                  props.onSelect({
                    originalEvent: event,
                    node: props.node
                  });
                }
              }
            }
          }
        }
        if (props.onSelectionChange) {
          props.onSelectionChange({
            originalEvent: event,
            value: selectionKeys
          });
        }
      }
      nodeTouched.current = false;
    };
    var onDoubleClick = function onDoubleClick(event) {
      if (props.onDoubleClick) {
        props.onDoubleClick({
          originalEvent: event,
          node: props.node
        });
      }
    };
    var onRightClick = function onRightClick(event) {
      if (props.disabled) {
        return;
      }
      utils.DomHandler.clearSelection();
      if (props.onContextMenuSelectionChange) {
        props.onContextMenuSelectionChange({
          originalEvent: event,
          value: props.node.key
        });
      }
      if (props.onContextMenu) {
        props.onContextMenu({
          originalEvent: event,
          node: props.node
        });
      }
    };
    var propagateUp = function propagateUp(event) {
      var check = event.check;
      var selectionKeys = event.selectionKeys;
      var checkedChildCount = 0;
      var childPartialSelected = false;
      var _iterator = _createForOfIteratorHelper$1(props.node.children),
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
      if (check && checkedChildCount === props.node.children.length) {
        selectionKeys[props.node.key] = {
          checked: true,
          partialChecked: false
        };
      } else {
        if (!check) {
          delete selectionKeys[props.node.key];
        }
        if (childPartialSelected || checkedChildCount > 0 && checkedChildCount !== props.node.children.length) selectionKeys[props.node.key] = {
          checked: false,
          partialChecked: true
        };else delete selectionKeys[props.node.key];
      }
      if (props.propagateSelectionUp && props.onPropagateUp) {
        props.onPropagateUp(event);
      }
    };
    var propagateDown = function propagateDown(node, check, selectionKeys) {
      if (check) selectionKeys[node.key] = {
        checked: true,
        partialChecked: false
      };else delete selectionKeys[node.key];
      if (node.children && node.children.length) {
        for (var i = 0; i < node.children.length; i++) {
          propagateDown(node.children[i], check, selectionKeys);
        }
      }
    };
    var isSelected = function isSelected() {
      if (props.selectionMode && props.selectionKeys) return isSingleSelectionMode() ? props.selectionKeys === props.node.key : props.selectionKeys[props.node.key] !== undefined;else return false;
    };
    var isChecked = function isChecked() {
      return props.selectionKeys ? props.selectionKeys[props.node.key] && props.selectionKeys[props.node.key].checked : false;
    };
    var isPartialChecked = function isPartialChecked() {
      return props.selectionKeys ? props.selectionKeys[props.node.key] && props.selectionKeys[props.node.key].partialChecked : false;
    };
    var isSingleSelectionMode = function isSingleSelectionMode() {
      return props.selectionMode && props.selectionMode === 'single';
    };
    var isMultipleSelectionMode = function isMultipleSelectionMode() {
      return props.selectionMode && props.selectionMode === 'multiple';
    };
    var isCheckboxSelectionMode = function isCheckboxSelectionMode() {
      return props.selectionMode && props.selectionMode === 'checkbox';
    };
    var onTouchEnd = function onTouchEnd() {
      nodeTouched.current = true;
    };
    var onDropPoint = function onDropPoint(event, position) {
      event.preventDefault();
      if (props.node.droppable !== false) {
        utils.DomHandler.removeClass(event.target, 'p-treenode-droppoint-active');
        if (props.onDropPoint) {
          var dropIndex = position === -1 ? props.index : props.index + 1;
          props.onDropPoint({
            originalEvent: event,
            path: props.path,
            index: dropIndex,
            position: position
          });
        }
      }
    };
    var onDropPointDragOver = function onDropPointDragOver(event) {
      if (event.dataTransfer.types[1] === props.dragdropScope.toLocaleLowerCase()) {
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();
      }
    };
    var onDropPointDragEnter = function onDropPointDragEnter(event) {
      if (event.dataTransfer.types[1] === props.dragdropScope.toLocaleLowerCase()) {
        utils.DomHandler.addClass(event.target, 'p-treenode-droppoint-active');
      }
    };
    var onDropPointDragLeave = function onDropPointDragLeave(event) {
      if (event.dataTransfer.types[1] === props.dragdropScope.toLocaleLowerCase()) {
        utils.DomHandler.removeClass(event.target, 'p-treenode-droppoint-active');
      }
    };
    var onDrop = function onDrop(event) {
      if (props.dragdropScope && props.node.droppable !== false) {
        utils.DomHandler.removeClass(contentRef.current, 'p-treenode-dragover');
        event.preventDefault();
        event.stopPropagation();
        if (props.onDrop) {
          props.onDrop({
            originalEvent: event,
            path: props.path,
            index: props.index
          });
        }
      }
    };
    var onDragOver = function onDragOver(event) {
      if (event.dataTransfer.types[1] === props.dragdropScope.toLocaleLowerCase() && props.node.droppable !== false) {
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();
        event.stopPropagation();
      }
    };
    var onDragEnter = function onDragEnter(event) {
      if (event.dataTransfer.types[1] === props.dragdropScope.toLocaleLowerCase() && props.node.droppable !== false) {
        utils.DomHandler.addClass(contentRef.current, 'p-treenode-dragover');
      }
    };
    var onDragLeave = function onDragLeave(event) {
      if (event.dataTransfer.types[1] === props.dragdropScope.toLocaleLowerCase() && props.node.droppable !== false) {
        var rect = event.currentTarget.getBoundingClientRect();
        if (event.nativeEvent.x > rect.left + rect.width || event.nativeEvent.x < rect.left || event.nativeEvent.y >= Math.floor(rect.top + rect.height) || event.nativeEvent.y < rect.top) {
          utils.DomHandler.removeClass(contentRef.current, 'p-treenode-dragover');
        }
      }
    };
    var onDragStart = function onDragStart(event) {
      event.dataTransfer.setData('text', props.dragdropScope);
      event.dataTransfer.setData(props.dragdropScope, props.dragdropScope);
      if (props.onDragStart) {
        props.onDragStart({
          originalEvent: event,
          path: props.path,
          index: props.index
        });
      }
    };
    var onDragEnd = function onDragEnd(event) {
      if (props.onDragEnd) {
        props.onDragEnd({
          originalEvent: event
        });
      }
    };
    var createLabel = function createLabel() {
      var content = /*#__PURE__*/React__namespace.createElement("span", {
        className: "p-treenode-label"
      }, props.node.label);
      if (props.nodeTemplate) {
        var defaultContentOptions = {
          onTogglerClick: onTogglerClick,
          className: 'p-treenode-label',
          element: content,
          props: props,
          expanded: expanded
        };
        content = utils.ObjectUtils.getJSXElement(props.nodeTemplate, props.node, defaultContentOptions);
      }
      return content;
    };
    var createCheckbox = function createCheckbox() {
      if (isCheckboxSelectionMode() && props.node.selectable !== false) {
        var checked = isChecked();
        var partialChecked = isPartialChecked();
        var className = utils.classNames('p-checkbox-box', {
          'p-highlight': checked,
          'p-indeterminate': partialChecked,
          'p-disabled': props.disabled
        });
        var icon = utils.classNames('p-checkbox-icon p-c', {
          'pi pi-check': checked,
          'pi pi-minus': partialChecked
        });
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-checkbox p-component"
        }, /*#__PURE__*/React__namespace.createElement("div", {
          className: className,
          role: "checkbox",
          "aria-checked": checked
        }, /*#__PURE__*/React__namespace.createElement("span", {
          className: icon
        })));
      }
      return null;
    };
    var createIcon = function createIcon() {
      var icon = props.node.icon || (expanded ? props.node.expandedIcon : props.node.collapsedIcon);
      if (icon) {
        var className = utils.classNames('p-treenode-icon', icon);
        return /*#__PURE__*/React__namespace.createElement("span", {
          className: className
        });
      }
      return null;
    };
    var createToggler = function createToggler() {
      var label = expanded ? api.ariaLabel('collapseLabel') : api.ariaLabel('expandLabel');
      var iconClassName = utils.classNames('p-tree-toggler-icon pi pi-fw', {
        'pi-chevron-right': !expanded,
        'pi-chevron-down': expanded
      });
      var content = /*#__PURE__*/React__namespace.createElement("button", {
        type: "button",
        className: "p-tree-toggler p-link",
        tabIndex: -1,
        onClick: onTogglerClick,
        "aria-label": label
      }, /*#__PURE__*/React__namespace.createElement("span", {
        className: iconClassName,
        "aria-hidden": "true"
      }), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
      if (props.togglerTemplate) {
        var defaultContentOptions = {
          onClick: onTogglerClick,
          containerClassName: 'p-tree-toggler p-link',
          iconClassName: 'p-tree-toggler-icon',
          element: content,
          props: props,
          expanded: expanded
        };
        content = utils.ObjectUtils.getJSXElement(props.togglerTemplate, props.node, defaultContentOptions);
      }
      return content;
    };
    var createDropPoint = function createDropPoint(position) {
      if (props.dragdropScope) {
        return /*#__PURE__*/React__namespace.createElement("li", {
          className: "p-treenode-droppoint",
          onDrop: function onDrop(event) {
            return onDropPoint(event, position);
          },
          onDragOver: onDropPointDragOver,
          onDragEnter: onDropPointDragEnter,
          onDragLeave: onDropPointDragLeave
        });
      }
      return null;
    };
    var createContent = function createContent() {
      var selected = isSelected();
      var checked = isChecked();
      var className = utils.classNames('p-treenode-content', props.node.className, {
        'p-treenode-selectable': props.selectionMode && props.node.selectable !== false,
        'p-highlight': isCheckboxSelectionMode() ? checked : selected,
        'p-highlight-contextmenu': props.contextMenuSelectionKey && props.contextMenuSelectionKey === props.node.key,
        'p-disabled': props.disabled
      });
      var toggler = createToggler();
      var checkbox = createCheckbox();
      var icon = createIcon();
      var label = createLabel();
      var tabIndex = props.disabled ? undefined : 0;
      return /*#__PURE__*/React__namespace.createElement("div", {
        ref: contentRef,
        className: className,
        style: props.node.style,
        onClick: onClick,
        onDoubleClick: onDoubleClick,
        onContextMenu: onRightClick,
        onTouchEnd: onTouchEnd,
        draggable: props.dragdropScope && props.node.draggable !== false && !props.disabled,
        onDrop: onDrop,
        onDragOver: onDragOver,
        onDragEnter: onDragEnter,
        onDragLeave: onDragLeave,
        onDragStart: onDragStart,
        onDragEnd: onDragEnd,
        tabIndex: tabIndex,
        onKeyDown: onNodeKeyDown,
        role: "treeitem",
        "aria-posinset": props.index + 1,
        "aria-expanded": expanded,
        "aria-selected": checked || selected
      }, toggler, checkbox, icon, label);
    };
    var createChildren = function createChildren() {
      if (utils.ObjectUtils.isNotEmpty(props.node.children) && expanded) {
        return /*#__PURE__*/React__namespace.createElement("ul", {
          className: "p-treenode-children",
          role: "group"
        }, props.node.children.map(function (childNode, index) {
          return /*#__PURE__*/React__namespace.createElement(UITreeNode, {
            key: childNode.key || childNode.label,
            node: childNode,
            parent: props.node,
            index: index,
            last: index === props.node.children.length - 1,
            path: props.path + '-' + index,
            disabled: props.disabled,
            selectionMode: props.selectionMode,
            selectionKeys: props.selectionKeys,
            onSelectionChange: props.onSelectionChange,
            metaKeySelection: props.metaKeySelection,
            propagateSelectionDown: props.propagateSelectionDown,
            propagateSelectionUp: props.propagateSelectionUp,
            contextMenuSelectionKey: props.contextMenuSelectionKey,
            onContextMenuSelectionChange: props.onContextMenuSelectionChange,
            onContextMenu: props.onContextMenu,
            onExpand: props.onExpand,
            onCollapse: props.onCollapse,
            onSelect: props.onSelect,
            onUnselect: props.onUnselect,
            onClick: props.onClick,
            onDoubleClick: props.onDoubleClick,
            expandedKeys: props.expandedKeys,
            onToggle: props.onToggle,
            onPropagateUp: propagateUp,
            nodeTemplate: props.nodeTemplate,
            togglerTemplate: props.togglerTemplate,
            isNodeLeaf: props.isNodeLeaf,
            dragdropScope: props.dragdropScope,
            onDragStart: props.onDragStart,
            onDragEnd: props.onDragEnd,
            onDrop: props.onDrop,
            onDropPoint: props.onDropPoint
          });
        }));
      }
      return null;
    };
    var createNode = function createNode() {
      var className = utils.classNames('p-treenode', {
        'p-treenode-leaf': isLeaf
      }, props.node.className);
      var content = createContent();
      var children = createChildren();
      return /*#__PURE__*/React__namespace.createElement("li", {
        className: className,
        style: props.node.style
      }, content, children);
    };
    var node = createNode();
    if (props.dragdropScope && !props.disabled) {
      var beforeDropPoint = createDropPoint(-1);
      var afterDropPoint = props.last ? createDropPoint(1) : null;
      return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, beforeDropPoint, node, afterDropPoint);
    }
    return node;
  });
  UITreeNode.displayName = 'UITreeNode';

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  var Tree = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var props = TreeBase.getProps(inProps);
    var _React$useState = React__namespace.useState(''),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      filterValueState = _React$useState2[0],
      setFilterValueState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(props.expandedKeys),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      expandedKeysState = _React$useState4[0],
      setExpandedKeysState = _React$useState4[1];
    var elementRef = React__namespace.useRef(null);
    var filteredNodes = React__namespace.useRef([]);
    var dragState = React__namespace.useRef(null);
    var filterChanged = React__namespace.useRef(false);
    var filteredValue = props.onFilterValueChange ? props.filterValue : filterValueState;
    var expandedKeys = props.onToggle ? props.expandedKeys : expandedKeysState;
    var filterOptions = {
      filter: function filter(e) {
        return onFilterInputChange(e);
      },
      reset: function reset() {
        return resetFilter();
      }
    };
    var getRootNode = function getRootNode() {
      return props.filter && filteredNodes.current ? filteredNodes.current : props.value;
    };
    var onToggle = function onToggle(event) {
      if (props.onToggle) {
        props.onToggle(event);
      } else {
        setExpandedKeysState(event.value);
      }
    };
    var onDragStart = function onDragStart(event) {
      dragState.current = {
        path: event.path,
        index: event.index
      };
    };
    var onDragEnd = function onDragEnd() {
      dragState.current = null;
    };
    var onDrop = function onDrop(event) {
      if (validateDropNode(dragState.current.path, event.path)) {
        var value = JSON.parse(JSON.stringify(props.value));
        var dragPaths = dragState.current.path.split('-');
        dragPaths.pop();
        var dragNodeParent = findNode(value, dragPaths);
        var dragNode = dragNodeParent ? dragNodeParent.children[dragState.current.index] : value[dragState.current.index];
        var dropNode = findNode(value, event.path.split('-'));
        if (dropNode.children) dropNode.children.push(dragNode);else dropNode.children = [dragNode];
        if (dragNodeParent) dragNodeParent.children.splice(dragState.current.index, 1);else value.splice(dragState.current.index, 1);
        if (props.onDragDrop) {
          props.onDragDrop({
            originalEvent: event.originalEvent,
            value: value,
            dragNode: dragNode,
            dropNode: dropNode,
            dropIndex: event.index
          });
        }
      }
    };
    var onDropPoint = function onDropPoint(event) {
      if (validateDropPoint(event)) {
        var value = JSON.parse(JSON.stringify(props.value));
        var dragPaths = dragState.current.path.split('-');
        dragPaths.pop();
        var dropPaths = event.path.split('-');
        dropPaths.pop();
        var dragNodeParent = findNode(value, dragPaths);
        var dropNodeParent = findNode(value, dropPaths);
        var dragNode = dragNodeParent ? dragNodeParent.children[dragState.current.index] : value[dragState.current.index];
        var siblings = areSiblings(dragState.current.path, event.path);
        if (dragNodeParent) dragNodeParent.children.splice(dragState.current.index, 1);else value.splice(dragState.current.index, 1);
        if (event.position < 0) {
          var dropIndex = siblings ? dragState.current.index > event.index ? event.index : event.index - 1 : event.index;
          if (dropNodeParent) dropNodeParent.children.splice(dropIndex, 0, dragNode);else value.splice(dropIndex, 0, dragNode);
        } else {
          if (dropNodeParent) dropNodeParent.children.push(dragNode);else value.push(dragNode);
        }
        if (props.onDragDrop) {
          props.onDragDrop({
            originalEvent: event.originalEvent,
            value: value,
            dragNode: dragNode,
            dropNode: dropNodeParent,
            dropIndex: event.index
          });
        }
      }
    };
    var validateDrop = function validateDrop(dragPath, dropPath) {
      if (!dragPath) {
        return false;
      } else {
        //same node
        if (dragPath === dropPath) {
          return false;
        }

        //parent dropped on an descendant
        if (dropPath.indexOf(dragPath) === 0) {
          return false;
        }
        return true;
      }
    };
    var validateDropNode = function validateDropNode(dragPath, dropPath) {
      var _validateDrop = validateDrop(dragPath, dropPath);
      if (_validateDrop) {
        //child dropped on parent
        if (dragPath.indexOf('-') > 0 && dragPath.substring(0, dragPath.lastIndexOf('-')) === dropPath) {
          return false;
        }
        return true;
      } else {
        return false;
      }
    };
    var validateDropPoint = function validateDropPoint(event) {
      var _validateDrop = validateDrop(dragState.current.path, event.path);
      if (_validateDrop) {
        //child dropped to next sibling's drop point
        if (event.position === -1 && areSiblings(dragState.current.path, event.path) && dragState.current.index + 1 === event.index) {
          return false;
        }
        return true;
      } else {
        return false;
      }
    };
    var areSiblings = function areSiblings(path1, path2) {
      if (path1.length === 1 && path2.length === 1) return true;else return path1.substring(0, path1.lastIndexOf('-')) === path2.substring(0, path2.lastIndexOf('-'));
    };
    var findNode = function findNode(value, path) {
      if (path.length === 0) {
        return null;
      } else {
        var index = parseInt(path[0], 10);
        var nextSearchRoot = value.children ? value.children[index] : value[index];
        if (path.length === 1) {
          return nextSearchRoot;
        } else {
          path.shift();
          return findNode(nextSearchRoot, path);
        }
      }
    };
    var isNodeLeaf = function isNodeLeaf(node) {
      return node.leaf === false ? false : !(node.children && node.children.length);
    };
    var onFilterInputKeyDown = function onFilterInputKeyDown(event) {
      //enter
      if (event.which === 13) {
        event.preventDefault();
      }
    };
    var onFilterInputChange = function onFilterInputChange(event) {
      filterChanged.current = true;
      var value = event.target.value;
      if (props.onFilterValueChange) {
        props.onFilterValueChange({
          originalEvent: event,
          value: value
        });
      } else {
        setFilterValueState(value);
      }
    };
    var filter = function filter(value) {
      setFilterValueState(utils.ObjectUtils.isNotEmpty(value) ? value : '');
      _filter();
    };
    var _filter = function _filter() {
      if (!filterChanged.current) {
        return;
      }
      if (utils.ObjectUtils.isEmpty(filteredValue)) {
        filteredNodes.current = props.value;
      } else {
        filteredNodes.current = [];
        var searchFields = props.filterBy.split(',');
        var filterText = filteredValue.toLocaleLowerCase(props.filterLocale);
        var isStrictMode = props.filterMode === 'strict';
        var _iterator = _createForOfIteratorHelper(props.value),
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
            if (isStrictMode && (findFilteredNodes(copyNode, paramsWithoutNode) || isFilterMatched(copyNode, paramsWithoutNode)) || !isStrictMode && (isFilterMatched(copyNode, paramsWithoutNode) || findFilteredNodes(copyNode, paramsWithoutNode))) {
              filteredNodes.current.push(copyNode);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      filterChanged.current = false;
    };
    var findFilteredNodes = function findFilteredNodes(node, paramsWithoutNode) {
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
              if (isFilterMatched(copyChildNode, paramsWithoutNode)) {
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
    };
    var isFilterMatched = function isFilterMatched(node, _ref) {
      var searchFields = _ref.searchFields,
        filterText = _ref.filterText,
        isStrictMode = _ref.isStrictMode;
      var matched = false;
      var _iterator3 = _createForOfIteratorHelper(searchFields),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var field = _step3.value;
          var fieldValue = String(utils.ObjectUtils.resolveFieldData(node, field)).toLocaleLowerCase(props.filterLocale);
          if (fieldValue.indexOf(filterText) > -1) {
            matched = true;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      if (!matched || isStrictMode && !isNodeLeaf(node)) {
        matched = findFilteredNodes(node, {
          searchFields: searchFields,
          filterText: filterText,
          isStrictMode: isStrictMode
        }) || matched;
      }
      return matched;
    };
    var resetFilter = function resetFilter() {
      setFilterValueState('');
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        filter: filter,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    var createRootChild = function createRootChild(node, index, last) {
      return /*#__PURE__*/React__namespace.createElement(UITreeNode, {
        key: node.key || node.label,
        node: node,
        index: index,
        last: last,
        path: String(index),
        disabled: props.disabled,
        selectionMode: props.selectionMode,
        selectionKeys: props.selectionKeys,
        onSelectionChange: props.onSelectionChange,
        metaKeySelection: props.metaKeySelection,
        contextMenuSelectionKey: props.contextMenuSelectionKey,
        onContextMenuSelectionChange: props.onContextMenuSelectionChange,
        onContextMenu: props.onContextMenu,
        propagateSelectionDown: props.propagateSelectionDown,
        propagateSelectionUp: props.propagateSelectionUp,
        onExpand: props.onExpand,
        onCollapse: props.onCollapse,
        onSelect: props.onSelect,
        onUnselect: props.onUnselect,
        expandedKeys: expandedKeys,
        onToggle: onToggle,
        nodeTemplate: props.nodeTemplate,
        togglerTemplate: props.togglerTemplate,
        isNodeLeaf: isNodeLeaf,
        dragdropScope: props.dragdropScope,
        onDragStart: onDragStart,
        onDragEnd: onDragEnd,
        onDrop: onDrop,
        onDropPoint: onDropPoint,
        onClick: props.onNodeClick,
        onDoubleClick: props.onNodeDoubleClick
      });
    };
    var createRootChildren = function createRootChildren() {
      if (props.filter) {
        filterChanged.current = true;
        _filter();
      }
      var value = getRootNode();
      return value.map(function (node, index) {
        return createRootChild(node, index, index === value.length - 1);
      });
    };
    var createModel = function createModel() {
      if (props.value) {
        var rootNodes = createRootChildren();
        var contentClass = utils.classNames('p-tree-container', props.contentClassName);
        return /*#__PURE__*/React__namespace.createElement("ul", _extends({
          className: contentClass,
          role: "tree",
          style: props.contentStyle
        }, ariaProps), rootNodes);
      }
      return null;
    };
    var createLoader = function createLoader() {
      if (props.loading) {
        var icon = utils.classNames('p-tree-loading-icon pi-spin', props.loadingIcon);
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-tree-loading-overlay p-component-overlay"
        }, /*#__PURE__*/React__namespace.createElement("i", {
          className: icon
        }));
      }
      return null;
    };
    var createFilter = function createFilter() {
      if (props.filter) {
        var value = utils.ObjectUtils.isNotEmpty(filteredValue) ? filteredValue : '';
        var _content = /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-tree-filter-container"
        }, /*#__PURE__*/React__namespace.createElement("input", {
          type: "text",
          value: value,
          autoComplete: "off",
          className: "p-tree-filter p-inputtext p-component",
          placeholder: props.filterPlaceholder,
          onKeyDown: onFilterInputKeyDown,
          onChange: onFilterInputChange,
          disabled: props.disabled
        }), /*#__PURE__*/React__namespace.createElement("span", {
          className: "p-tree-filter-icon pi pi-search"
        }));
        if (props.filterTemplate) {
          var defaultContentOptions = {
            className: 'p-tree-filter-container',
            element: _content,
            filterOptions: filterOptions,
            filterInputKeyDown: onFilterInputKeyDown,
            filterInputChange: onFilterInputChange,
            filterIconClassName: 'p-dropdown-filter-icon pi pi-search',
            props: props
          };
          _content = utils.ObjectUtils.getJSXElement(props.filterTemplate, defaultContentOptions);
        }
        return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, _content);
      }
      return null;
    };
    var createHeader = function createHeader() {
      if (props.showHeader) {
        var filterElement = createFilter();
        var _content2 = filterElement;
        if (props.header) {
          var defaultContentOptions = {
            filterContainerClassName: 'p-tree-filter-container',
            filterIconClasssName: 'p-tree-filter-icon pi pi-search',
            filterInput: {
              className: 'p-tree-filter p-inputtext p-component',
              onKeyDown: onFilterInputKeyDown,
              onChange: onFilterInputChange
            },
            filterElement: filterElement,
            element: _content2,
            props: props
          };
          _content2 = utils.ObjectUtils.getJSXElement(props.header, defaultContentOptions);
        }
        return /*#__PURE__*/React__namespace.createElement("div", {
          className: "p-tree-header"
        }, _content2);
      }
      return null;
    };
    var createFooter = function createFooter() {
      var content = utils.ObjectUtils.getJSXElement(props.footer, props);
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-tree-footer"
      }, content);
    };
    var otherProps = TreeBase.getOtherProps(props);
    var ariaProps = utils.ObjectUtils.reduceKeys(otherProps, utils.DomHandler.ARIA_PROPS);
    var className = utils.classNames('p-tree p-component', props.className, {
      'p-tree-selectable': props.selectionMode,
      'p-tree-loading': props.loading,
      'p-disabled': props.disabled
    });
    var loader = createLoader();
    var content = createModel();
    var header = createHeader();
    var footer = createFooter();
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      id: props.id,
      ref: elementRef,
      className: className,
      style: props.style
    }, otherProps), loader, header, content, footer);
  }));
  Tree.displayName = 'Tree';

  exports.Tree = Tree;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.utils, primereact.api, primereact.ripple);

