this.primevue = this.primevue || {};
this.primevue.virtualscroller = (function (SpinnerIcon, utils, BaseComponent, VirtualScrollerStyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var SpinnerIcon__default = /*#__PURE__*/_interopDefaultLegacy(SpinnerIcon);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var VirtualScrollerStyle__default = /*#__PURE__*/_interopDefaultLegacy(VirtualScrollerStyle);

    var script$1 = {
      name: 'BaseVirtualScroller',
      "extends": BaseComponent__default["default"],
      props: {
        id: {
          type: String,
          "default": null
        },
        style: null,
        "class": null,
        items: {
          type: Array,
          "default": null
        },
        itemSize: {
          type: [Number, Array],
          "default": 0
        },
        scrollHeight: null,
        scrollWidth: null,
        orientation: {
          type: String,
          "default": 'vertical'
        },
        numToleratedItems: {
          type: Number,
          "default": null
        },
        delay: {
          type: Number,
          "default": 0
        },
        resizeDelay: {
          type: Number,
          "default": 10
        },
        lazy: {
          type: Boolean,
          "default": false
        },
        disabled: {
          type: Boolean,
          "default": false
        },
        loaderDisabled: {
          type: Boolean,
          "default": false
        },
        columns: {
          type: Array,
          "default": null
        },
        loading: {
          type: Boolean,
          "default": false
        },
        showSpacer: {
          type: Boolean,
          "default": true
        },
        showLoader: {
          type: Boolean,
          "default": false
        },
        tabindex: {
          type: Number,
          "default": 0
        },
        inline: {
          type: Boolean,
          "default": false
        },
        step: {
          type: Number,
          "default": 0
        },
        appendOnly: {
          type: Boolean,
          "default": false
        },
        autoSize: {
          type: Boolean,
          "default": false
        }
      },
      style: VirtualScrollerStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      },
      beforeMount: function beforeMount() {
        var _this$$config;
        VirtualScrollerStyle__default["default"].loadStyle({
          nonce: (_this$$config = this.$config) === null || _this$$config === void 0 || (_this$$config = _this$$config.csp) === null || _this$$config === void 0 ? void 0 : _this$$config.nonce
        });
      }
    };

    function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
    function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
    function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
    function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
    var script = {
      name: 'VirtualScroller',
      "extends": script$1,
      inheritAttrs: false,
      emits: ['update:numToleratedItems', 'scroll', 'scroll-index-change', 'lazy-load'],
      data: function data() {
        var both = this.isBoth();
        return {
          first: both ? {
            rows: 0,
            cols: 0
          } : 0,
          last: both ? {
            rows: 0,
            cols: 0
          } : 0,
          page: both ? {
            rows: 0,
            cols: 0
          } : 0,
          numItemsInViewport: both ? {
            rows: 0,
            cols: 0
          } : 0,
          lastScrollPos: both ? {
            top: 0,
            left: 0
          } : 0,
          d_numToleratedItems: this.numToleratedItems,
          d_loading: this.loading,
          loaderArr: [],
          spacerStyle: {},
          contentStyle: {}
        };
      },
      element: null,
      content: null,
      lastScrollPos: null,
      scrollTimeout: null,
      resizeTimeout: null,
      defaultWidth: 0,
      defaultHeight: 0,
      defaultContentWidth: 0,
      defaultContentHeight: 0,
      isRangeChanged: false,
      lazyLoadState: {},
      resizeListener: null,
      initialized: false,
      watch: {
        numToleratedItems: function numToleratedItems(newValue) {
          this.d_numToleratedItems = newValue;
        },
        loading: function loading(newValue, oldValue) {
          if (this.lazy && newValue !== oldValue && newValue !== this.d_loading) {
            this.d_loading = newValue;
          }
        },
        items: function items(newValue, oldValue) {
          if (!oldValue || oldValue.length !== (newValue || []).length) {
            this.init();
            this.calculateAutoSize();
          }
        },
        itemSize: function itemSize() {
          this.init();
          this.calculateAutoSize();
        },
        orientation: function orientation() {
          this.lastScrollPos = this.isBoth() ? {
            top: 0,
            left: 0
          } : 0;
        },
        scrollHeight: function scrollHeight() {
          this.init();
          this.calculateAutoSize();
        },
        scrollWidth: function scrollWidth() {
          this.init();
          this.calculateAutoSize();
        }
      },
      mounted: function mounted() {
        this.viewInit();
        this.lastScrollPos = this.isBoth() ? {
          top: 0,
          left: 0
        } : 0;
        this.lazyLoadState = this.lazyLoadState || {};
      },
      updated: function updated() {
        !this.initialized && this.viewInit();
      },
      unmounted: function unmounted() {
        this.unbindResizeListener();
        this.initialized = false;
      },
      methods: {
        viewInit: function viewInit() {
          if (utils.DomHandler.isVisible(this.element)) {
            this.setContentEl(this.content);
            this.init();
            this.calculateAutoSize();
            this.bindResizeListener();
            this.defaultWidth = utils.DomHandler.getWidth(this.element);
            this.defaultHeight = utils.DomHandler.getHeight(this.element);
            this.defaultContentWidth = utils.DomHandler.getWidth(this.content);
            this.defaultContentHeight = utils.DomHandler.getHeight(this.content);
            this.initialized = true;
          }
        },
        init: function init() {
          if (!this.disabled) {
            this.setSize();
            this.calculateOptions();
            this.setSpacerSize();
          }
        },
        isVertical: function isVertical() {
          return this.orientation === 'vertical';
        },
        isHorizontal: function isHorizontal() {
          return this.orientation === 'horizontal';
        },
        isBoth: function isBoth() {
          return this.orientation === 'both';
        },
        scrollTo: function scrollTo(options) {
          //this.lastScrollPos = this.both ? { top: 0, left: 0 } : 0;
          this.element && this.element.scrollTo(options);
        },
        scrollToIndex: function scrollToIndex(index) {
          var _this = this;
          var behavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'auto';
          var both = this.isBoth();
          var horizontal = this.isHorizontal();
          var valid = both ? index.every(function (i) {
            return i > -1;
          }) : index > -1;
          if (valid) {
            var first = this.first;
            var _this$element = this.element,
              _this$element$scrollT = _this$element.scrollTop,
              scrollTop = _this$element$scrollT === void 0 ? 0 : _this$element$scrollT,
              _this$element$scrollL = _this$element.scrollLeft,
              scrollLeft = _this$element$scrollL === void 0 ? 0 : _this$element$scrollL;
            var _this$calculateNumIte = this.calculateNumItems(),
              numToleratedItems = _this$calculateNumIte.numToleratedItems;
            var contentPos = this.getContentPosition();
            var itemSize = this.itemSize;
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
              return _this.scrollTo({
                left: left,
                top: top,
                behavior: behavior
              });
            };
            var newFirst = both ? {
              rows: 0,
              cols: 0
            } : 0;
            var isRangeChanged = false,
              isScrollChanged = false;
            if (both) {
              newFirst = {
                rows: calculateFirst(index[0], numToleratedItems[0]),
                cols: calculateFirst(index[1], numToleratedItems[1])
              };
              scrollTo(calculateCoord(newFirst.cols, itemSize[1], contentPos.left), calculateCoord(newFirst.rows, itemSize[0], contentPos.top));
              isScrollChanged = this.lastScrollPos.top !== scrollTop || this.lastScrollPos.left !== scrollLeft;
              isRangeChanged = newFirst.rows !== first.rows || newFirst.cols !== first.cols;
            } else {
              newFirst = calculateFirst(index, numToleratedItems);
              horizontal ? scrollTo(calculateCoord(newFirst, itemSize, contentPos.left), scrollTop) : scrollTo(scrollLeft, calculateCoord(newFirst, itemSize, contentPos.top));
              isScrollChanged = this.lastScrollPos !== (horizontal ? scrollLeft : scrollTop);
              isRangeChanged = newFirst !== first;
            }
            this.isRangeChanged = isRangeChanged;
            isScrollChanged && (this.first = newFirst);
          }
        },
        scrollInView: function scrollInView(index, to) {
          var _this2 = this;
          var behavior = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'auto';
          if (to) {
            var both = this.isBoth();
            var horizontal = this.isHorizontal();
            var valid = both ? index.every(function (i) {
              return i > -1;
            }) : index > -1;
            if (valid) {
              var _this$getRenderedRang = this.getRenderedRange(),
                first = _this$getRenderedRang.first,
                viewport = _this$getRenderedRang.viewport;
              var scrollTo = function scrollTo() {
                var left = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
                var top = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                return _this2.scrollTo({
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
                    scrollTo(viewport.first.cols * this.itemSize[1], (viewport.first.rows - 1) * this.itemSize[0]);
                  } else if (viewport.first.cols - first.cols > index[1]) {
                    scrollTo((viewport.first.cols - 1) * this.itemSize[1], viewport.first.rows * this.itemSize[0]);
                  }
                } else {
                  if (viewport.first - first > index) {
                    var pos = (viewport.first - 1) * this.itemSize;
                    horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
                  }
                }
              } else if (isToEnd) {
                if (both) {
                  if (viewport.last.rows - first.rows <= index[0] + 1) {
                    scrollTo(viewport.first.cols * this.itemSize[1], (viewport.first.rows + 1) * this.itemSize[0]);
                  } else if (viewport.last.cols - first.cols <= index[1] + 1) {
                    scrollTo((viewport.first.cols + 1) * this.itemSize[1], viewport.first.rows * this.itemSize[0]);
                  }
                } else {
                  if (viewport.last - first <= index + 1) {
                    var _pos2 = (viewport.first + 1) * this.itemSize;
                    horizontal ? scrollTo(_pos2, 0) : scrollTo(0, _pos2);
                  }
                }
              }
            }
          } else {
            this.scrollToIndex(index, behavior);
          }
        },
        getRenderedRange: function getRenderedRange() {
          var calculateFirstInViewport = function calculateFirstInViewport(_pos, _size) {
            return Math.floor(_pos / (_size || _pos));
          };
          var firstInViewport = this.first;
          var lastInViewport = 0;
          if (this.element) {
            var both = this.isBoth();
            var horizontal = this.isHorizontal();
            var _this$element2 = this.element,
              scrollTop = _this$element2.scrollTop,
              scrollLeft = _this$element2.scrollLeft;
            if (both) {
              firstInViewport = {
                rows: calculateFirstInViewport(scrollTop, this.itemSize[0]),
                cols: calculateFirstInViewport(scrollLeft, this.itemSize[1])
              };
              lastInViewport = {
                rows: firstInViewport.rows + this.numItemsInViewport.rows,
                cols: firstInViewport.cols + this.numItemsInViewport.cols
              };
            } else {
              var scrollPos = horizontal ? scrollLeft : scrollTop;
              firstInViewport = calculateFirstInViewport(scrollPos, this.itemSize);
              lastInViewport = firstInViewport + this.numItemsInViewport;
            }
          }
          return {
            first: this.first,
            last: this.last,
            viewport: {
              first: firstInViewport,
              last: lastInViewport
            }
          };
        },
        calculateNumItems: function calculateNumItems() {
          var both = this.isBoth();
          var horizontal = this.isHorizontal();
          var itemSize = this.itemSize;
          var contentPos = this.getContentPosition();
          var contentWidth = this.element ? this.element.offsetWidth - contentPos.left : 0;
          var contentHeight = this.element ? this.element.offsetHeight - contentPos.top : 0;
          var calculateNumItemsInViewport = function calculateNumItemsInViewport(_contentSize, _itemSize) {
            return Math.ceil(_contentSize / (_itemSize || _contentSize));
          };
          var calculateNumToleratedItems = function calculateNumToleratedItems(_numItems) {
            return Math.ceil(_numItems / 2);
          };
          var numItemsInViewport = both ? {
            rows: calculateNumItemsInViewport(contentHeight, itemSize[0]),
            cols: calculateNumItemsInViewport(contentWidth, itemSize[1])
          } : calculateNumItemsInViewport(horizontal ? contentWidth : contentHeight, itemSize);
          var numToleratedItems = this.d_numToleratedItems || (both ? [calculateNumToleratedItems(numItemsInViewport.rows), calculateNumToleratedItems(numItemsInViewport.cols)] : calculateNumToleratedItems(numItemsInViewport));
          return {
            numItemsInViewport: numItemsInViewport,
            numToleratedItems: numToleratedItems
          };
        },
        calculateOptions: function calculateOptions() {
          var _this3 = this;
          var both = this.isBoth();
          var first = this.first;
          var _this$calculateNumIte2 = this.calculateNumItems(),
            numItemsInViewport = _this$calculateNumIte2.numItemsInViewport,
            numToleratedItems = _this$calculateNumIte2.numToleratedItems;
          var calculateLast = function calculateLast(_first, _num, _numT) {
            var _isCols = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            return _this3.getLast(_first + _num + (_first < _numT ? 2 : 3) * _numT, _isCols);
          };
          var last = both ? {
            rows: calculateLast(first.rows, numItemsInViewport.rows, numToleratedItems[0]),
            cols: calculateLast(first.cols, numItemsInViewport.cols, numToleratedItems[1], true)
          } : calculateLast(first, numItemsInViewport, numToleratedItems);
          this.last = last;
          this.numItemsInViewport = numItemsInViewport;
          this.d_numToleratedItems = numToleratedItems;
          this.$emit('update:numToleratedItems', this.d_numToleratedItems);
          if (this.showLoader) {
            this.loaderArr = both ? Array.from({
              length: numItemsInViewport.rows
            }).map(function () {
              return Array.from({
                length: numItemsInViewport.cols
              });
            }) : Array.from({
              length: numItemsInViewport
            });
          }
          if (this.lazy) {
            Promise.resolve().then(function () {
              var _this3$items;
              _this3.lazyLoadState = {
                first: _this3.step ? both ? {
                  rows: 0,
                  cols: first.cols
                } : 0 : first,
                last: Math.min(_this3.step ? _this3.step : last, ((_this3$items = _this3.items) === null || _this3$items === void 0 ? void 0 : _this3$items.length) || 0)
              };
              _this3.$emit('lazy-load', _this3.lazyLoadState);
            });
          }
        },
        calculateAutoSize: function calculateAutoSize() {
          var _this4 = this;
          if (this.autoSize && !this.d_loading) {
            Promise.resolve().then(function () {
              if (_this4.content) {
                var both = _this4.isBoth();
                var horizontal = _this4.isHorizontal();
                var vertical = _this4.isVertical();
                _this4.content.style.minHeight = _this4.content.style.minWidth = 'auto';
                _this4.content.style.position = 'relative';
                _this4.element.style.contain = 'none';

                /*const [contentWidth, contentHeight] = [DomHandler.getWidth(this.content), DomHandler.getHeight(this.content)];
                 contentWidth !== this.defaultContentWidth && (this.element.style.width = '');
                contentHeight !== this.defaultContentHeight && (this.element.style.height = '');*/

                var _ref = [utils.DomHandler.getWidth(_this4.element), utils.DomHandler.getHeight(_this4.element)],
                  width = _ref[0],
                  height = _ref[1];
                (both || horizontal) && (_this4.element.style.width = width < _this4.defaultWidth ? width + 'px' : _this4.scrollWidth || _this4.defaultWidth + 'px');
                (both || vertical) && (_this4.element.style.height = height < _this4.defaultHeight ? height + 'px' : _this4.scrollHeight || _this4.defaultHeight + 'px');
                _this4.content.style.minHeight = _this4.content.style.minWidth = '';
                _this4.content.style.position = '';
                _this4.element.style.contain = '';
              }
            });
          }
        },
        getLast: function getLast() {
          var _ref2, _this$items;
          var last = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var isCols = arguments.length > 1 ? arguments[1] : undefined;
          return this.items ? Math.min(isCols ? ((_ref2 = this.columns || this.items[0]) === null || _ref2 === void 0 ? void 0 : _ref2.length) || 0 : ((_this$items = this.items) === null || _this$items === void 0 ? void 0 : _this$items.length) || 0, last) : 0;
        },
        getContentPosition: function getContentPosition() {
          if (this.content) {
            var style = getComputedStyle(this.content);
            var left = parseFloat(style.paddingLeft) + Math.max(parseFloat(style.left) || 0, 0);
            var right = parseFloat(style.paddingRight) + Math.max(parseFloat(style.right) || 0, 0);
            var top = parseFloat(style.paddingTop) + Math.max(parseFloat(style.top) || 0, 0);
            var bottom = parseFloat(style.paddingBottom) + Math.max(parseFloat(style.bottom) || 0, 0);
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
        },
        setSize: function setSize() {
          var _this5 = this;
          if (this.element) {
            var both = this.isBoth();
            var horizontal = this.isHorizontal();
            var parentElement = this.element.parentElement;
            var width = this.scrollWidth || "".concat(this.element.offsetWidth || parentElement.offsetWidth, "px");
            var height = this.scrollHeight || "".concat(this.element.offsetHeight || parentElement.offsetHeight, "px");
            var setProp = function setProp(_name, _value) {
              return _this5.element.style[_name] = _value;
            };
            if (both || horizontal) {
              setProp('height', height);
              setProp('width', width);
            } else {
              setProp('height', height);
            }
          }
        },
        setSpacerSize: function setSpacerSize() {
          var _this6 = this;
          var items = this.items;
          if (items) {
            var both = this.isBoth();
            var horizontal = this.isHorizontal();
            var contentPos = this.getContentPosition();
            var setProp = function setProp(_name, _value, _size) {
              var _cpos = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
              return _this6.spacerStyle = _objectSpread(_objectSpread({}, _this6.spacerStyle), _defineProperty({}, "".concat(_name), (_value || []).length * _size + _cpos + 'px'));
            };
            if (both) {
              setProp('height', items, this.itemSize[0], contentPos.y);
              setProp('width', this.columns || items[1], this.itemSize[1], contentPos.x);
            } else {
              horizontal ? setProp('width', this.columns || items, this.itemSize, contentPos.x) : setProp('height', items, this.itemSize, contentPos.y);
            }
          }
        },
        setContentPosition: function setContentPosition(pos) {
          var _this7 = this;
          if (this.content && !this.appendOnly) {
            var both = this.isBoth();
            var horizontal = this.isHorizontal();
            var first = pos ? pos.first : this.first;
            var calculateTranslateVal = function calculateTranslateVal(_first, _size) {
              return _first * _size;
            };
            var setTransform = function setTransform() {
              var _x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
              var _y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
              return _this7.contentStyle = _objectSpread(_objectSpread({}, _this7.contentStyle), {
                transform: "translate3d(".concat(_x, "px, ").concat(_y, "px, 0)")
              });
            };
            if (both) {
              setTransform(calculateTranslateVal(first.cols, this.itemSize[1]), calculateTranslateVal(first.rows, this.itemSize[0]));
            } else {
              var translateVal = calculateTranslateVal(first, this.itemSize);
              horizontal ? setTransform(translateVal, 0) : setTransform(0, translateVal);
            }
          }
        },
        onScrollPositionChange: function onScrollPositionChange(event) {
          var _this8 = this;
          var target = event.target;
          var both = this.isBoth();
          var horizontal = this.isHorizontal();
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
            if (_currentIndex <= _numT) return 0;else return Math.max(0, _isScrollDownOrRight ? _currentIndex < _triggerIndex ? _first : _currentIndex - _numT : _currentIndex > _triggerIndex ? _first : _currentIndex - 2 * _numT);
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
          var newFirst = both ? {
            rows: 0,
            cols: 0
          } : 0;
          var newLast = this.last;
          var isRangeChanged = false;
          var newScrollPos = this.lastScrollPos;
          if (both) {
            var isScrollDown = this.lastScrollPos.top <= scrollTop;
            var isScrollRight = this.lastScrollPos.left <= scrollLeft;
            if (!this.appendOnly || this.appendOnly && (isScrollDown || isScrollRight)) {
              var currentIndex = {
                rows: calculateCurrentIndex(scrollTop, this.itemSize[0]),
                cols: calculateCurrentIndex(scrollLeft, this.itemSize[1])
              };
              var triggerIndex = {
                rows: calculateTriggerIndex(currentIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
                cols: calculateTriggerIndex(currentIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
              };
              newFirst = {
                rows: calculateFirst(currentIndex.rows, triggerIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
                cols: calculateFirst(currentIndex.cols, triggerIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
              };
              newLast = {
                rows: calculateLast(currentIndex.rows, newFirst.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0]),
                cols: calculateLast(currentIndex.cols, newFirst.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], true)
              };
              isRangeChanged = newFirst.rows !== this.first.rows || newLast.rows !== this.last.rows || newFirst.cols !== this.first.cols || newLast.cols !== this.last.cols || this.isRangeChanged;
              newScrollPos = {
                top: scrollTop,
                left: scrollLeft
              };
            }
          } else {
            var scrollPos = horizontal ? scrollLeft : scrollTop;
            var isScrollDownOrRight = this.lastScrollPos <= scrollPos;
            if (!this.appendOnly || this.appendOnly && isScrollDownOrRight) {
              var _currentIndex2 = calculateCurrentIndex(scrollPos, this.itemSize);
              var _triggerIndex2 = calculateTriggerIndex(_currentIndex2, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
              newFirst = calculateFirst(_currentIndex2, _triggerIndex2, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
              newLast = calculateLast(_currentIndex2, newFirst, this.last, this.numItemsInViewport, this.d_numToleratedItems);
              isRangeChanged = newFirst !== this.first || newLast !== this.last || this.isRangeChanged;
              newScrollPos = scrollPos;
            }
          }
          return {
            first: newFirst,
            last: newLast,
            isRangeChanged: isRangeChanged,
            scrollPos: newScrollPos
          };
        },
        onScrollChange: function onScrollChange(event) {
          var _this$onScrollPositio = this.onScrollPositionChange(event),
            first = _this$onScrollPositio.first,
            last = _this$onScrollPositio.last,
            isRangeChanged = _this$onScrollPositio.isRangeChanged,
            scrollPos = _this$onScrollPositio.scrollPos;
          if (isRangeChanged) {
            var newState = {
              first: first,
              last: last
            };
            this.setContentPosition(newState);
            this.first = first;
            this.last = last;
            this.lastScrollPos = scrollPos;
            this.$emit('scroll-index-change', newState);
            if (this.lazy && this.isPageChanged(first)) {
              var _this$items2, _this$items3;
              var lazyLoadState = {
                first: this.step ? Math.min(this.getPageByFirst(first) * this.step, (((_this$items2 = this.items) === null || _this$items2 === void 0 ? void 0 : _this$items2.length) || 0) - this.step) : first,
                last: Math.min(this.step ? (this.getPageByFirst(first) + 1) * this.step : last, ((_this$items3 = this.items) === null || _this$items3 === void 0 ? void 0 : _this$items3.length) || 0)
              };
              var isLazyStateChanged = this.lazyLoadState.first !== lazyLoadState.first || this.lazyLoadState.last !== lazyLoadState.last;
              isLazyStateChanged && this.$emit('lazy-load', lazyLoadState);
              this.lazyLoadState = lazyLoadState;
            }
          }
        },
        onScroll: function onScroll(event) {
          var _this9 = this;
          this.$emit('scroll', event);
          if (this.delay) {
            if (this.scrollTimeout) {
              clearTimeout(this.scrollTimeout);
            }
            if (this.isPageChanged()) {
              if (!this.d_loading && this.showLoader) {
                var _this$onScrollPositio2 = this.onScrollPositionChange(event),
                  isRangeChanged = _this$onScrollPositio2.isRangeChanged;
                var changed = isRangeChanged || (this.step ? this.isPageChanged() : false);
                changed && (this.d_loading = true);
              }
              this.scrollTimeout = setTimeout(function () {
                _this9.onScrollChange(event);
                if (_this9.d_loading && _this9.showLoader && (!_this9.lazy || _this9.loading === undefined)) {
                  _this9.d_loading = false;
                  _this9.page = _this9.getPageByFirst();
                }
              }, this.delay);
            }
          } else {
            this.onScrollChange(event);
          }
        },
        onResize: function onResize() {
          var _this10 = this;
          if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
          }
          this.resizeTimeout = setTimeout(function () {
            if (utils.DomHandler.isVisible(_this10.element)) {
              var both = _this10.isBoth();
              var vertical = _this10.isVertical();
              var horizontal = _this10.isHorizontal();
              var _ref3 = [utils.DomHandler.getWidth(_this10.element), utils.DomHandler.getHeight(_this10.element)],
                width = _ref3[0],
                height = _ref3[1];
              var isDiffWidth = width !== _this10.defaultWidth,
                isDiffHeight = height !== _this10.defaultHeight;
              var reinit = both ? isDiffWidth || isDiffHeight : horizontal ? isDiffWidth : vertical ? isDiffHeight : false;
              if (reinit) {
                _this10.d_numToleratedItems = _this10.numToleratedItems;
                _this10.defaultWidth = width;
                _this10.defaultHeight = height;
                _this10.defaultContentWidth = utils.DomHandler.getWidth(_this10.content);
                _this10.defaultContentHeight = utils.DomHandler.getHeight(_this10.content);
                _this10.init();
              }
            }
          }, this.resizeDelay);
        },
        bindResizeListener: function bindResizeListener() {
          if (!this.resizeListener) {
            this.resizeListener = this.onResize.bind(this);
            window.addEventListener('resize', this.resizeListener);
            window.addEventListener('orientationchange', this.resizeListener);
          }
        },
        unbindResizeListener: function unbindResizeListener() {
          if (this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
            window.removeEventListener('orientationchange', this.resizeListener);
            this.resizeListener = null;
          }
        },
        getOptions: function getOptions(renderedIndex) {
          var count = (this.items || []).length;
          var index = this.isBoth() ? this.first.rows + renderedIndex : this.first + renderedIndex;
          return {
            index: index,
            count: count,
            first: index === 0,
            last: index === count - 1,
            even: index % 2 === 0,
            odd: index % 2 !== 0
          };
        },
        getLoaderOptions: function getLoaderOptions(index, extOptions) {
          var count = this.loaderArr.length;
          return _objectSpread({
            index: index,
            count: count,
            first: index === 0,
            last: index === count - 1,
            even: index % 2 === 0,
            odd: index % 2 !== 0
          }, extOptions);
        },
        getPageByFirst: function getPageByFirst(first) {
          return Math.floor(((first !== null && first !== void 0 ? first : this.first) + this.d_numToleratedItems * 4) / (this.step || 1));
        },
        isPageChanged: function isPageChanged(first) {
          return this.step ? this.page !== this.getPageByFirst(first !== null && first !== void 0 ? first : this.first) : true;
        },
        setContentEl: function setContentEl(el) {
          this.content = el || this.content || utils.DomHandler.findSingle(this.element, '[data-pc-section="content"]');
        },
        elementRef: function elementRef(el) {
          this.element = el;
        },
        contentRef: function contentRef(el) {
          this.content = el;
        }
      },
      computed: {
        containerClass: function containerClass() {
          return ['p-virtualscroller', this["class"], {
            'p-virtualscroller-inline': this.inline,
            'p-virtualscroller-both p-both-scroll': this.isBoth(),
            'p-virtualscroller-horizontal p-horizontal-scroll': this.isHorizontal()
          }];
        },
        contentClass: function contentClass() {
          return ['p-virtualscroller-content', {
            'p-virtualscroller-loading': this.d_loading
          }];
        },
        loaderClass: function loaderClass() {
          return ['p-virtualscroller-loader', {
            'p-component-overlay': !this.$slots.loader
          }];
        },
        loadedItems: function loadedItems() {
          var _this11 = this;
          if (this.items && !this.d_loading) {
            if (this.isBoth()) return this.items.slice(this.appendOnly ? 0 : this.first.rows, this.last.rows).map(function (item) {
              return _this11.columns ? item : item.slice(_this11.appendOnly ? 0 : _this11.first.cols, _this11.last.cols);
            });else if (this.isHorizontal() && this.columns) return this.items;else return this.items.slice(this.appendOnly ? 0 : this.first, this.last);
          }
          return [];
        },
        loadedRows: function loadedRows() {
          return this.d_loading ? this.loaderDisabled ? this.loaderArr : [] : this.loadedItems;
        },
        loadedColumns: function loadedColumns() {
          if (this.columns) {
            var both = this.isBoth();
            var horizontal = this.isHorizontal();
            if (both || horizontal) {
              return this.d_loading && this.loaderDisabled ? both ? this.loaderArr[0] : this.loaderArr : this.columns.slice(both ? this.first.cols : this.first, both ? this.last.cols : this.last);
            }
          }
          return this.columns;
        }
      },
      components: {
        SpinnerIcon: SpinnerIcon__default["default"]
      }
    };

    var _hoisted_1 = ["tabindex"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_SpinnerIcon = vue.resolveComponent("SpinnerIcon");
      return !_ctx.disabled ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: 0,
        ref: $options.elementRef,
        "class": $options.containerClass,
        tabindex: _ctx.tabindex,
        style: _ctx.style,
        onScroll: _cache[0] || (_cache[0] = function () {
          return $options.onScroll && $options.onScroll.apply($options, arguments);
        })
      }, _ctx.ptmi('root')), [vue.renderSlot(_ctx.$slots, "content", {
        styleClass: $options.contentClass,
        items: $options.loadedItems,
        getItemOptions: $options.getOptions,
        loading: $data.d_loading,
        getLoaderOptions: $options.getLoaderOptions,
        itemSize: _ctx.itemSize,
        rows: $options.loadedRows,
        columns: $options.loadedColumns,
        contentRef: $options.contentRef,
        spacerStyle: $data.spacerStyle,
        contentStyle: $data.contentStyle,
        vertical: $options.isVertical(),
        horizontal: $options.isHorizontal(),
        both: $options.isBoth()
      }, function () {
        return [vue.createElementVNode("div", vue.mergeProps({
          ref: $options.contentRef,
          "class": $options.contentClass,
          style: $data.contentStyle
        }, _ctx.ptm('content')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.loadedItems, function (item, index) {
          return vue.renderSlot(_ctx.$slots, "item", {
            key: index,
            item: item,
            options: $options.getOptions(index)
          });
        }), 128))], 16)];
      }), _ctx.showSpacer ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: 0,
        "class": "p-virtualscroller-spacer",
        style: $data.spacerStyle
      }, _ctx.ptm('spacer')), null, 16)) : vue.createCommentVNode("", true), !_ctx.loaderDisabled && _ctx.showLoader && $data.d_loading ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: 1,
        "class": $options.loaderClass
      }, _ctx.ptm('loader')), [_ctx.$slots && _ctx.$slots.loader ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, {
        key: 0
      }, vue.renderList($data.loaderArr, function (_, index) {
        return vue.renderSlot(_ctx.$slots, "loader", {
          key: index,
          options: $options.getLoaderOptions(index, $options.isBoth() && {
            numCols: _ctx.d_numItemsInViewport.cols
          })
        });
      }), 128)) : vue.createCommentVNode("", true), vue.renderSlot(_ctx.$slots, "loadingicon", {}, function () {
        return [vue.createVNode(_component_SpinnerIcon, vue.mergeProps({
          spin: "",
          "class": "p-virtualscroller-loading-icon"
        }, _ctx.ptm('loadingIcon')), null, 16)];
      })], 16)) : vue.createCommentVNode("", true)], 16, _hoisted_1)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
        key: 1
      }, [vue.renderSlot(_ctx.$slots, "default"), vue.renderSlot(_ctx.$slots, "content", {
        items: _ctx.items,
        rows: _ctx.items,
        columns: $options.loadedColumns
      })], 64));
    }

    script.render = render;

    return script;

})(primevue.icons.spinner, primevue.utils, primevue.basecomponent, primevue.virtualscroller.style, Vue);
