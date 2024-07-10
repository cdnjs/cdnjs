'use strict';

var ChevronLeftIcon = require('primevue/icons/chevronleft');
var ChevronRightIcon = require('primevue/icons/chevronright');
var Ripple = require('primevue/ripple');
var utils = require('primevue/utils');
var vue = require('vue');
var BaseComponent = require('primevue/basecomponent');
var TabViewStyle = require('primevue/tabview/style');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ChevronLeftIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronLeftIcon);
var ChevronRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronRightIcon);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var TabViewStyle__default = /*#__PURE__*/_interopDefaultLegacy(TabViewStyle);

var script$1 = {
  name: 'BaseTabView',
  "extends": BaseComponent__default["default"],
  props: {
    activeIndex: {
      type: Number,
      "default": 0
    },
    lazy: {
      type: Boolean,
      "default": false
    },
    scrollable: {
      type: Boolean,
      "default": false
    },
    tabindex: {
      type: Number,
      "default": 0
    },
    selectOnFocus: {
      type: Boolean,
      "default": false
    },
    previousButtonProps: {
      type: null,
      "default": null
    },
    nextButtonProps: {
      type: null,
      "default": null
    },
    prevIcon: {
      type: String,
      "default": undefined
    },
    nextIcon: {
      type: String,
      "default": undefined
    }
  },
  style: TabViewStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'TabView',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:activeIndex', 'tab-change', 'tab-click'],
  data: function data() {
    return {
      id: this.$attrs.id,
      d_activeIndex: this.activeIndex,
      isPrevButtonDisabled: true,
      isNextButtonDisabled: false
    };
  },
  watch: {
    '$attrs.id': function $attrsId(newValue) {
      this.id = newValue || utils.UniqueComponentId();
    },
    activeIndex: function activeIndex(newValue) {
      this.d_activeIndex = newValue;
      this.scrollInView({
        index: newValue
      });
    }
  },
  mounted: function mounted() {
    this.id = this.id || utils.UniqueComponentId();
    this.updateInkBar();
    this.scrollable && this.updateButtonState();
  },
  updated: function updated() {
    this.updateInkBar();
    this.scrollable && this.updateButtonState();
  },
  methods: {
    isTabPanel: function isTabPanel(child) {
      return child.type.name === 'TabPanel';
    },
    isTabActive: function isTabActive(index) {
      return this.d_activeIndex === index;
    },
    getTabProp: function getTabProp(tab, name) {
      return tab.props ? tab.props[name] : undefined;
    },
    getKey: function getKey(tab, index) {
      return this.getTabProp(tab, 'header') || index;
    },
    getTabHeaderActionId: function getTabHeaderActionId(index) {
      return "".concat(this.id, "_").concat(index, "_header_action");
    },
    getTabContentId: function getTabContentId(index) {
      return "".concat(this.id, "_").concat(index, "_content");
    },
    getTabPT: function getTabPT(tab, key, index) {
      var count = this.tabs.length;
      var tabMetaData = {
        props: tab.props,
        parent: {
          instance: this,
          props: this.$props,
          state: this.$data
        },
        context: {
          index: index,
          count: count,
          first: index === 0,
          last: index === count - 1,
          active: this.isTabActive(index)
        }
      };
      return vue.mergeProps(this.ptm("tab.".concat(key), {
        tab: tabMetaData
      }), this.ptm("tabpanel.".concat(key), {
        tabpanel: tabMetaData
      }), this.ptm("tabpanel.".concat(key), tabMetaData), this.ptmo(this.getTabProp(tab, 'pt'), key, tabMetaData));
    },
    onScroll: function onScroll(event) {
      this.scrollable && this.updateButtonState();
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
    onTabClick: function onTabClick(event, tab, index) {
      this.changeActiveIndex(event, tab, index);
      this.$emit('tab-click', {
        originalEvent: event,
        index: index
      });
    },
    onTabKeyDown: function onTabKeyDown(event, tab, index) {
      switch (event.code) {
        case 'ArrowLeft':
          this.onTabArrowLeftKey(event);
          break;
        case 'ArrowRight':
          this.onTabArrowRightKey(event);
          break;
        case 'Home':
          this.onTabHomeKey(event);
          break;
        case 'End':
          this.onTabEndKey(event);
          break;
        case 'PageDown':
          this.onPageDownKey(event);
          break;
        case 'PageUp':
          this.onPageUpKey(event);
          break;
        case 'Enter':
        case 'NumpadEnter':
        case 'Space':
          this.onTabEnterKey(event, tab, index);
          break;
      }
    },
    onTabArrowRightKey: function onTabArrowRightKey(event) {
      var nextHeaderAction = this.findNextHeaderAction(event.target.parentElement);
      nextHeaderAction ? this.changeFocusedTab(event, nextHeaderAction) : this.onTabHomeKey(event);
      event.preventDefault();
    },
    onTabArrowLeftKey: function onTabArrowLeftKey(event) {
      var prevHeaderAction = this.findPrevHeaderAction(event.target.parentElement);
      prevHeaderAction ? this.changeFocusedTab(event, prevHeaderAction) : this.onTabEndKey(event);
      event.preventDefault();
    },
    onTabHomeKey: function onTabHomeKey(event) {
      var firstHeaderAction = this.findFirstHeaderAction();
      this.changeFocusedTab(event, firstHeaderAction);
      event.preventDefault();
    },
    onTabEndKey: function onTabEndKey(event) {
      var lastHeaderAction = this.findLastHeaderAction();
      this.changeFocusedTab(event, lastHeaderAction);
      event.preventDefault();
    },
    onPageDownKey: function onPageDownKey(event) {
      this.scrollInView({
        index: this.$refs.nav.children.length - 2
      });
      event.preventDefault();
    },
    onPageUpKey: function onPageUpKey(event) {
      this.scrollInView({
        index: 0
      });
      event.preventDefault();
    },
    onTabEnterKey: function onTabEnterKey(event, tab, index) {
      this.changeActiveIndex(event, tab, index);
      event.preventDefault();
    },
    findNextHeaderAction: function findNextHeaderAction(tabElement) {
      var selfCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var headerElement = selfCheck ? tabElement : tabElement.nextElementSibling;
      return headerElement ? utils.DomHandler.getAttribute(headerElement, 'data-p-disabled') || utils.DomHandler.getAttribute(headerElement, 'data-pc-section') === 'inkbar' ? this.findNextHeaderAction(headerElement) : utils.DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]') : null;
    },
    findPrevHeaderAction: function findPrevHeaderAction(tabElement) {
      var selfCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var headerElement = selfCheck ? tabElement : tabElement.previousElementSibling;
      return headerElement ? utils.DomHandler.getAttribute(headerElement, 'data-p-disabled') || utils.DomHandler.getAttribute(headerElement, 'data-pc-section') === 'inkbar' ? this.findPrevHeaderAction(headerElement) : utils.DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]') : null;
    },
    findFirstHeaderAction: function findFirstHeaderAction() {
      return this.findNextHeaderAction(this.$refs.nav.firstElementChild, true);
    },
    findLastHeaderAction: function findLastHeaderAction() {
      return this.findPrevHeaderAction(this.$refs.nav.lastElementChild, true);
    },
    changeActiveIndex: function changeActiveIndex(event, tab, index) {
      if (!this.getTabProp(tab, 'disabled') && this.d_activeIndex !== index) {
        this.d_activeIndex = index;
        this.$emit('update:activeIndex', index);
        this.$emit('tab-change', {
          originalEvent: event,
          index: index
        });
        this.scrollInView({
          index: index
        });
      }
    },
    changeFocusedTab: function changeFocusedTab(event, element) {
      if (element) {
        utils.DomHandler.focus(element);
        this.scrollInView({
          element: element
        });
        if (this.selectOnFocus) {
          var index = parseInt(element.parentElement.dataset.pcIndex, 10);
          var tab = this.tabs[index];
          this.changeActiveIndex(event, tab, index);
        }
      }
    },
    scrollInView: function scrollInView(_ref) {
      var element = _ref.element,
        _ref$index = _ref.index,
        index = _ref$index === void 0 ? -1 : _ref$index;
      var currentElement = element || this.$refs.nav.children[index];
      if (currentElement) {
        currentElement.scrollIntoView && currentElement.scrollIntoView({
          block: 'nearest'
        });
      }
    },
    updateInkBar: function updateInkBar() {
      var tabHeader = this.$refs.nav.children[this.d_activeIndex];
      this.$refs.inkbar.style.width = utils.DomHandler.getWidth(tabHeader) + 'px';
      this.$refs.inkbar.style.left = utils.DomHandler.getOffset(tabHeader).left - utils.DomHandler.getOffset(this.$refs.nav).left + 'px';
    },
    updateButtonState: function updateButtonState() {
      var content = this.$refs.content;
      var scrollLeft = content.scrollLeft,
        scrollWidth = content.scrollWidth;
      var width = utils.DomHandler.getWidth(content);
      this.isPrevButtonDisabled = scrollLeft === 0;
      this.isNextButtonDisabled = parseInt(scrollLeft) === scrollWidth - width;
    },
    getVisibleButtonWidths: function getVisibleButtonWidths() {
      var _this$$refs = this.$refs,
        prevBtn = _this$$refs.prevBtn,
        nextBtn = _this$$refs.nextBtn;
      return [prevBtn, nextBtn].reduce(function (acc, el) {
        return el ? acc + utils.DomHandler.getWidth(el) : acc;
      }, 0);
    }
  },
  computed: {
    tabs: function tabs() {
      var _this = this;
      return this.$slots["default"]().reduce(function (tabs, child) {
        if (_this.isTabPanel(child)) {
          tabs.push(child);
        } else if (child.children && child.children instanceof Array) {
          child.children.forEach(function (nestedChild) {
            if (_this.isTabPanel(nestedChild)) {
              tabs.push(nestedChild);
            }
          });
        }
        return tabs;
      }, []);
    },
    prevButtonAriaLabel: function prevButtonAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.previous : undefined;
    },
    nextButtonAriaLabel: function nextButtonAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.next : undefined;
    }
  },
  directives: {
    ripple: Ripple__default["default"]
  },
  components: {
    ChevronLeftIcon: ChevronLeftIcon__default["default"],
    ChevronRightIcon: ChevronRightIcon__default["default"]
  }
};

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1 = ["tabindex", "aria-label"];
var _hoisted_2 = ["data-p-highlight", "data-p-disabled", "data-pc-index", "data-p-active"];
var _hoisted_3 = ["id", "tabindex", "aria-disabled", "aria-selected", "aria-controls", "onClick", "onKeydown"];
var _hoisted_4 = ["tabindex", "aria-label"];
var _hoisted_5 = ["id", "aria-labelledby", "data-pc-index", "data-p-active"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root'),
    role: "tablist"
  }, _ctx.ptmi('root')), [vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('navContainer')
  }, _ctx.ptm('navContainer')), [_ctx.scrollable && !$data.isPrevButtonDisabled ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
    key: 0,
    ref: "prevBtn",
    type: "button",
    "class": _ctx.cx('previousButton'),
    tabindex: _ctx.tabindex,
    "aria-label": $options.prevButtonAriaLabel,
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.onPrevButtonClick && $options.onPrevButtonClick.apply($options, arguments);
    })
  }, _objectSpread(_objectSpread({}, _ctx.previousButtonProps), _ctx.ptm('previousButton')), {
    "data-pc-group-section": "navbutton"
  }), [vue.renderSlot(_ctx.$slots, "previousicon", {}, function () {
    return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.prevIcon ? 'span' : 'ChevronLeftIcon'), vue.mergeProps({
      "aria-hidden": "true",
      "class": _ctx.prevIcon
    }, _ctx.ptm('previousIcon')), null, 16, ["class"]))];
  })], 16, _hoisted_1)), [[_directive_ripple]]) : vue.createCommentVNode("", true), vue.createElementVNode("div", vue.mergeProps({
    ref: "content",
    "class": _ctx.cx('navContent'),
    onScroll: _cache[1] || (_cache[1] = function () {
      return $options.onScroll && $options.onScroll.apply($options, arguments);
    })
  }, _ctx.ptm('navContent')), [vue.createElementVNode("ul", vue.mergeProps({
    ref: "nav",
    "class": _ctx.cx('nav')
  }, _ctx.ptm('nav')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.tabs, function (tab, index) {
    return vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
      key: $options.getKey(tab, index),
      style: $options.getTabProp(tab, 'headerStyle'),
      "class": _ctx.cx('tab.header', {
        tab: tab,
        index: index
      }),
      role: "presentation"
    }, _objectSpread(_objectSpread(_objectSpread({}, $options.getTabProp(tab, 'headerProps')), $options.getTabPT(tab, 'root', index)), $options.getTabPT(tab, 'header', index)), {
      "data-pc-name": "tabpanel",
      "data-p-highlight": $data.d_activeIndex === index,
      "data-p-disabled": $options.getTabProp(tab, 'disabled'),
      "data-pc-index": index,
      "data-p-active": $data.d_activeIndex === index
    }), [vue.withDirectives((vue.openBlock(), vue.createElementBlock("a", vue.mergeProps({
      id: $options.getTabHeaderActionId(index),
      "class": _ctx.cx('tab.headerAction'),
      tabindex: $options.getTabProp(tab, 'disabled') || !$options.isTabActive(index) ? -1 : _ctx.tabindex,
      role: "tab",
      "aria-disabled": $options.getTabProp(tab, 'disabled'),
      "aria-selected": $options.isTabActive(index),
      "aria-controls": $options.getTabContentId(index),
      onClick: function onClick($event) {
        return $options.onTabClick($event, tab, index);
      },
      onKeydown: function onKeydown($event) {
        return $options.onTabKeyDown($event, tab, index);
      }
    }, _objectSpread(_objectSpread({}, $options.getTabProp(tab, 'headerActionProps')), $options.getTabPT(tab, 'headerAction', index))), [tab.props && tab.props.header ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
      key: 0,
      "class": _ctx.cx('tab.headerTitle')
    }, $options.getTabPT(tab, 'headerTitle', index)), vue.toDisplayString(tab.props.header), 17)) : vue.createCommentVNode("", true), tab.children && tab.children.header ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(tab.children.header), {
      key: 1
    })) : vue.createCommentVNode("", true)], 16, _hoisted_3)), [[_directive_ripple]])], 16, _hoisted_2);
  }), 128)), vue.createElementVNode("li", vue.mergeProps({
    ref: "inkbar",
    "class": _ctx.cx('inkbar'),
    role: "presentation",
    "aria-hidden": "true"
  }, _ctx.ptm('inkbar')), null, 16)], 16)], 16), _ctx.scrollable && !$data.isNextButtonDisabled ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
    key: 1,
    ref: "nextBtn",
    type: "button",
    "class": _ctx.cx('nextButton'),
    tabindex: _ctx.tabindex,
    "aria-label": $options.nextButtonAriaLabel,
    onClick: _cache[2] || (_cache[2] = function () {
      return $options.onNextButtonClick && $options.onNextButtonClick.apply($options, arguments);
    })
  }, _objectSpread(_objectSpread({}, _ctx.nextButtonProps), _ctx.ptm('nextButton')), {
    "data-pc-group-section": "navbutton"
  }), [vue.renderSlot(_ctx.$slots, "nexticon", {}, function () {
    return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.nextIcon ? 'span' : 'ChevronRightIcon'), vue.mergeProps({
      "aria-hidden": "true",
      "class": _ctx.nextIcon
    }, _ctx.ptm('nextIcon')), null, 16, ["class"]))];
  })], 16, _hoisted_4)), [[_directive_ripple]]) : vue.createCommentVNode("", true)], 16), vue.createElementVNode("div", vue.mergeProps({
    "class": _ctx.cx('panelContainer')
  }, _ctx.ptm('panelContainer')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.tabs, function (tab, index) {
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: $options.getKey(tab, index)
    }, [(_ctx.lazy ? $options.isTabActive(index) : true) ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
      key: 0,
      id: $options.getTabContentId(index),
      style: $options.getTabProp(tab, 'contentStyle'),
      "class": _ctx.cx('tab.content', {
        tab: tab
      }),
      role: "tabpanel",
      "aria-labelledby": $options.getTabHeaderActionId(index)
    }, _objectSpread(_objectSpread(_objectSpread({}, $options.getTabProp(tab, 'contentProps')), $options.getTabPT(tab, 'root', index)), $options.getTabPT(tab, 'content', index)), {
      "data-pc-name": "tabpanel",
      "data-pc-index": index,
      "data-p-active": $data.d_activeIndex === index
    }), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(tab)))], 16, _hoisted_5)), [[vue.vShow, _ctx.lazy ? true : $options.isTabActive(index)]]) : vue.createCommentVNode("", true)], 64);
  }), 128))], 16)], 16);
}

script.render = render;

module.exports = script;
