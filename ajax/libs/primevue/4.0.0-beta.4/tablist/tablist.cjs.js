'use strict';

var ChevronLeftIcon = require('primevue/icons/chevronleft');
var ChevronRightIcon = require('primevue/icons/chevronright');
var utils = require('primevue/utils');
var BaseComponent = require('primevue/basecomponent');
var TabListStyle = require('primevue/tablist/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ChevronLeftIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronLeftIcon);
var ChevronRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronRightIcon);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var TabListStyle__default = /*#__PURE__*/_interopDefaultLegacy(TabListStyle);

var script$1 = {
  name: 'BaseTabList',
  "extends": BaseComponent__default["default"],
  props: {},
  style: TabListStyle__default["default"],
  provide: function provide() {
    return {
      $pcTabList: this,
      $parentInstance: this
    };
  }
};

var script = {
  name: 'TabList',
  "extends": script$1,
  inheritAttrs: false,
  inject: ['$pcTabs'],
  data: function data() {
    return {
      isPrevButtonEnabled: false,
      isNextButtonEnabled: true
    };
  },
  resizeObserver: undefined,
  watch: {
    showNavigators: function showNavigators(newValue) {
      newValue ? this.bindResizeObserver() : this.unbindResizeObserver();
    },
    activeValue: {
      flush: 'post',
      handler: function handler() {
        this.updateInkBar();
      }
    }
  },
  mounted: function mounted() {
    var _this = this;
    this.$nextTick(function () {
      _this.updateInkBar();
    });
    if (this.showNavigators) {
      this.updateButtonState();
      this.bindResizeObserver();
    }
  },
  updated: function updated() {
    this.showNavigators && this.updateButtonState();
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindResizeObserver();
  },
  methods: {
    onScroll: function onScroll(event) {
      this.showNavigators && this.updateButtonState();
      event.preventDefault();
    },
    onPrevButtonClick: function onPrevButtonClick() {
      var content = this.$refs.content;
      var width = utils.DomHandler.getWidth(content);
      var pos = content.scrollLeft - width;
      content.scrollLeft = pos <= 0 ? 0 : pos;
    },
    onNextButtonClick: function onNextButtonClick() {
      var content = this.$refs.content;
      var width = utils.DomHandler.getWidth(content) - this.getVisibleButtonWidths();
      var pos = content.scrollLeft + width;
      var lastPos = content.scrollWidth - width;
      content.scrollLeft = pos >= lastPos ? lastPos : pos;
    },
    bindResizeObserver: function bindResizeObserver() {
      var _this2 = this;
      this.resizeObserver = new ResizeObserver(function () {
        return _this2.updateButtonState();
      });
      this.resizeObserver.observe(this.$refs.list);
    },
    unbindResizeObserver: function unbindResizeObserver() {
      var _this$resizeObserver;
      (_this$resizeObserver = this.resizeObserver) === null || _this$resizeObserver === void 0 || _this$resizeObserver.unobserve(this.$refs.list);
      this.resizeObserver = undefined;
    },
    updateInkBar: function updateInkBar() {
      var _this$$refs = this.$refs,
        content = _this$$refs.content,
        inkbar = _this$$refs.inkbar,
        tabs = _this$$refs.tabs;
      var activeTab = utils.DomHandler.findSingle(content, '[data-pc-name="tab"][data-p-active="true"]');
      if (this.$pcTabs.isVertical()) {
        inkbar.style.height = utils.DomHandler.getOuterHeight(activeTab) + 'px';
        inkbar.style.top = utils.DomHandler.getOffset(activeTab).top - utils.DomHandler.getOffset(tabs).top + 'px';
      } else {
        inkbar.style.width = utils.DomHandler.getOuterWidth(activeTab) + 'px';
        inkbar.style.left = utils.DomHandler.getOffset(activeTab).left - utils.DomHandler.getOffset(tabs).left + 'px';
      }
    },
    updateButtonState: function updateButtonState() {
      var _this$$refs2 = this.$refs,
        list = _this$$refs2.list,
        content = _this$$refs2.content;
      var scrollLeft = content.scrollLeft,
        scrollTop = content.scrollTop,
        scrollWidth = content.scrollWidth,
        scrollHeight = content.scrollHeight,
        offsetWidth = content.offsetWidth,
        offsetHeight = content.offsetHeight;
      var _ref = [utils.DomHandler.getWidth(content), utils.DomHandler.getHeight(content)],
        width = _ref[0],
        height = _ref[1];
      if (this.$pcTabs.isVertical()) {
        this.isPrevButtonEnabled = scrollTop !== 0;
        this.isNextButtonEnabled = list.offsetHeight >= offsetHeight && parseInt(scrollTop) !== scrollHeight - height;
      } else {
        this.isPrevButtonEnabled = scrollLeft !== 0;
        this.isNextButtonEnabled = list.offsetWidth >= offsetWidth && parseInt(scrollLeft) !== scrollWidth - width;
      }
    },
    getVisibleButtonWidths: function getVisibleButtonWidths() {
      var _this$$refs3 = this.$refs,
        prevBtn = _this$$refs3.prevBtn,
        nextBtn = _this$$refs3.nextBtn;
      return [prevBtn, nextBtn].reduce(function (acc, el) {
        return el ? acc + utils.DomHandler.getWidth(el) : acc;
      }, 0);
    }
  },
  computed: {
    templates: function templates() {
      return this.$pcTabs.$slots;
    },
    activeValue: function activeValue() {
      return this.$pcTabs.d_value;
    },
    showNavigators: function showNavigators() {
      return this.$pcTabs.scrollable && this.$pcTabs.showNavigators;
    },
    prevButtonAriaLabel: function prevButtonAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.previous : undefined;
    },
    nextButtonAriaLabel: function nextButtonAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.next : undefined;
    }
  },
  components: {
    ChevronLeftIcon: ChevronLeftIcon__default["default"],
    ChevronRightIcon: ChevronRightIcon__default["default"]
  }
};

var _hoisted_1 = ["aria-label", "tabindex"];
var _hoisted_2 = ["aria-orientation"];
var _hoisted_3 = ["aria-label", "tabindex"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    ref: "list",
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [$options.showNavigators && $data.isPrevButtonEnabled ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
    key: 0,
    ref: "prevButton",
    "class": _ctx.cx('previousButton'),
    "aria-label": $options.prevButtonAriaLabel,
    tabindex: $options.$pcTabs.tabindex,
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.onPrevButtonClick && $options.onPrevButtonClick.apply($options, arguments);
    })
  }, _ctx.ptm('previousButton'), {
    "data-pc-group-section": "navigator"
  }), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($options.templates.previousicon || 'ChevronLeftIcon'), vue.mergeProps({
    "aria-hidden": "true"
  }, _ctx.ptm('previousIcon')), null, 16))], 16, _hoisted_1)), [[_directive_ripple]]) : vue.createCommentVNode("", true), vue.createElementVNode("div", vue.mergeProps({
    ref: "content",
    "class": _ctx.cx('content'),
    onScroll: _cache[1] || (_cache[1] = function () {
      return $options.onScroll && $options.onScroll.apply($options, arguments);
    })
  }, _ctx.ptm('content')), [vue.createElementVNode("div", vue.mergeProps({
    ref: "tabs",
    "class": _ctx.cx('tabs'),
    role: "tablist",
    "aria-orientation": $options.$pcTabs.orientation || 'horizontal'
  }, _ctx.ptm('tabs')), [vue.renderSlot(_ctx.$slots, "default"), vue.createElementVNode("span", vue.mergeProps({
    ref: "inkbar",
    "class": _ctx.cx('inkbar'),
    role: "presentation",
    "aria-hidden": "true"
  }, _ctx.ptm('inkbar')), null, 16)], 16, _hoisted_2)], 16), $options.showNavigators && $data.isNextButtonEnabled ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
    key: 1,
    ref: "nextButton",
    "class": _ctx.cx('nextButton'),
    "aria-label": $options.nextButtonAriaLabel,
    tabindex: $options.$pcTabs.tabindex,
    onClick: _cache[2] || (_cache[2] = function () {
      return $options.onNextButtonClick && $options.onNextButtonClick.apply($options, arguments);
    })
  }, _ctx.ptm('nextButton'), {
    "data-pc-group-section": "navigator"
  }), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($options.templates.nexticon || 'ChevronRightIcon'), vue.mergeProps({
    "aria-hidden": "true"
  }, _ctx.ptm('nextIcon')), null, 16))], 16, _hoisted_3)), [[_directive_ripple]]) : vue.createCommentVNode("", true)], 16);
}

script.render = render;

module.exports = script;
