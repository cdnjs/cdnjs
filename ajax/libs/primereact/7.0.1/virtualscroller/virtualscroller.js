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
