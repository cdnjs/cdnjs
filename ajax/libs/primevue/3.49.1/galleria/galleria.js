this.primevue = this.primevue || {};
this.primevue.galleria = (function (FocusTrap, Portal, utils, BaseComponent, GalleriaStyle, TimesIcon, Ripple, ChevronLeftIcon, ChevronRightIcon, vue, ChevronDownIcon, ChevronUpIcon) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);
    var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var GalleriaStyle__default = /*#__PURE__*/_interopDefaultLegacy(GalleriaStyle);
    var TimesIcon__default = /*#__PURE__*/_interopDefaultLegacy(TimesIcon);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
    var ChevronLeftIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronLeftIcon);
    var ChevronRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronRightIcon);
    var ChevronDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronDownIcon);
    var ChevronUpIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronUpIcon);

    var script$4 = {
      name: 'BaseGalleria',
      "extends": BaseComponent__default["default"],
      props: {
        id: {
          type: String,
          "default": null
        },
        value: {
          type: Array,
          "default": null
        },
        activeIndex: {
          type: Number,
          "default": 0
        },
        fullScreen: {
          type: Boolean,
          "default": false
        },
        visible: {
          type: Boolean,
          "default": false
        },
        numVisible: {
          type: Number,
          "default": 3
        },
        responsiveOptions: {
          type: Array,
          "default": null
        },
        showItemNavigators: {
          type: Boolean,
          "default": false
        },
        showThumbnailNavigators: {
          type: Boolean,
          "default": true
        },
        showItemNavigatorsOnHover: {
          type: Boolean,
          "default": false
        },
        changeItemOnIndicatorHover: {
          type: Boolean,
          "default": false
        },
        circular: {
          type: Boolean,
          "default": false
        },
        autoPlay: {
          type: Boolean,
          "default": false
        },
        transitionInterval: {
          type: Number,
          "default": 4000
        },
        showThumbnails: {
          type: Boolean,
          "default": true
        },
        thumbnailsPosition: {
          type: String,
          "default": 'bottom'
        },
        verticalThumbnailViewPortHeight: {
          type: String,
          "default": '300px'
        },
        showIndicators: {
          type: Boolean,
          "default": false
        },
        showIndicatorsOnItem: {
          type: Boolean,
          "default": false
        },
        indicatorsPosition: {
          type: String,
          "default": 'bottom'
        },
        baseZIndex: {
          type: Number,
          "default": 0
        },
        maskClass: {
          type: String,
          "default": null
        },
        containerStyle: {
          type: null,
          "default": null
        },
        containerClass: {
          type: null,
          "default": null
        },
        containerProps: {
          type: null,
          "default": null
        },
        prevButtonProps: {
          type: null,
          "default": null
        },
        nextButtonProps: {
          type: null,
          "default": null
        },
        ariaLabel: {
          type: String,
          "default": null
        },
        ariaRoledescription: {
          type: String,
          "default": null
        }
      },
      style: GalleriaStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread$1(); }
    function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
    function _iterableToArray$1(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
    function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$1(arr); }
    function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
    var script$3 = {
      name: 'GalleriaItem',
      hostName: 'Galleria',
      "extends": BaseComponent__default["default"],
      emits: ['start-slideshow', 'stop-slideshow', 'update:activeIndex'],
      props: {
        circular: {
          type: Boolean,
          "default": false
        },
        activeIndex: {
          type: Number,
          "default": 0
        },
        value: {
          type: Array,
          "default": null
        },
        showItemNavigators: {
          type: Boolean,
          "default": true
        },
        showIndicators: {
          type: Boolean,
          "default": true
        },
        slideShowActive: {
          type: Boolean,
          "default": true
        },
        changeItemOnIndicatorHover: {
          type: Boolean,
          "default": true
        },
        autoPlay: {
          type: Boolean,
          "default": false
        },
        templates: {
          type: null,
          "default": null
        },
        id: {
          type: String,
          "default": null
        }
      },
      mounted: function mounted() {
        if (this.autoPlay) {
          this.$emit('start-slideshow');
        }
      },
      methods: {
        getIndicatorPTOptions: function getIndicatorPTOptions(index) {
          return {
            context: {
              highlighted: this.activeIndex === index
            }
          };
        },
        next: function next() {
          var nextItemIndex = this.activeIndex + 1;
          var activeIndex = this.circular && this.value.length - 1 === this.activeIndex ? 0 : nextItemIndex;
          this.$emit('update:activeIndex', activeIndex);
        },
        prev: function prev() {
          var prevItemIndex = this.activeIndex !== 0 ? this.activeIndex - 1 : 0;
          var activeIndex = this.circular && this.activeIndex === 0 ? this.value.length - 1 : prevItemIndex;
          this.$emit('update:activeIndex', activeIndex);
        },
        stopSlideShow: function stopSlideShow() {
          if (this.slideShowActive && this.stopSlideShow) {
            this.$emit('stop-slideshow');
          }
        },
        navBackward: function navBackward(e) {
          this.stopSlideShow();
          this.prev();
          if (e && e.cancelable) {
            e.preventDefault();
          }
        },
        navForward: function navForward(e) {
          this.stopSlideShow();
          this.next();
          if (e && e.cancelable) {
            e.preventDefault();
          }
        },
        onIndicatorClick: function onIndicatorClick(index) {
          this.stopSlideShow();
          this.$emit('update:activeIndex', index);
        },
        onIndicatorMouseEnter: function onIndicatorMouseEnter(index) {
          if (this.changeItemOnIndicatorHover) {
            this.stopSlideShow();
            this.$emit('update:activeIndex', index);
          }
        },
        onIndicatorKeyDown: function onIndicatorKeyDown(event, index) {
          switch (event.code) {
            case 'Enter':
            case 'NumpadEnter':
            case 'Space':
              this.stopSlideShow();
              this.$emit('update:activeIndex', index);
              event.preventDefault();
              break;
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
            case 'Tab':
              this.onTabKey();
              break;
            case 'ArrowDown':
            case 'ArrowUp':
            case 'PageUp':
            case 'PageDown':
              event.preventDefault();
              break;
          }
        },
        onRightKey: function onRightKey() {
          var indicators = _toConsumableArray$1(utils.DomHandler.find(this.$refs.indicatorContent, '[data-pc-section="indicator"]'));
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
          var indicators = _toConsumableArray$1(utils.DomHandler.find(this.$refs.indicatorContent, '[data-pc-section="indicator"]'));
          var activeIndex = this.findFocusedIndicatorIndex();
          this.changedFocusedIndicator(activeIndex, indicators.length - 1);
        },
        onTabKey: function onTabKey() {
          var indicators = _toConsumableArray$1(utils.DomHandler.find(this.$refs.indicatorContent, '[data-pc-section="indicator"]'));
          var highlightedIndex = indicators.findIndex(function (ind) {
            return utils.DomHandler.getAttribute(ind, 'data-p-highlight') === true;
          });
          var activeIndicator = utils.DomHandler.findSingle(this.$refs.indicatorContent, '[data-pc-section="indicator"] > button[tabindex="0"]');
          var activeIndex = indicators.findIndex(function (ind) {
            return ind === activeIndicator.parentElement;
          });
          indicators[activeIndex].children[0].tabIndex = '-1';
          indicators[highlightedIndex].children[0].tabIndex = '0';
        },
        findFocusedIndicatorIndex: function findFocusedIndicatorIndex() {
          var indicators = _toConsumableArray$1(utils.DomHandler.find(this.$refs.indicatorContent, '[data-pc-section="indicator"]'));
          var activeIndicator = utils.DomHandler.findSingle(this.$refs.indicatorContent, '[data-pc-section="indicator"] > button[tabindex="0"]');
          return indicators.findIndex(function (ind) {
            return ind === activeIndicator.parentElement;
          });
        },
        changedFocusedIndicator: function changedFocusedIndicator(prevInd, nextInd) {
          var indicators = _toConsumableArray$1(utils.DomHandler.find(this.$refs.indicatorContent, '[data-pc-section="indicator"]'));
          indicators[prevInd].children[0].tabIndex = '-1';
          indicators[nextInd].children[0].tabIndex = '0';
          indicators[nextInd].children[0].focus();
        },
        isIndicatorItemActive: function isIndicatorItemActive(index) {
          return this.activeIndex === index;
        },
        isNavBackwardDisabled: function isNavBackwardDisabled() {
          return !this.circular && this.activeIndex === 0;
        },
        isNavForwardDisabled: function isNavForwardDisabled() {
          return !this.circular && this.activeIndex === this.value.length - 1;
        },
        ariaSlideNumber: function ariaSlideNumber(value) {
          return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.slideNumber.replace(/{slideNumber}/g, value) : undefined;
        },
        ariaPageLabel: function ariaPageLabel(value) {
          return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g, value) : undefined;
        }
      },
      computed: {
        activeItem: function activeItem() {
          return this.value[this.activeIndex];
        },
        ariaSlideLabel: function ariaSlideLabel() {
          return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.slide : undefined;
        }
      },
      components: {
        ChevronLeftIcon: ChevronLeftIcon__default["default"],
        ChevronRightIcon: ChevronRightIcon__default["default"]
      },
      directives: {
        ripple: Ripple__default["default"]
      }
    };

    var _hoisted_1$3 = ["disabled"];
    var _hoisted_2$2 = ["id", "aria-label", "aria-roledescription"];
    var _hoisted_3$2 = ["disabled"];
    var _hoisted_4$1 = ["aria-label", "aria-selected", "aria-controls", "onClick", "onMouseenter", "onKeydown", "data-p-highlight"];
    var _hoisted_5 = ["tabindex"];
    function render$3(_ctx, _cache, $props, $setup, $data, $options) {
      var _directive_ripple = vue.resolveDirective("ripple");
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('itemWrapper')
      }, _ctx.ptm('itemWrapper')), [vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('itemContainer')
      }, _ctx.ptm('itemContainer')), [$props.showItemNavigators ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
        key: 0,
        type: "button",
        "class": _ctx.cx('previousItemButton'),
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return $options.navBackward($event);
        }),
        disabled: $options.isNavBackwardDisabled()
      }, _ctx.ptm('previousItemButton'), {
        "data-pc-group-section": "itemnavigator"
      }), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.previousitemicon || 'ChevronLeftIcon'), vue.mergeProps({
        "class": _ctx.cx('previousItemIcon')
      }, _ctx.ptm('previousItemIcon')), null, 16, ["class"]))], 16, _hoisted_1$3)), [[_directive_ripple]]) : vue.createCommentVNode("", true), vue.createElementVNode("div", vue.mergeProps({
        id: $props.id + '_item_' + $props.activeIndex,
        "class": _ctx.cx('item'),
        role: "group",
        "aria-label": $options.ariaSlideNumber($props.activeIndex + 1),
        "aria-roledescription": $options.ariaSlideLabel
      }, _ctx.ptm('item')), [$props.templates.item ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.item), {
        key: 0,
        item: $options.activeItem
      }, null, 8, ["item"])) : vue.createCommentVNode("", true)], 16, _hoisted_2$2), $props.showItemNavigators ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
        key: 1,
        type: "button",
        "class": _ctx.cx('nextItemButton'),
        onClick: _cache[1] || (_cache[1] = function ($event) {
          return $options.navForward($event);
        }),
        disabled: $options.isNavForwardDisabled()
      }, _ctx.ptm('nextItemButton'), {
        "data-pc-group-section": "itemnavigator"
      }), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.nextitemicon || 'ChevronRightIcon'), vue.mergeProps({
        "class": _ctx.cx('nextItemIcon')
      }, _ctx.ptm('nextItemIcon')), null, 16, ["class"]))], 16, _hoisted_3$2)), [[_directive_ripple]]) : vue.createCommentVNode("", true), $props.templates['caption'] ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: 2,
        "class": _ctx.cx('caption')
      }, _ctx.ptm('caption')), [$props.templates.caption ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.caption), {
        key: 0,
        item: $options.activeItem
      }, null, 8, ["item"])) : vue.createCommentVNode("", true)], 16)) : vue.createCommentVNode("", true)], 16), $props.showIndicators ? (vue.openBlock(), vue.createElementBlock("ul", vue.mergeProps({
        key: 0,
        ref: "indicatorContent",
        "class": _ctx.cx('indicators')
      }, _ctx.ptm('indicators')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.value, function (item, index) {
        return vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
          key: "p-galleria-indicator-".concat(index),
          "class": _ctx.cx('indicator', {
            index: index
          }),
          "aria-label": $options.ariaPageLabel(index + 1),
          "aria-selected": $props.activeIndex === index,
          "aria-controls": $props.id + '_item_' + index,
          onClick: function onClick($event) {
            return $options.onIndicatorClick(index);
          },
          onMouseenter: function onMouseenter($event) {
            return $options.onIndicatorMouseEnter(index);
          },
          onKeydown: function onKeydown($event) {
            return $options.onIndicatorKeyDown($event, index);
          }
        }, _ctx.ptm('indicator', $options.getIndicatorPTOptions(index)), {
          "data-p-highlight": $options.isIndicatorItemActive(index)
        }), [!$props.templates['indicator'] ? (vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
          key: 0,
          type: "button",
          tabindex: $props.activeIndex === index ? '0' : '-1',
          "class": _ctx.cx('indicatorButton')
        }, _ctx.ptm('indicatorButton', $options.getIndicatorPTOptions(index))), null, 16, _hoisted_5)) : vue.createCommentVNode("", true), $props.templates.indicator ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.indicator), {
          key: 1,
          index: index
        }, null, 8, ["index"])) : vue.createCommentVNode("", true)], 16, _hoisted_4$1);
      }), 128))], 16)) : vue.createCommentVNode("", true)], 16);
    }

    script$3.render = render$3;

    function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
    function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
    function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
    function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
    var script$2 = {
      name: 'GalleriaThumbnails',
      hostName: 'Galleria',
      "extends": BaseComponent__default["default"],
      emits: ['stop-slideshow', 'update:activeIndex'],
      props: {
        containerId: {
          type: String,
          "default": null
        },
        value: {
          type: Array,
          "default": null
        },
        numVisible: {
          type: Number,
          "default": 3
        },
        activeIndex: {
          type: Number,
          "default": 0
        },
        isVertical: {
          type: Boolean,
          "default": false
        },
        slideShowActive: {
          type: Boolean,
          "default": false
        },
        circular: {
          type: Boolean,
          "default": false
        },
        responsiveOptions: {
          type: Array,
          "default": null
        },
        contentHeight: {
          type: String,
          "default": '300px'
        },
        showThumbnailNavigators: {
          type: Boolean,
          "default": true
        },
        templates: {
          type: null,
          "default": null
        },
        prevButtonProps: {
          type: null,
          "default": null
        },
        nextButtonProps: {
          type: null,
          "default": null
        }
      },
      startPos: null,
      thumbnailsStyle: null,
      sortedResponsiveOptions: null,
      data: function data() {
        return {
          d_numVisible: this.numVisible,
          d_oldNumVisible: this.numVisible,
          d_activeIndex: this.activeIndex,
          d_oldActiveItemIndex: this.activeIndex,
          totalShiftedItems: 0,
          page: 0
        };
      },
      watch: {
        numVisible: function numVisible(newValue, oldValue) {
          this.d_numVisible = newValue;
          this.d_oldNumVisible = oldValue;
        },
        activeIndex: function activeIndex(newValue, oldValue) {
          this.d_activeIndex = newValue;
          this.d_oldActiveItemIndex = oldValue;
        }
      },
      mounted: function mounted() {
        this.createStyle();
        this.calculatePosition();
        if (this.responsiveOptions) {
          this.bindDocumentListeners();
        }
      },
      updated: function updated() {
        var totalShiftedItems = this.totalShiftedItems;
        if (this.d_oldNumVisible !== this.d_numVisible || this.d_oldActiveItemIndex !== this.d_activeIndex) {
          if (this.d_activeIndex <= this.getMedianItemIndex()) {
            totalShiftedItems = 0;
          } else if (this.value.length - this.d_numVisible + this.getMedianItemIndex() < this.d_activeIndex) {
            totalShiftedItems = this.d_numVisible - this.value.length;
          } else if (this.value.length - this.d_numVisible < this.d_activeIndex && this.d_numVisible % 2 === 0) {
            totalShiftedItems = this.d_activeIndex * -1 + this.getMedianItemIndex() + 1;
          } else {
            totalShiftedItems = this.d_activeIndex * -1 + this.getMedianItemIndex();
          }
          if (totalShiftedItems !== this.totalShiftedItems) {
            this.totalShiftedItems = totalShiftedItems;
          }
          this.$refs.itemsContainer.style.transform = this.isVertical ? "translate3d(0, ".concat(totalShiftedItems * (100 / this.d_numVisible), "%, 0)") : "translate3d(".concat(totalShiftedItems * (100 / this.d_numVisible), "%, 0, 0)");
          if (this.d_oldActiveItemIndex !== this.d_activeIndex) {
            document.body.setAttribute('data-p-items-hidden', 'false');
            !this.isUnstyled && utils.DomHandler.removeClass(this.$refs.itemsContainer, 'p-items-hidden');
            this.$refs.itemsContainer.style.transition = 'transform 500ms ease 0s';
          }
          this.d_oldActiveItemIndex = this.d_activeIndex;
          this.d_oldNumVisible = this.d_numVisible;
        }
      },
      beforeUnmount: function beforeUnmount() {
        if (this.responsiveOptions) {
          this.unbindDocumentListeners();
        }
        if (this.thumbnailsStyle) {
          this.thumbnailsStyle.parentNode.removeChild(this.thumbnailsStyle);
        }
      },
      methods: {
        step: function step(dir) {
          var totalShiftedItems = this.totalShiftedItems + dir;
          if (dir < 0 && -1 * totalShiftedItems + this.d_numVisible > this.value.length - 1) {
            totalShiftedItems = this.d_numVisible - this.value.length;
          } else if (dir > 0 && totalShiftedItems > 0) {
            totalShiftedItems = 0;
          }
          if (this.circular) {
            if (dir < 0 && this.value.length - 1 === this.d_activeIndex) {
              totalShiftedItems = 0;
            } else if (dir > 0 && this.d_activeIndex === 0) {
              totalShiftedItems = this.d_numVisible - this.value.length;
            }
          }
          if (this.$refs.itemsContainer) {
            document.body.setAttribute('data-p-items-hidden', 'false');
            !this.isUnstyled && utils.DomHandler.removeClass(this.$refs.itemsContainer, 'p-items-hidden');
            this.$refs.itemsContainer.style.transform = this.isVertical ? "translate3d(0, ".concat(totalShiftedItems * (100 / this.d_numVisible), "%, 0)") : "translate3d(".concat(totalShiftedItems * (100 / this.d_numVisible), "%, 0, 0)");
            this.$refs.itemsContainer.style.transition = 'transform 500ms ease 0s';
          }
          this.totalShiftedItems = totalShiftedItems;
        },
        stopSlideShow: function stopSlideShow() {
          if (this.slideShowActive && this.stopSlideShow) {
            this.$emit('stop-slideshow');
          }
        },
        getMedianItemIndex: function getMedianItemIndex() {
          var index = Math.floor(this.d_numVisible / 2);
          return this.d_numVisible % 2 ? index : index - 1;
        },
        navBackward: function navBackward(e) {
          this.stopSlideShow();
          var prevItemIndex = this.d_activeIndex !== 0 ? this.d_activeIndex - 1 : 0;
          var diff = prevItemIndex + this.totalShiftedItems;
          if (this.d_numVisible - diff - 1 > this.getMedianItemIndex() && (-1 * this.totalShiftedItems !== 0 || this.circular)) {
            this.step(1);
          }
          var activeIndex = this.circular && this.d_activeIndex === 0 ? this.value.length - 1 : prevItemIndex;
          this.$emit('update:activeIndex', activeIndex);
          if (e.cancelable) {
            e.preventDefault();
          }
        },
        navForward: function navForward(e) {
          this.stopSlideShow();
          var nextItemIndex = this.d_activeIndex === this.value.length - 1 ? this.value.length - 1 : this.d_activeIndex + 1;
          if (nextItemIndex + this.totalShiftedItems > this.getMedianItemIndex() && (-1 * this.totalShiftedItems < this.getTotalPageNumber() - 1 || this.circular)) {
            this.step(-1);
          }
          var activeIndex = this.circular && this.value.length - 1 === this.d_activeIndex ? 0 : nextItemIndex;
          this.$emit('update:activeIndex', activeIndex);
          if (e.cancelable) {
            e.preventDefault();
          }
        },
        onItemClick: function onItemClick(index) {
          this.stopSlideShow();
          var selectedItemIndex = index;
          if (selectedItemIndex !== this.d_activeIndex) {
            var diff = selectedItemIndex + this.totalShiftedItems;
            var dir = 0;
            if (selectedItemIndex < this.d_activeIndex) {
              dir = this.d_numVisible - diff - 1 - this.getMedianItemIndex();
              if (dir > 0 && -1 * this.totalShiftedItems !== 0) {
                this.step(dir);
              }
            } else {
              dir = this.getMedianItemIndex() - diff;
              if (dir < 0 && -1 * this.totalShiftedItems < this.getTotalPageNumber() - 1) {
                this.step(dir);
              }
            }
            this.$emit('update:activeIndex', selectedItemIndex);
          }
        },
        onThumbnailKeydown: function onThumbnailKeydown(event, index) {
          if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space') {
            this.onItemClick(index);
            event.preventDefault();
          }
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
              event.preventDefault();
              break;
            case 'Tab':
              this.onTabKey();
              break;
          }
        },
        onRightKey: function onRightKey() {
          var indicators = utils.DomHandler.find(this.$refs.itemsContainer, '[data-pc-section="thumbnailitem"]');
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
          var indicators = utils.DomHandler.find(this.$refs.itemsContainer, '[data-pc-section="thumbnailitem"]');
          var activeIndex = this.findFocusedIndicatorIndex();
          this.changedFocusedIndicator(activeIndex, indicators.length - 1);
        },
        onTabKey: function onTabKey() {
          var indicators = _toConsumableArray(utils.DomHandler.find(this.$refs.itemsContainer, '[data-pc-section="thumbnailitem"]'));
          var highlightedIndex = indicators.findIndex(function (ind) {
            return utils.DomHandler.getAttribute(ind, 'data-p-active') === true;
          });
          var activeIndicator = utils.DomHandler.findSingle(this.$refs.itemsContainer, '[tabindex="0"]');
          var activeIndex = indicators.findIndex(function (ind) {
            return ind === activeIndicator.parentElement;
          });
          indicators[activeIndex].children[0].tabIndex = '-1';
          indicators[highlightedIndex].children[0].tabIndex = '0';
        },
        findFocusedIndicatorIndex: function findFocusedIndicatorIndex() {
          var indicators = _toConsumableArray(utils.DomHandler.find(this.$refs.itemsContainer, '[data-pc-section="thumbnailitem"]'));
          var activeIndicator = utils.DomHandler.findSingle(this.$refs.itemsContainer, '[data-pc-section="thumbnailitem"] > [tabindex="0"]');
          return indicators.findIndex(function (ind) {
            return ind === activeIndicator.parentElement;
          });
        },
        changedFocusedIndicator: function changedFocusedIndicator(prevInd, nextInd) {
          var indicators = utils.DomHandler.find(this.$refs.itemsContainer, '[data-pc-section="thumbnailitem"]');
          indicators[prevInd].children[0].tabIndex = '-1';
          indicators[nextInd].children[0].tabIndex = '0';
          indicators[nextInd].children[0].focus();
        },
        onTransitionEnd: function onTransitionEnd(e) {
          if (this.$refs.itemsContainer && e.propertyName === 'transform') {
            document.body.setAttribute('data-p-items-hidden', 'true');
            !this.isUnstyled && utils.DomHandler.addClass(this.$refs.itemsContainer, 'p-items-hidden');
            this.$refs.itemsContainer.style.transition = '';
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
          if (e.cancelable) {
            e.preventDefault();
          }
        },
        onTouchEnd: function onTouchEnd(e) {
          var touchobj = e.changedTouches[0];
          if (this.isVertical) {
            this.changePageOnTouch(e, touchobj.pageY - this.startPos.y);
          } else {
            this.changePageOnTouch(e, touchobj.pageX - this.startPos.x);
          }
        },
        changePageOnTouch: function changePageOnTouch(e, diff) {
          if (diff < 0) {
            // left
            this.navForward(e);
          } else {
            // right
            this.navBackward(e);
          }
        },
        getTotalPageNumber: function getTotalPageNumber() {
          return this.value.length > this.d_numVisible ? this.value.length - this.d_numVisible + 1 : 0;
        },
        createStyle: function createStyle() {
          if (!this.thumbnailsStyle) {
            var _this$$primevue;
            this.thumbnailsStyle = document.createElement('style');
            this.thumbnailsStyle.type = 'text/css';
            utils.DomHandler.setAttribute(this.thumbnailsStyle, 'nonce', (_this$$primevue = this.$primevue) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.config) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.csp) === null || _this$$primevue === void 0 ? void 0 : _this$$primevue.nonce);
            document.body.appendChild(this.thumbnailsStyle);
          }
          var innerHTML = "\n                #".concat(this.containerId, " [data-pc-section=\"thumbnailitem\"] {\n                    flex: 1 0 ").concat(100 / this.d_numVisible, "%\n                }\n            ");
          if (this.responsiveOptions && !this.isUnstyled) {
            this.sortedResponsiveOptions = _toConsumableArray(this.responsiveOptions);
            var comparer = utils.ObjectUtils.localeComparator();
            this.sortedResponsiveOptions.sort(function (data1, data2) {
              var value1 = data1.breakpoint;
              var value2 = data2.breakpoint;
              return utils.ObjectUtils.sort(value1, value2, -1, comparer);
            });
            for (var i = 0; i < this.sortedResponsiveOptions.length; i++) {
              var res = this.sortedResponsiveOptions[i];
              innerHTML += "\n                        @media screen and (max-width: ".concat(res.breakpoint, ") {\n                            #").concat(this.containerId, " .p-galleria-thumbnail-item {\n                                flex: 1 0 ").concat(100 / res.numVisible, "%\n                            }\n                        }\n                    ");
            }
          }
          this.thumbnailsStyle.innerHTML = innerHTML;
        },
        calculatePosition: function calculatePosition() {
          if (this.$refs.itemsContainer && this.sortedResponsiveOptions) {
            var windowWidth = window.innerWidth;
            var matchedResponsiveData = {
              numVisible: this.numVisible
            };
            for (var i = 0; i < this.sortedResponsiveOptions.length; i++) {
              var res = this.sortedResponsiveOptions[i];
              if (parseInt(res.breakpoint, 10) >= windowWidth) {
                matchedResponsiveData = res;
              }
            }
            if (this.d_numVisible !== matchedResponsiveData.numVisible) {
              this.d_numVisible = matchedResponsiveData.numVisible;
            }
          }
        },
        bindDocumentListeners: function bindDocumentListeners() {
          var _this = this;
          if (!this.documentResizeListener) {
            this.documentResizeListener = function () {
              _this.calculatePosition();
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
        isNavBackwardDisabled: function isNavBackwardDisabled() {
          return !this.circular && this.d_activeIndex === 0 || this.value.length <= this.d_numVisible;
        },
        isNavForwardDisabled: function isNavForwardDisabled() {
          return !this.circular && this.d_activeIndex === this.value.length - 1 || this.value.length <= this.d_numVisible;
        },
        firstItemAciveIndex: function firstItemAciveIndex() {
          return this.totalShiftedItems * -1;
        },
        lastItemActiveIndex: function lastItemActiveIndex() {
          return this.firstItemAciveIndex() + this.d_numVisible - 1;
        },
        isItemActive: function isItemActive(index) {
          return this.firstItemAciveIndex() <= index && this.lastItemActiveIndex() >= index;
        },
        ariaPageLabel: function ariaPageLabel(value) {
          return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g, value) : undefined;
        }
      },
      computed: {
        ariaPrevButtonLabel: function ariaPrevButtonLabel() {
          return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.prevPageLabel : undefined;
        },
        ariaNextButtonLabel: function ariaNextButtonLabel() {
          return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.nextPageLabel : undefined;
        }
      },
      components: {
        ChevronLeftIcon: ChevronLeftIcon__default["default"],
        ChevronRightIcon: ChevronRightIcon__default["default"],
        ChevronUpIcon: ChevronUpIcon__default["default"],
        ChevronDownIcon: ChevronDownIcon__default["default"]
      },
      directives: {
        ripple: Ripple__default["default"]
      }
    };

    function _typeof$2(o) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$2(o); }
    function ownKeys$2(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
    function _objectSpread$2(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$2(Object(t), !0).forEach(function (r) { _defineProperty$2(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
    function _defineProperty$2(obj, key, value) { key = _toPropertyKey$2(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey$2(t) { var i = _toPrimitive$2(t, "string"); return "symbol" == _typeof$2(i) ? i : String(i); }
    function _toPrimitive$2(t, r) { if ("object" != _typeof$2(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$2(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
    var _hoisted_1$2 = ["disabled", "aria-label"];
    var _hoisted_2$1 = ["data-p-active", "aria-selected", "aria-controls", "onKeydown", "data-p-galleria-thumbnail-item-current", "data-p-galleria-thumbnail-item-active", "data-p-galleria-thumbnail-item-start", "data-p-galleria-thumbnail-item-end"];
    var _hoisted_3$1 = ["tabindex", "aria-label", "aria-current", "onClick"];
    var _hoisted_4 = ["disabled", "aria-label"];
    function render$2(_ctx, _cache, $props, $setup, $data, $options) {
      var _directive_ripple = vue.resolveDirective("ripple");
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('thumbnailWrapper')
      }, _ctx.ptm('thumbnailWrapper')), [vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('thumbnailContainer')
      }, _ctx.ptm('thumbnailContainer')), [$props.showThumbnailNavigators ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
        key: 0,
        "class": _ctx.cx('previousThumbnailButton'),
        disabled: $options.isNavBackwardDisabled(),
        type: "button",
        "aria-label": $options.ariaPrevButtonLabel,
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return $options.navBackward($event);
        })
      }, _objectSpread$2(_objectSpread$2({}, $props.prevButtonProps), _ctx.ptm('previousThumbnailButton')), {
        "data-pc-group-section": "thumbnailnavigator"
      }), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.previousthumbnailicon || ($props.isVertical ? 'ChevronUpIcon' : 'ChevronLeftIcon')), vue.mergeProps({
        "class": _ctx.cx('previousThumbnailIcon')
      }, _ctx.ptm('previousThumbnailIcon')), null, 16, ["class"]))], 16, _hoisted_1$2)), [[_directive_ripple]]) : vue.createCommentVNode("", true), vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('thumbnailItemsContainer'),
        style: {
          height: $props.isVertical ? $props.contentHeight : ''
        }
      }, _ctx.ptm('thumbnailItemsContainer')), [vue.createElementVNode("div", vue.mergeProps({
        ref: "itemsContainer",
        "class": _ctx.cx('thumbnailItems'),
        role: "tablist",
        onTransitionend: _cache[1] || (_cache[1] = function ($event) {
          return $options.onTransitionEnd($event);
        }),
        onTouchstart: _cache[2] || (_cache[2] = function ($event) {
          return $options.onTouchStart($event);
        }),
        onTouchmove: _cache[3] || (_cache[3] = function ($event) {
          return $options.onTouchMove($event);
        }),
        onTouchend: _cache[4] || (_cache[4] = function ($event) {
          return $options.onTouchEnd($event);
        })
      }, _ctx.ptm('thumbnailItems')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.value, function (item, index) {
        return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
          key: "p-galleria-thumbnail-item-".concat(index),
          "class": _ctx.cx('thumbnailItem', {
            index: index,
            activeIndex: $props.activeIndex
          }),
          role: "tab",
          "data-p-active": $props.activeIndex === index,
          "aria-selected": $props.activeIndex === index,
          "aria-controls": $props.containerId + '_item_' + index,
          onKeydown: function onKeydown($event) {
            return $options.onThumbnailKeydown($event, index);
          }
        }, _ctx.ptm('thumbnailItem'), {
          "data-p-galleria-thumbnail-item-current": $props.activeIndex === index,
          "data-p-galleria-thumbnail-item-active": $options.isItemActive(index),
          "data-p-galleria-thumbnail-item-start": $options.firstItemAciveIndex() === index,
          "data-p-galleria-thumbnail-item-end": $options.lastItemActiveIndex() === index
        }), [vue.createElementVNode("div", vue.mergeProps({
          "class": _ctx.cx('thumbnailItemContent'),
          tabindex: $props.activeIndex === index ? '0' : '-1',
          "aria-label": $options.ariaPageLabel(index + 1),
          "aria-current": $props.activeIndex === index ? 'page' : undefined,
          onClick: function onClick($event) {
            return $options.onItemClick(index);
          }
        }, _ctx.ptm('thumbnailItemContent')), [$props.templates.thumbnail ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.thumbnail), {
          key: 0,
          item: item
        }, null, 8, ["item"])) : vue.createCommentVNode("", true)], 16, _hoisted_3$1)], 16, _hoisted_2$1);
      }), 128))], 16)], 16), $props.showThumbnailNavigators ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
        key: 1,
        "class": _ctx.cx('nextThumbnailButton'),
        disabled: $options.isNavForwardDisabled(),
        type: "button",
        "aria-label": $options.ariaNextButtonLabel,
        onClick: _cache[5] || (_cache[5] = function ($event) {
          return $options.navForward($event);
        })
      }, _objectSpread$2(_objectSpread$2({}, $props.nextButtonProps), _ctx.ptm('nextThumbnailButton')), {
        "data-pc-group-section": "thumbnailnavigator"
      }), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates.nextthumbnailicon || ($props.isVertical ? 'ChevronDownIcon' : 'ChevronRightIcon')), vue.mergeProps({
        "class": _ctx.cx('nextThumbnailIcon')
      }, _ctx.ptm('nextThumbnailIcon')), null, 16, ["class"]))], 16, _hoisted_4)), [[_directive_ripple]]) : vue.createCommentVNode("", true)], 16)], 16);
    }

    script$2.render = render$2;

    function _typeof$1(o) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof$1(o); }
    function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
    function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty$1(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
    function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey$1(t) { var i = _toPrimitive$1(t, "string"); return "symbol" == _typeof$1(i) ? i : String(i); }
    function _toPrimitive$1(t, r) { if ("object" != _typeof$1(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof$1(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
    var script$1 = {
      name: 'GalleriaContent',
      hostName: 'Galleria',
      "extends": BaseComponent__default["default"],
      inheritAttrs: false,
      interval: null,
      emits: ['activeitem-change', 'mask-hide'],
      data: function data() {
        return {
          id: this.$attrs.id || utils.UniqueComponentId(),
          activeIndex: this.$attrs.activeIndex,
          numVisible: this.$attrs.numVisible,
          slideShowActive: false
        };
      },
      watch: {
        '$attrs.id': function $attrsId(newValue) {
          this.id = newValue || utils.UniqueComponentId();
        },
        '$attrs.value': function $attrsValue(newVal) {
          if (newVal && newVal.length < this.numVisible) {
            this.numVisible = newVal.length;
          }
        },
        '$attrs.activeIndex': function $attrsActiveIndex(newVal) {
          this.activeIndex = newVal;
        },
        '$attrs.numVisible': function $attrsNumVisible(newVal) {
          this.numVisible = newVal;
        },
        '$attrs.autoPlay': function $attrsAutoPlay(newVal) {
          newVal ? this.startSlideShow() : this.stopSlideShow();
        }
      },
      mounted: function mounted() {
        this.id = this.id || utils.UniqueComponentId();
      },
      updated: function updated() {
        this.$emit('activeitem-change', this.activeIndex);
      },
      beforeUnmount: function beforeUnmount() {
        if (this.slideShowActive) {
          this.stopSlideShow();
        }
      },
      methods: {
        getPTOptions: function getPTOptions(key) {
          return this.ptm(key, {
            props: _objectSpread$1(_objectSpread$1({}, this.$attrs), {}, {
              pt: this.pt,
              unstyled: this.unstyled
            })
          });
        },
        isAutoPlayActive: function isAutoPlayActive() {
          return this.slideShowActive;
        },
        startSlideShow: function startSlideShow() {
          var _this = this;
          this.interval = setInterval(function () {
            var activeIndex = _this.$attrs.circular && _this.$attrs.value.length - 1 === _this.activeIndex ? 0 : _this.activeIndex + 1;
            _this.activeIndex = activeIndex;
          }, this.$attrs.transitionInterval);
          this.slideShowActive = true;
        },
        stopSlideShow: function stopSlideShow() {
          if (this.interval) {
            clearInterval(this.interval);
          }
          this.slideShowActive = false;
        },
        getPositionClass: function getPositionClass(preClassName, position) {
          var positions = ['top', 'left', 'bottom', 'right'];
          var pos = positions.find(function (item) {
            return item === position;
          });
          return pos ? "".concat(preClassName, "-").concat(pos) : '';
        },
        isVertical: function isVertical() {
          return this.$attrs.thumbnailsPosition === 'left' || this.$attrs.thumbnailsPosition === 'right';
        }
      },
      computed: {
        closeAriaLabel: function closeAriaLabel() {
          return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
        }
      },
      components: {
        GalleriaItem: script$3,
        GalleriaThumbnails: script$2,
        TimesIcon: TimesIcon__default["default"]
      },
      directives: {
        ripple: Ripple__default["default"]
      }
    };

    function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
    function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
    function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
    function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
    var _hoisted_1$1 = ["id", "aria-label", "aria-roledescription"];
    var _hoisted_2 = ["aria-label"];
    var _hoisted_3 = ["aria-live"];
    function render$1(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_GalleriaItem = vue.resolveComponent("GalleriaItem");
      var _component_GalleriaThumbnails = vue.resolveComponent("GalleriaThumbnails");
      var _directive_ripple = vue.resolveDirective("ripple");
      return _ctx.$attrs.value && _ctx.$attrs.value.length > 0 ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: 0,
        id: $data.id,
        role: "region",
        "class": [_ctx.cx('root'), _ctx.$attrs.containerClass],
        style: _ctx.$attrs.containerStyle,
        "aria-label": _ctx.$attrs.ariaLabel,
        "aria-roledescription": _ctx.$attrs.ariaRoledescription
      }, _objectSpread(_objectSpread({}, _ctx.$attrs.containerProps), $options.getPTOptions('root'))), [_ctx.$attrs.fullScreen ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
        key: 0,
        autofocus: "",
        type: "button",
        "class": _ctx.cx('closeButton'),
        "aria-label": $options.closeAriaLabel,
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return _ctx.$emit('mask-hide');
        })
      }, $options.getPTOptions('closeButton')), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$attrs.templates['closeicon'] || 'TimesIcon'), vue.mergeProps({
        "class": _ctx.cx('closeIcon')
      }, $options.getPTOptions('closeIcon')), null, 16, ["class"]))], 16, _hoisted_2)), [[_directive_ripple]]) : vue.createCommentVNode("", true), _ctx.$attrs.templates && _ctx.$attrs.templates['header'] ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: 1,
        "class": _ctx.cx('header')
      }, $options.getPTOptions('header')), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$attrs.templates['header'])))], 16)) : vue.createCommentVNode("", true), vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('content'),
        "aria-live": _ctx.$attrs.autoPlay ? 'polite' : 'off'
      }, $options.getPTOptions('content')), [vue.createVNode(_component_GalleriaItem, {
        id: $data.id,
        activeIndex: $data.activeIndex,
        "onUpdate:activeIndex": _cache[1] || (_cache[1] = function ($event) {
          return $data.activeIndex = $event;
        }),
        slideShowActive: $data.slideShowActive,
        "onUpdate:slideShowActive": _cache[2] || (_cache[2] = function ($event) {
          return $data.slideShowActive = $event;
        }),
        value: _ctx.$attrs.value,
        circular: _ctx.$attrs.circular,
        templates: _ctx.$attrs.templates,
        showIndicators: _ctx.$attrs.showIndicators,
        changeItemOnIndicatorHover: _ctx.$attrs.changeItemOnIndicatorHover,
        showItemNavigators: _ctx.$attrs.showItemNavigators,
        autoPlay: _ctx.$attrs.autoPlay,
        onStartSlideshow: $options.startSlideShow,
        onStopSlideshow: $options.stopSlideShow,
        pt: _ctx.pt,
        unstyled: _ctx.unstyled
      }, null, 8, ["id", "activeIndex", "slideShowActive", "value", "circular", "templates", "showIndicators", "changeItemOnIndicatorHover", "showItemNavigators", "autoPlay", "onStartSlideshow", "onStopSlideshow", "pt", "unstyled"]), _ctx.$attrs.showThumbnails ? (vue.openBlock(), vue.createBlock(_component_GalleriaThumbnails, {
        key: 0,
        activeIndex: $data.activeIndex,
        "onUpdate:activeIndex": _cache[3] || (_cache[3] = function ($event) {
          return $data.activeIndex = $event;
        }),
        slideShowActive: $data.slideShowActive,
        "onUpdate:slideShowActive": _cache[4] || (_cache[4] = function ($event) {
          return $data.slideShowActive = $event;
        }),
        containerId: $data.id,
        value: _ctx.$attrs.value,
        templates: _ctx.$attrs.templates,
        numVisible: $data.numVisible,
        responsiveOptions: _ctx.$attrs.responsiveOptions,
        circular: _ctx.$attrs.circular,
        isVertical: $options.isVertical(),
        contentHeight: _ctx.$attrs.verticalThumbnailViewPortHeight,
        showThumbnailNavigators: _ctx.$attrs.showThumbnailNavigators,
        prevButtonProps: _ctx.$attrs.prevButtonProps,
        nextButtonProps: _ctx.$attrs.nextButtonProps,
        onStopSlideshow: $options.stopSlideShow,
        pt: _ctx.pt,
        unstyled: _ctx.unstyled
      }, null, 8, ["activeIndex", "slideShowActive", "containerId", "value", "templates", "numVisible", "responsiveOptions", "circular", "isVertical", "contentHeight", "showThumbnailNavigators", "prevButtonProps", "nextButtonProps", "onStopSlideshow", "pt", "unstyled"])) : vue.createCommentVNode("", true)], 16, _hoisted_3), _ctx.$attrs.templates && _ctx.$attrs.templates['footer'] ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: 2,
        "class": _ctx.cx('footer')
      }, $options.getPTOptions('footer')), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$attrs.templates['footer'])))], 16)) : vue.createCommentVNode("", true)], 16, _hoisted_1$1)) : vue.createCommentVNode("", true);
    }

    script$1.render = render$1;

    var script = {
      name: 'Galleria',
      "extends": script$4,
      inheritAttrs: false,
      emits: ['update:activeIndex', 'update:visible'],
      container: null,
      mask: null,
      data: function data() {
        return {
          containerVisible: this.visible
        };
      },
      updated: function updated() {
        if (this.fullScreen && this.visible) {
          this.containerVisible = this.visible;
        }
      },
      beforeUnmount: function beforeUnmount() {
        if (this.fullScreen) {
          utils.DomHandler.unblockBodyScroll();
        }
        this.mask = null;
        if (this.container) {
          utils.ZIndexUtils.clear(this.container);
          this.container = null;
        }
      },
      methods: {
        onBeforeEnter: function onBeforeEnter(el) {
          utils.ZIndexUtils.set('modal', el, this.baseZIndex || this.$primevue.config.zIndex.modal);
        },
        onEnter: function onEnter(el) {
          this.mask.style.zIndex = String(parseInt(el.style.zIndex, 10) - 1);
          utils.DomHandler.blockBodyScroll();
          this.focus();
        },
        onBeforeLeave: function onBeforeLeave() {
          !this.isUnstyled && utils.DomHandler.addClass(this.mask, 'p-component-overlay-leave');
        },
        onAfterLeave: function onAfterLeave(el) {
          utils.ZIndexUtils.clear(el);
          this.containerVisible = false;
          utils.DomHandler.unblockBodyScroll();
        },
        onActiveItemChange: function onActiveItemChange(index) {
          if (this.activeIndex !== index) {
            this.$emit('update:activeIndex', index);
          }
        },
        maskHide: function maskHide() {
          this.$emit('update:visible', false);
        },
        containerRef: function containerRef(el) {
          this.container = el;
        },
        maskRef: function maskRef(el) {
          this.mask = el;
        },
        focus: function focus() {
          var focusTarget = this.container.$el.querySelector('[autofocus]');
          if (focusTarget) {
            focusTarget.focus();
          }
        }
      },
      components: {
        GalleriaContent: script$1,
        Portal: Portal__default["default"]
      },
      directives: {
        focustrap: FocusTrap__default["default"]
      }
    };

    var _hoisted_1 = ["aria-modal"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_GalleriaContent = vue.resolveComponent("GalleriaContent");
      var _component_Portal = vue.resolveComponent("Portal");
      var _directive_focustrap = vue.resolveDirective("focustrap");
      return _ctx.fullScreen ? (vue.openBlock(), vue.createBlock(_component_Portal, {
        key: 0
      }, {
        "default": vue.withCtx(function () {
          return [$data.containerVisible ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 0,
            ref: $options.maskRef,
            "class": [_ctx.cx('mask'), _ctx.maskClass],
            role: "dialog",
            "aria-modal": _ctx.fullScreen ? 'true' : undefined
          }, _ctx.ptm('mask')), [vue.createVNode(vue.Transition, vue.mergeProps({
            name: "p-galleria",
            onBeforeEnter: $options.onBeforeEnter,
            onEnter: $options.onEnter,
            onBeforeLeave: $options.onBeforeLeave,
            onAfterLeave: $options.onAfterLeave,
            appear: ""
          }, _ctx.ptm('transition')), {
            "default": vue.withCtx(function () {
              return [_ctx.visible ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_GalleriaContent, vue.mergeProps({
                key: 0,
                ref: $options.containerRef,
                onMaskHide: $options.maskHide,
                templates: _ctx.$slots,
                onActiveitemChange: $options.onActiveItemChange,
                pt: _ctx.pt,
                unstyled: _ctx.unstyled
              }, _ctx.$props), null, 16, ["onMaskHide", "templates", "onActiveitemChange", "pt", "unstyled"])), [[_directive_focustrap]]) : vue.createCommentVNode("", true)];
            }),
            _: 1
          }, 16, ["onBeforeEnter", "onEnter", "onBeforeLeave", "onAfterLeave"])], 16, _hoisted_1)) : vue.createCommentVNode("", true)];
        }),
        _: 1
      })) : (vue.openBlock(), vue.createBlock(_component_GalleriaContent, vue.mergeProps({
        key: 1,
        templates: _ctx.$slots,
        onActiveitemChange: $options.onActiveItemChange,
        pt: _ctx.pt,
        unstyled: _ctx.unstyled
      }, _ctx.$props), null, 16, ["templates", "onActiveitemChange", "pt", "unstyled"]));
    }

    script.render = render;

    return script;

})(primevue.focustrap, primevue.portal, primevue.utils, primevue.basecomponent, primevue.galleria.style, primevue.icons.times, primevue.ripple, primevue.icons.chevronleft, primevue.icons.chevronright, Vue, primevue.icons.chevrondown, primevue.icons.chevronup);
