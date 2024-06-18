import ChevronLeftIcon from 'primevue/icons/chevronleft';
import ChevronRightIcon from 'primevue/icons/chevronright';
import { DomHandler } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import TabListStyle from 'primevue/tablist/style';
import { resolveDirective, openBlock, createElementBlock, mergeProps, withDirectives, createBlock, resolveDynamicComponent, createCommentVNode, createElementVNode, renderSlot } from 'vue';

var script$1 = {
  name: 'BaseTabList',
  "extends": BaseComponent,
  props: {},
  style: TabListStyle,
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
      var width = DomHandler.getWidth(content);
      var pos = content.scrollLeft - width;
      content.scrollLeft = pos <= 0 ? 0 : pos;
    },
    onNextButtonClick: function onNextButtonClick() {
      var content = this.$refs.content;
      var width = DomHandler.getWidth(content) - this.getVisibleButtonWidths();
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
      var activeTab = DomHandler.findSingle(content, '[data-pc-name="tab"][data-p-active="true"]');
      if (this.$pcTabs.isVertical()) {
        inkbar.style.height = DomHandler.getOuterHeight(activeTab) + 'px';
        inkbar.style.top = DomHandler.getOffset(activeTab).top - DomHandler.getOffset(tabs).top + 'px';
      } else {
        inkbar.style.width = DomHandler.getOuterWidth(activeTab) + 'px';
        inkbar.style.left = DomHandler.getOffset(activeTab).left - DomHandler.getOffset(tabs).left + 'px';
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
      var _ref = [DomHandler.getWidth(content), DomHandler.getHeight(content)],
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
        return el ? acc + DomHandler.getWidth(el) : acc;
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
    ChevronLeftIcon: ChevronLeftIcon,
    ChevronRightIcon: ChevronRightIcon
  }
};

var _hoisted_1 = ["aria-label", "tabindex"];
var _hoisted_2 = ["aria-orientation"];
var _hoisted_3 = ["aria-label", "tabindex"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("div", mergeProps({
    ref: "list",
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [$options.showNavigators && $data.isPrevButtonEnabled ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
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
  }), [(openBlock(), createBlock(resolveDynamicComponent($options.templates.previousicon || 'ChevronLeftIcon'), mergeProps({
    "aria-hidden": "true"
  }, _ctx.ptm('previousIcon')), null, 16))], 16, _hoisted_1)), [[_directive_ripple]]) : createCommentVNode("", true), createElementVNode("div", mergeProps({
    ref: "content",
    "class": _ctx.cx('content'),
    onScroll: _cache[1] || (_cache[1] = function () {
      return $options.onScroll && $options.onScroll.apply($options, arguments);
    })
  }, _ctx.ptm('content')), [createElementVNode("div", mergeProps({
    ref: "tabs",
    "class": _ctx.cx('tabs'),
    role: "tablist",
    "aria-orientation": $options.$pcTabs.orientation || 'horizontal'
  }, _ctx.ptm('tabs')), [renderSlot(_ctx.$slots, "default"), createElementVNode("span", mergeProps({
    ref: "inkbar",
    "class": _ctx.cx('inkbar'),
    role: "presentation",
    "aria-hidden": "true"
  }, _ctx.ptm('inkbar')), null, 16)], 16, _hoisted_2)], 16), $options.showNavigators && $data.isNextButtonEnabled ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
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
  }), [(openBlock(), createBlock(resolveDynamicComponent($options.templates.nexticon || 'ChevronRightIcon'), mergeProps({
    "aria-hidden": "true"
  }, _ctx.ptm('nextIcon')), null, 16))], 16, _hoisted_3)), [[_directive_ripple]]) : createCommentVNode("", true)], 16);
}

script.render = render;

export { script as default };
