import Button from 'primevue/button';
import ChevronDownIcon from 'primevue/icons/chevrondown';
import ChevronLeftIcon from 'primevue/icons/chevronleft';
import ChevronRightIcon from 'primevue/icons/chevronright';
import ChevronUpIcon from 'primevue/icons/chevronup';
import Ripple from 'primevue/ripple';
import { DomHandler, ObjectUtils, UniqueComponentId } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import CarouselStyle from 'primevue/carousel/style';
import { resolveComponent, openBlock, createElementBlock, mergeProps, renderSlot, createCommentVNode, createElementVNode, createBlock, withCtx, resolveDynamicComponent, Fragment, renderList, createTextVNode, toDisplayString } from 'vue';

var script$1 = {
  name: 'BaseCarousel',
  "extends": BaseComponent,
  props: {
    value: null,
    page: {
      type: Number,
      "default": 0
    },
    numVisible: {
      type: Number,
      "default": 1
    },
    numScroll: {
      type: Number,
      "default": 1
    },
    responsiveOptions: Array,
    orientation: {
      type: String,
      "default": 'horizontal'
    },
    verticalViewPortHeight: {
      type: String,
      "default": '300px'
    },
    contentClass: String,
    containerClass: String,
    indicatorsContentClass: String,
    circular: {
      type: Boolean,
      "default": false
    },
    autoplayInterval: {
      type: Number,
      "default": 0
    },
    showNavigators: {
      type: Boolean,
      "default": true
    },
    showIndicators: {
      type: Boolean,
      "default": true
    },
    prevButtonProps: {
      type: Object,
      "default": function _default() {
        return {
          severity: 'secondary',
          text: true,
          rounded: true
        };
      }
    },
    nextButtonProps: {
      type: Object,
      "default": function _default() {
        return {
          severity: 'secondary',
          text: true,
          rounded: true
        };
      }
    }
  },
  style: CarouselStyle,
  provide: function provide() {
    return {
      $pcCarousel: this,
      $parentInstance: this
    };
  }
};

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var script = {
  name: 'Carousel',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:page'],
  isRemainingItemsAdded: false,
  data: function data() {
    return {
      remainingItems: 0,
      d_numVisible: this.numVisible,
      d_numScroll: this.numScroll,
      d_oldNumScroll: 0,
      d_oldNumVisible: 0,
      d_oldValue: null,
      d_page: this.page,
      totalShiftedItems: this.page * this.numScroll * -1,
      allowAutoplay: !!this.autoplayInterval,
      d_circular: this.circular || this.allowAutoplay,
      swipeThreshold: 20
    };
  },
  watch: {
    page: function page(newValue) {
      if (newValue > this.d_page) {
        this.navForward({}, newValue);
      } else if (newValue < this.d_page) {
        this.navBackward({}, newValue);
      }
      this.d_page = newValue;
    },
    circular: function circular(newValue) {
      this.d_circular = newValue;
    },
    numVisible: function numVisible(newValue, oldValue) {
      this.d_numVisible = newValue;
      this.d_oldNumVisible = oldValue;
    },
    numScroll: function numScroll(newValue, oldValue) {
      this.d_oldNumScroll = oldValue;
      this.d_numScroll = newValue;
    },
    value: function value(oldValue) {
      this.d_oldValue = oldValue;
    }
  },
  mounted: function mounted() {
    var stateChanged = false;
    this.$el.setAttribute(this.attributeSelector, '');
    this.createStyle();
    this.calculatePosition();
    if (this.responsiveOptions) {
      this.bindDocumentListeners();
    }
    if (this.isCircular()) {
      var totalShiftedItems = this.totalShiftedItems;
      if (this.d_page === 0) {
        totalShiftedItems = -1 * this.d_numVisible;
      } else if (totalShiftedItems === 0) {
        totalShiftedItems = -1 * this.value.length;
        if (this.remainingItems > 0) {
          this.isRemainingItemsAdded = true;
        }
      }
      if (totalShiftedItems !== this.totalShiftedItems) {
        this.totalShiftedItems = totalShiftedItems;
        stateChanged = true;
      }
    }
    if (!stateChanged && this.isAutoplay()) {
      this.startAutoplay();
    }
  },
  updated: function updated() {
    if (!this.empty) {
      var isCircular = this.isCircular();
      var stateChanged = false;
      var totalShiftedItems = this.totalShiftedItems;
      if (this.autoplayInterval) {
        this.stopAutoplay();
      }
      if (this.d_oldNumScroll !== this.d_numScroll || this.d_oldNumVisible !== this.d_numVisible || this.d_oldValue.length !== this.value.length) {
        this.remainingItems = (this.value.length - this.d_numVisible) % this.d_numScroll;
        var page = this.d_page;
        if (this.totalIndicators !== 0 && page >= this.totalIndicators) {
          page = this.totalIndicators - 1;
          this.$emit('update:page', page);
          this.d_page = page;
          stateChanged = true;
        }
        totalShiftedItems = page * this.d_numScroll * -1;
        if (isCircular) {
          totalShiftedItems -= this.d_numVisible;
        }
        if (page === this.totalIndicators - 1 && this.remainingItems > 0) {
          totalShiftedItems += -1 * this.remainingItems + this.d_numScroll;
          this.isRemainingItemsAdded = true;
        } else {
          this.isRemainingItemsAdded = false;
        }
        if (totalShiftedItems !== this.totalShiftedItems) {
          this.totalShiftedItems = totalShiftedItems;
          stateChanged = true;
        }
        this.d_oldNumScroll = this.d_numScroll;
        this.d_oldNumVisible = this.d_numVisible;
        this.d_oldValue = this.value;
        this.$refs.itemsContainer.style.transform = this.isVertical() ? "translate3d(0, ".concat(totalShiftedItems * (100 / this.d_numVisible), "%, 0)") : "translate3d(".concat(totalShiftedItems * (100 / this.d_numVisible), "%, 0, 0)");
      }
      if (isCircular) {
        if (this.d_page === 0) {
          totalShiftedItems = -1 * this.d_numVisible;
        } else if (totalShiftedItems === 0) {
          totalShiftedItems = -1 * this.value.length;
          if (this.remainingItems > 0) {
            this.isRemainingItemsAdded = true;
          }
        }
        if (totalShiftedItems !== this.totalShiftedItems) {
          this.totalShiftedItems = totalShiftedItems;
          stateChanged = true;
        }
      }
      if (!stateChanged && this.isAutoplay()) {
        this.startAutoplay();
      }
    }
  },
  beforeUnmount: function beforeUnmount() {
    if (this.responsiveOptions) {
      this.unbindDocumentListeners();
    }
    if (this.autoplayInterval) {
      this.stopAutoplay();
    }
  },
  methods: {
    getIndicatorPTOptions: function getIndicatorPTOptions(index) {
      return {
        context: {
          highlighted: index === this.d_page
        }
      };
    },
    step: function step(dir, page) {
      var totalShiftedItems = this.totalShiftedItems;
      var isCircular = this.isCircular();
      if (page != null) {
        totalShiftedItems = this.d_numScroll * page * -1;
        if (isCircular) {
          totalShiftedItems -= this.d_numVisible;
        }
        this.isRemainingItemsAdded = false;
      } else {
        totalShiftedItems += this.d_numScroll * dir;
        if (this.isRemainingItemsAdded) {
          totalShiftedItems += this.remainingItems - this.d_numScroll * dir;
          this.isRemainingItemsAdded = false;
        }
        var originalShiftedItems = isCircular ? totalShiftedItems + this.d_numVisible : totalShiftedItems;
        page = Math.abs(Math.floor(originalShiftedItems / this.d_numScroll));
      }
      if (isCircular && this.d_page === this.totalIndicators - 1 && dir === -1) {
        totalShiftedItems = -1 * (this.value.length + this.d_numVisible);
        page = 0;
      } else if (isCircular && this.d_page === 0 && dir === 1) {
        totalShiftedItems = 0;
        page = this.totalIndicators - 1;
      } else if (page === this.totalIndicators - 1 && this.remainingItems > 0) {
        totalShiftedItems += this.remainingItems * -1 - this.d_numScroll * dir;
        this.isRemainingItemsAdded = true;
      }
      if (this.$refs.itemsContainer) {
        !this.isUnstyled && DomHandler.removeClass(this.$refs.itemsContainer, 'p-items-hidden');
        this.$refs.itemsContainer.style.transform = this.isVertical() ? "translate3d(0, ".concat(totalShiftedItems * (100 / this.d_numVisible), "%, 0)") : "translate3d(".concat(totalShiftedItems * (100 / this.d_numVisible), "%, 0, 0)");
        this.$refs.itemsContainer.style.transition = 'transform 500ms ease 0s';
      }
      this.totalShiftedItems = totalShiftedItems;
      this.$emit('update:page', page);
      this.d_page = page;
    },
    calculatePosition: function calculatePosition() {
      if (this.$refs.itemsContainer && this.responsiveOptions) {
        var windowWidth = window.innerWidth;
        var matchedResponsiveOptionsData = {
          numVisible: this.numVisible,
          numScroll: this.numScroll
        };
        for (var i = 0; i < this.responsiveOptions.length; i++) {
          var res = this.responsiveOptions[i];
          if (parseInt(res.breakpoint, 10) >= windowWidth) {
            matchedResponsiveOptionsData = res;
          }
        }
        if (this.d_numScroll !== matchedResponsiveOptionsData.numScroll) {
          var page = this.d_page;
          page = parseInt(page * this.d_numScroll / matchedResponsiveOptionsData.numScroll);
          this.totalShiftedItems = matchedResponsiveOptionsData.numScroll * page * -1;
          if (this.isCircular()) {
            this.totalShiftedItems -= matchedResponsiveOptionsData.numVisible;
          }
          this.d_numScroll = matchedResponsiveOptionsData.numScroll;
          this.$emit('update:page', page);
          this.d_page = page;
        }
        if (this.d_numVisible !== matchedResponsiveOptionsData.numVisible) {
          this.d_numVisible = matchedResponsiveOptionsData.numVisible;
        }
      }
    },
    navBackward: function navBackward(e, index) {
      if (this.d_circular || this.d_page !== 0) {
        this.step(1, index);
      }
      this.allowAutoplay = false;
      if (e.cancelable) {
        e.preventDefault();
      }
    },
    navForward: function navForward(e, index) {
      if (this.d_circular || this.d_page < this.totalIndicators - 1) {
        this.step(-1, index);
      }
      this.allowAutoplay = false;
      if (e.cancelable) {
        e.preventDefault();
      }
    },
    onIndicatorClick: function onIndicatorClick(e, index) {
      var page = this.d_page;
      if (index > page) {
        this.navForward(e, index);
      } else if (index < page) {
        this.navBackward(e, index);
      }
    },
    onTransitionEnd: function onTransitionEnd() {
      if (this.$refs.itemsContainer) {
        !this.isUnstyled && DomHandler.addClass(this.$refs.itemsContainer, 'p-items-hidden');
        this.$refs.itemsContainer.style.transition = '';
        if ((this.d_page === 0 || this.d_page === this.totalIndicators - 1) && this.isCircular()) {
          this.$refs.itemsContainer.style.transform = this.isVertical() ? "translate3d(0, ".concat(this.totalShiftedItems * (100 / this.d_numVisible), "%, 0)") : "translate3d(".concat(this.totalShiftedItems * (100 / this.d_numVisible), "%, 0, 0)");
        }
      }
    },
    onTouchStart: function onTouchStart(e) {
      var touchobj = e.changedTouches[0];
      this.startPos = {
        x: touchobj.pageX,
        y: touchobj.pageY
      };
    },
    onTouchMove: function onTouchMove(e) {
      var touchobj = e.changedTouches[0];
      var diff = this.isVertical() ? touchobj.pageY - this.startPos.y : touchobj.pageX - this.startPos.x;
      if (Math.abs(diff) > this.swipeThreshold && e.cancelable) {
        e.preventDefault();
      }
    },
    onTouchEnd: function onTouchEnd(e) {
      var touchobj = e.changedTouches[0];
      if (this.isVertical()) {
        this.changePageOnTouch(e, touchobj.pageY - this.startPos.y);
      } else {
        this.changePageOnTouch(e, touchobj.pageX - this.startPos.x);
      }
    },
    changePageOnTouch: function changePageOnTouch(e, diff) {
      if (Math.abs(diff) > this.swipeThreshold) {
        if (diff < 0) {
          // left
          this.navForward(e);
        } else {
          // right
          this.navBackward(e);
        }
      }
    },
    onIndicatorKeydown: function onIndicatorKeydown(event) {
      switch (event.code) {
        case 'ArrowRight':
          this.onRightKey();
          break;
        case 'ArrowLeft':
          this.onLeftKey();
          break;
        case 'Home':
          this.onHomeKey();
          event.preventDefault();
          break;
        case 'End':
          this.onEndKey();
          event.preventDefault();
          break;
        case 'ArrowUp':
        case 'ArrowDown':
        case 'PageUp':
        case 'PageDown':
          event.preventDefault();
          break;
        case 'Tab':
          this.onTabKey();
          break;
      }
    },
    onRightKey: function onRightKey() {
      var indicators = _toConsumableArray(DomHandler.find(this.$refs.indicatorContent, '[data-pc-section="indicator"]'));
      var activeIndex = this.findFocusedIndicatorIndex();
      this.changedFocusedIndicator(activeIndex, activeIndex + 1 === indicators.length ? indicators.length - 1 : activeIndex + 1);
    },
    onLeftKey: function onLeftKey() {
      var activeIndex = this.findFocusedIndicatorIndex();
      this.changedFocusedIndicator(activeIndex, activeIndex - 1 <= 0 ? 0 : activeIndex - 1);
    },
    onHomeKey: function onHomeKey() {
      var activeIndex = this.findFocusedIndicatorIndex();
      this.changedFocusedIndicator(activeIndex, 0);
    },
    onEndKey: function onEndKey() {
      var indicators = _toConsumableArray(DomHandler.find(this.$refs.indicatorContent, '[data-pc-section="indicator"]'));
      var activeIndex = this.findFocusedIndicatorIndex();
      this.changedFocusedIndicator(activeIndex, indicators.length - 1);
    },
    onTabKey: function onTabKey() {
      var indicators = _toConsumableArray(DomHandler.find(this.$refs.indicatorContent, '[data-pc-section="indicator"]'));
      var highlightedIndex = indicators.findIndex(function (ind) {
        return DomHandler.getAttribute(ind, 'data-p-highlight') === true;
      });
      var activeIndicator = DomHandler.findSingle(this.$refs.indicatorContent, '[data-pc-section="indicator"] > button[tabindex="0"]');
      var activeIndex = indicators.findIndex(function (ind) {
        return ind === activeIndicator.parentElement;
      });
      indicators[activeIndex].children[0].tabIndex = '-1';
      indicators[highlightedIndex].children[0].tabIndex = '0';
    },
    findFocusedIndicatorIndex: function findFocusedIndicatorIndex() {
      var indicators = _toConsumableArray(DomHandler.find(this.$refs.indicatorContent, '[data-pc-section="indicator"]'));
      var activeIndicator = DomHandler.findSingle(this.$refs.indicatorContent, '[data-pc-section="indicator"] > button[tabindex="0"]');
      return indicators.findIndex(function (ind) {
        return ind === activeIndicator.parentElement;
      });
    },
    changedFocusedIndicator: function changedFocusedIndicator(prevInd, nextInd) {
      var indicators = _toConsumableArray(DomHandler.find(this.$refs.indicatorContent, '[data-pc-section="indicator"]'));
      indicators[prevInd].children[0].tabIndex = '-1';
      indicators[nextInd].children[0].tabIndex = '0';
      indicators[nextInd].children[0].focus();
    },
    bindDocumentListeners: function bindDocumentListeners() {
      var _this = this;
      if (!this.documentResizeListener) {
        this.documentResizeListener = function (e) {
          _this.calculatePosition(e);
        };
        window.addEventListener('resize', this.documentResizeListener);
      }
    },
    unbindDocumentListeners: function unbindDocumentListeners() {
      if (this.documentResizeListener) {
        window.removeEventListener('resize', this.documentResizeListener);
        this.documentResizeListener = null;
      }
    },
    startAutoplay: function startAutoplay() {
      var _this2 = this;
      this.interval = setInterval(function () {
        if (_this2.d_page === _this2.totalIndicators - 1) {
          _this2.step(-1, 0);
        } else {
          _this2.step(-1, _this2.d_page + 1);
        }
      }, this.autoplayInterval);
    },
    stopAutoplay: function stopAutoplay() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    },
    createStyle: function createStyle() {
      if (!this.carouselStyle) {
        var _this$$primevue;
        this.carouselStyle = document.createElement('style');
        this.carouselStyle.type = 'text/css';
        DomHandler.setAttribute(this.carouselStyle, 'nonce', (_this$$primevue = this.$primevue) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.config) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.csp) === null || _this$$primevue === void 0 ? void 0 : _this$$primevue.nonce);
        document.body.appendChild(this.carouselStyle);
      }
      var innerHTML = "\n                .p-carousel[".concat(this.attributeSelector, "] .p-carousel-item {\n                    flex: 1 0 ").concat(100 / this.d_numVisible, "%\n                }\n            ");
      if (this.responsiveOptions && !this.isUnstyled) {
        var _responsiveOptions = _toConsumableArray(this.responsiveOptions);
        var comparer = ObjectUtils.localeComparator();
        _responsiveOptions.sort(function (data1, data2) {
          var value1 = data1.breakpoint;
          var value2 = data2.breakpoint;
          return ObjectUtils.sort(value1, value2, -1, comparer);
        });
        for (var i = 0; i < _responsiveOptions.length; i++) {
          var res = _responsiveOptions[i];
          innerHTML += "\n                        @media screen and (max-width: ".concat(res.breakpoint, ") {\n                            .p-carousel[").concat(this.attributeSelector, "] .p-carousel-item {\n                                flex: 1 0 ").concat(100 / res.numVisible, "%\n                            }\n                        }\n                    ");
        }
      }
      this.carouselStyle.innerHTML = innerHTML;
    },
    isVertical: function isVertical() {
      return this.orientation === 'vertical';
    },
    isCircular: function isCircular() {
      return this.value && this.d_circular && this.value.length >= this.d_numVisible;
    },
    isAutoplay: function isAutoplay() {
      return this.autoplayInterval && this.allowAutoplay;
    },
    firstIndex: function firstIndex() {
      return this.isCircular() ? -1 * (this.totalShiftedItems + this.d_numVisible) : this.totalShiftedItems * -1;
    },
    lastIndex: function lastIndex() {
      return this.firstIndex() + this.d_numVisible - 1;
    },
    ariaSlideNumber: function ariaSlideNumber(value) {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.slideNumber.replace(/{slideNumber}/g, value) : undefined;
    },
    ariaPageLabel: function ariaPageLabel(value) {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g, value) : undefined;
    }
  },
  computed: {
    totalIndicators: function totalIndicators() {
      return this.value ? Math.max(Math.ceil((this.value.length - this.d_numVisible) / this.d_numScroll) + 1, 0) : 0;
    },
    backwardIsDisabled: function backwardIsDisabled() {
      return this.value && (!this.circular || this.value.length < this.d_numVisible) && this.d_page === 0;
    },
    forwardIsDisabled: function forwardIsDisabled() {
      return this.value && (!this.circular || this.value.length < this.d_numVisible) && (this.d_page === this.totalIndicators - 1 || this.totalIndicators === 0);
    },
    ariaSlideLabel: function ariaSlideLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.slide : undefined;
    },
    ariaPrevButtonLabel: function ariaPrevButtonLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.prevPageLabel : undefined;
    },
    ariaNextButtonLabel: function ariaNextButtonLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.nextPageLabel : undefined;
    },
    attributeSelector: function attributeSelector() {
      return UniqueComponentId();
    },
    empty: function empty() {
      return !this.value || this.value.length === 0;
    },
    emptyMessageText: function emptyMessageText() {
      var _this$$primevue$confi;
      return ((_this$$primevue$confi = this.$primevue.config) === null || _this$$primevue$confi === void 0 || (_this$$primevue$confi = _this$$primevue$confi.locale) === null || _this$$primevue$confi === void 0 ? void 0 : _this$$primevue$confi.emptyMessage) || '';
    }
  },
  components: {
    Button: Button,
    ChevronRightIcon: ChevronRightIcon,
    ChevronDownIcon: ChevronDownIcon,
    ChevronLeftIcon: ChevronLeftIcon,
    ChevronUpIcon: ChevronUpIcon
  },
  directives: {
    ripple: Ripple
  }
};

var _hoisted_1 = ["aria-live"];
var _hoisted_2 = ["data-p-carousel-item-active", "data-p-carousel-item-start", "data-p-carousel-item-end"];
var _hoisted_3 = ["aria-hidden", "aria-label", "aria-roledescription", "data-p-carousel-item-active", "data-p-carousel-item-start", "data-p-carousel-item-end"];
var _hoisted_4 = ["data-p-highlight"];
var _hoisted_5 = ["tabindex", "aria-label", "aria-current", "onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Button = resolveComponent("Button");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root'),
    role: "region"
  }, _ctx.ptmi('root')), [_ctx.$slots.header ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": _ctx.cx('header')
  }, _ctx.ptm('header')), [renderSlot(_ctx.$slots, "header")], 16)) : createCommentVNode("", true), !$options.empty ? (openBlock(), createElementBlock("div", mergeProps({
    key: 1,
    "class": [_ctx.cx('contentContainer'), _ctx.containerClass]
  }, _ctx.ptm('contentContainer')), [createElementVNode("div", mergeProps({
    "class": [_ctx.cx('content'), _ctx.contentClass],
    "aria-live": $data.allowAutoplay ? 'polite' : 'off'
  }, _ctx.ptm('content')), [_ctx.showNavigators ? (openBlock(), createBlock(_component_Button, mergeProps({
    key: 0,
    "class": _ctx.cx('pcPreviousButton'),
    disabled: $options.backwardIsDisabled,
    "aria-label": $options.ariaPrevButtonLabel,
    unstyled: _ctx.unstyled,
    onClick: $options.navBackward
  }, _ctx.prevButtonProps, {
    pt: _ctx.ptm('pcPreviousButton'),
    "data-pc-group-section": "navigator"
  }), {
    icon: withCtx(function (slotProps) {
      return [renderSlot(_ctx.$slots, "previousicon", {}, function () {
        return [(openBlock(), createBlock(resolveDynamicComponent($options.isVertical() ? 'ChevronUpIcon' : 'ChevronLeftIcon'), mergeProps({
          "class": [_ctx.cx('previousButtonIcon'), slotProps.icon]
        }, _ctx.ptm('pcPreviousButton')['icon']), null, 16, ["class"]))];
      })];
    }),
    _: 3
  }, 16, ["class", "disabled", "aria-label", "unstyled", "onClick", "pt"])) : createCommentVNode("", true), createElementVNode("div", mergeProps({
    "class": _ctx.cx('viewport'),
    style: [{
      height: $options.isVertical() ? _ctx.verticalViewPortHeight : 'auto'
    }],
    onTouchend: _cache[1] || (_cache[1] = function () {
      return $options.onTouchEnd && $options.onTouchEnd.apply($options, arguments);
    }),
    onTouchstart: _cache[2] || (_cache[2] = function () {
      return $options.onTouchStart && $options.onTouchStart.apply($options, arguments);
    }),
    onTouchmove: _cache[3] || (_cache[3] = function () {
      return $options.onTouchMove && $options.onTouchMove.apply($options, arguments);
    })
  }, _ctx.ptm('viewport')), [createElementVNode("div", mergeProps({
    ref: "itemsContainer",
    "class": _ctx.cx('itemList'),
    onTransitionend: _cache[0] || (_cache[0] = function () {
      return $options.onTransitionEnd && $options.onTransitionEnd.apply($options, arguments);
    })
  }, _ctx.ptm('itemList')), [$options.isCircular() ? (openBlock(true), createElementBlock(Fragment, {
    key: 0
  }, renderList(_ctx.value.slice(-1 * $data.d_numVisible), function (item, index) {
    return openBlock(), createElementBlock("div", mergeProps({
      key: index + '_scloned',
      "class": _ctx.cx('itemClone', {
        index: index,
        value: _ctx.value,
        totalShiftedItems: $data.totalShiftedItems,
        d_numVisible: $data.d_numVisible
      })
    }, _ctx.ptm('itemClone'), {
      "data-p-carousel-item-active": $data.totalShiftedItems * -1 === _ctx.value.length + $data.d_numVisible,
      "data-p-carousel-item-start": index === 0,
      "data-p-carousel-item-end": _ctx.value.slice(-1 * $data.d_numVisible).length - 1 === index
    }), [renderSlot(_ctx.$slots, "item", {
      data: item,
      index: index
    })], 16, _hoisted_2);
  }), 128)) : createCommentVNode("", true), (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.value, function (item, index) {
    return openBlock(), createElementBlock("div", mergeProps({
      key: index,
      "class": _ctx.cx('item', {
        index: index
      }),
      role: "group",
      "aria-hidden": $options.firstIndex() > index || $options.lastIndex() < index ? true : undefined,
      "aria-label": $options.ariaSlideNumber(index),
      "aria-roledescription": $options.ariaSlideLabel
    }, _ctx.ptm('item'), {
      "data-p-carousel-item-active": $options.firstIndex() <= index && $options.lastIndex() >= index,
      "data-p-carousel-item-start": $options.firstIndex() === index,
      "data-p-carousel-item-end": $options.lastIndex() === index
    }), [renderSlot(_ctx.$slots, "item", {
      data: item,
      index: index
    })], 16, _hoisted_3);
  }), 128)), $options.isCircular() ? (openBlock(true), createElementBlock(Fragment, {
    key: 1
  }, renderList(_ctx.value.slice(0, $data.d_numVisible), function (item, index) {
    return openBlock(), createElementBlock("div", mergeProps({
      key: index + '_fcloned',
      "class": _ctx.cx('itemClone', {
        index: index,
        value: _ctx.value,
        totalShiftedItems: $data.totalShiftedItems,
        d_numVisible: $data.d_numVisible
      })
    }, _ctx.ptm('itemClone')), [renderSlot(_ctx.$slots, "item", {
      data: item,
      index: index
    })], 16);
  }), 128)) : createCommentVNode("", true)], 16)], 16), _ctx.showNavigators ? (openBlock(), createBlock(_component_Button, mergeProps({
    key: 1,
    "class": _ctx.cx('pcNextButton'),
    disabled: $options.forwardIsDisabled,
    "aria-label": $options.ariaNextButtonLabel,
    unstyled: _ctx.unstyled,
    onClick: $options.navForward
  }, _ctx.nextButtonProps, {
    pt: _ctx.ptm('pcNextButton'),
    "data-pc-group-section": "navigator"
  }), {
    icon: withCtx(function (slotProps) {
      return [renderSlot(_ctx.$slots, "nexticon", {}, function () {
        return [(openBlock(), createBlock(resolveDynamicComponent($options.isVertical() ? 'ChevronDownIcon' : 'ChevronRightIcon'), mergeProps({
          "class": [_ctx.cx('nextButtonIcon'), slotProps["class"]]
        }, _ctx.ptm('pcNextButton')['icon']), null, 16, ["class"]))];
      })];
    }),
    _: 3
  }, 16, ["class", "disabled", "aria-label", "unstyled", "onClick", "pt"])) : createCommentVNode("", true)], 16, _hoisted_1), $options.totalIndicators >= 0 && _ctx.showIndicators ? (openBlock(), createElementBlock("ul", mergeProps({
    key: 0,
    ref: "indicatorContent",
    "class": [_ctx.cx('indicatorList'), _ctx.indicatorsContentClass],
    onKeydown: _cache[4] || (_cache[4] = function () {
      return $options.onIndicatorKeydown && $options.onIndicatorKeydown.apply($options, arguments);
    })
  }, _ctx.ptm('indicatorList')), [(openBlock(true), createElementBlock(Fragment, null, renderList($options.totalIndicators, function (indicator, i) {
    return openBlock(), createElementBlock("li", mergeProps({
      key: 'p-carousel-indicator-' + i.toString(),
      "class": _ctx.cx('indicator', {
        index: i
      })
    }, _ctx.ptm('indicator', $options.getIndicatorPTOptions(i)), {
      "data-p-highlight": $data.d_page === i
    }), [createElementVNode("button", mergeProps({
      "class": _ctx.cx('indicatorButton'),
      type: "button",
      tabindex: $data.d_page === i ? '0' : '-1',
      "aria-label": $options.ariaPageLabel(i + 1),
      "aria-current": $data.d_page === i ? 'page' : undefined,
      onClick: function onClick($event) {
        return $options.onIndicatorClick($event, i);
      }
    }, _ctx.ptm('indicatorButton', $options.getIndicatorPTOptions(i))), null, 16, _hoisted_5)], 16, _hoisted_4);
  }), 128))], 16)) : createCommentVNode("", true)], 16)) : renderSlot(_ctx.$slots, "empty", {
    key: 2
  }, function () {
    return [createTextVNode(toDisplayString($options.emptyMessageText), 1)];
  }), _ctx.$slots.footer ? (openBlock(), createElementBlock("div", mergeProps({
    key: 3,
    "class": _ctx.cx('footer')
  }, _ctx.ptm('footer')), [renderSlot(_ctx.$slots, "footer")], 16)) : createCommentVNode("", true)], 16);
}

script.render = render;

export { script as default };
