import ChevronLeftIcon from 'primevue/icons/chevronleft';
import ChevronRightIcon from 'primevue/icons/chevronright';
import Ripple from 'primevue/ripple';
import { UniqueComponentId, DomHandler } from 'primevue/utils';
import { mergeProps, resolveDirective, openBlock, createElementBlock, createElementVNode, withDirectives, renderSlot, createBlock, resolveDynamicComponent, createCommentVNode, Fragment, renderList, toDisplayString, vShow } from 'vue';
import BaseComponent from 'primevue/basecomponent';
import { useStyle } from 'primevue/usestyle';

var styles = "\n.p-tabview-nav-container {\n    position: relative;\n}\n\n.p-tabview-scrollable .p-tabview-nav-container {\n    overflow: hidden;\n}\n\n.p-tabview-nav-content {\n    overflow-x: auto;\n    overflow-y: hidden;\n    scroll-behavior: smooth;\n    scrollbar-width: none;\n    overscroll-behavior: contain auto;\n}\n\n.p-tabview-nav {\n    display: flex;\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n    flex: 1 1 auto;\n}\n\n.p-tabview-header-action {\n    cursor: pointer;\n    user-select: none;\n    display: flex;\n    align-items: center;\n    position: relative;\n    text-decoration: none;\n    overflow: hidden;\n}\n\n.p-tabview-ink-bar {\n    display: none;\n    z-index: 1;\n}\n\n.p-tabview-header-action:focus {\n    z-index: 1;\n}\n\n.p-tabview-title {\n    line-height: 1;\n    white-space: nowrap;\n}\n\n.p-tabview-nav-btn {\n    position: absolute;\n    top: 0;\n    z-index: 2;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.p-tabview-nav-prev {\n    left: 0;\n}\n\n.p-tabview-nav-next {\n    right: 0;\n}\n\n.p-tabview-nav-content::-webkit-scrollbar {\n    display: none;\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-tabview p-component', {
      'p-tabview-scrollable': props.scrollable
    }];
  },
  navContainer: 'p-tabview-nav-container',
  previousButton: 'p-tabview-nav-prev p-tabview-nav-btn p-link',
  navContent: 'p-tabview-nav-content',
  nav: 'p-tabview-nav',
  tab: {
    header: function header(_ref2) {
      var instance = _ref2.instance,
        tab = _ref2.tab,
        index = _ref2.index;
      return ['p-tabview-header', instance.getTabProp(tab, 'headerClass'), {
        'p-highlight': instance.d_activeIndex === index,
        'p-disabled': instance.getTabProp(tab, 'disabled')
      }];
    },
    headerAction: 'p-tabview-nav-link p-tabview-header-action',
    headerTitle: 'p-tabview-title',
    content: function content(_ref3) {
      var instance = _ref3.instance,
        tab = _ref3.tab;
      return ['p-tabview-panel', instance.getTabProp(tab, 'contentClass')];
    }
  },
  inkbar: 'p-tabview-ink-bar',
  nextButton: 'p-tabview-nav-next p-tabview-nav-btn p-link',
  panelContainer: 'p-tabview-panels'
};
var _useStyle = useStyle(styles, {
    name: 'tabview',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$1 = {
  name: 'BaseTabView',
  "extends": BaseComponent,
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
  css: {
    classes: classes,
    loadStyle: loadStyle
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'TabView',
  "extends": script$1,
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
      this.id = newValue || UniqueComponentId();
    },
    activeIndex: function activeIndex(newValue) {
      this.d_activeIndex = newValue;
      this.scrollInView({
        index: newValue
      });
    }
  },
  mounted: function mounted() {
    this.id = this.id || UniqueComponentId();
    this.updateInkBar();
    this.scrollable && this.updateButtonState();
  },
  updated: function updated() {
    this.updateInkBar();
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
      return mergeProps(this.ptm("tab.".concat(key), {
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
      return headerElement ? DomHandler.getAttribute(headerElement, 'data-p-disabled') || DomHandler.getAttribute(headerElement, 'data-pc-section') === 'inkbar' ? this.findNextHeaderAction(headerElement) : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]') : null;
    },
    findPrevHeaderAction: function findPrevHeaderAction(tabElement) {
      var selfCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var headerElement = selfCheck ? tabElement : tabElement.previousElementSibling;
      return headerElement ? DomHandler.getAttribute(headerElement, 'data-p-disabled') || DomHandler.getAttribute(headerElement, 'data-pc-section') === 'inkbar' ? this.findPrevHeaderAction(headerElement) : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]') : null;
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
        DomHandler.focus(element);
        this.scrollInView({
          element: element
        });
        if (this.selectOnFocus) {
          var index = parseInt(element.parentElement.dataset.index, 10);
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
      this.$refs.inkbar.style.width = DomHandler.getWidth(tabHeader) + 'px';
      this.$refs.inkbar.style.left = DomHandler.getOffset(tabHeader).left - DomHandler.getOffset(this.$refs.nav).left + 'px';
    },
    updateButtonState: function updateButtonState() {
      var content = this.$refs.content;
      var scrollLeft = content.scrollLeft,
        scrollWidth = content.scrollWidth;
      var width = DomHandler.getWidth(content);
      this.isPrevButtonDisabled = scrollLeft === 0;
      this.isNextButtonDisabled = parseInt(scrollLeft) === scrollWidth - width;
    },
    getVisibleButtonWidths: function getVisibleButtonWidths() {
      var _this$$refs = this.$refs,
        prevBtn = _this$$refs.prevBtn,
        nextBtn = _this$$refs.nextBtn;
      return [prevBtn, nextBtn].reduce(function (acc, el) {
        return el ? acc + DomHandler.getWidth(el) : acc;
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
    ripple: Ripple
  },
  components: {
    ChevronLeftIcon: ChevronLeftIcon,
    ChevronRightIcon: ChevronRightIcon
  }
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _hoisted_1 = ["tabindex", "aria-label"];
var _hoisted_2 = ["data-p-highlight", "data-p-disabled", "data-pc-index", "data-p-active"];
var _hoisted_3 = ["id", "tabindex", "aria-disabled", "aria-selected", "aria-controls", "onClick", "onKeydown"];
var _hoisted_4 = ["tabindex", "aria-label"];
var _hoisted_5 = ["aria-labelledby", "data-pc-index", "data-p-active"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptm('root'), {
    "data-pc-name": "tabview"
  }), [createElementVNode("div", mergeProps({
    "class": _ctx.cx('navContainer')
  }, _ctx.ptm('navContainer')), [_ctx.scrollable && !$data.isPrevButtonDisabled ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
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
  }), [renderSlot(_ctx.$slots, "previcon", {}, function () {
    return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.prevIcon ? 'span' : 'ChevronLeftIcon'), mergeProps({
      "aria-hidden": "true",
      "class": _ctx.prevIcon
    }, _ctx.ptm('previousIcon')), null, 16, ["class"]))];
  })], 16, _hoisted_1)), [[_directive_ripple]]) : createCommentVNode("", true), createElementVNode("div", mergeProps({
    ref: "content",
    "class": _ctx.cx('navContent'),
    onScroll: _cache[1] || (_cache[1] = function () {
      return $options.onScroll && $options.onScroll.apply($options, arguments);
    })
  }, _ctx.ptm('navContent')), [createElementVNode("ul", mergeProps({
    ref: "nav",
    "class": _ctx.cx('nav'),
    role: "tablist"
  }, _ctx.ptm('nav')), [(openBlock(true), createElementBlock(Fragment, null, renderList($options.tabs, function (tab, index) {
    return openBlock(), createElementBlock("li", mergeProps({
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
    }), [withDirectives((openBlock(), createElementBlock("a", mergeProps({
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
    }, _objectSpread(_objectSpread({}, $options.getTabProp(tab, 'headerActionProps')), $options.getTabPT(tab, 'headerAction', index))), [tab.props && tab.props.header ? (openBlock(), createElementBlock("span", mergeProps({
      key: 0,
      "class": _ctx.cx('tab.headerTitle')
    }, $options.getTabPT(tab, 'headerTitle', index)), toDisplayString(tab.props.header), 17)) : createCommentVNode("", true), tab.children && tab.children.header ? (openBlock(), createBlock(resolveDynamicComponent(tab.children.header), {
      key: 1
    })) : createCommentVNode("", true)], 16, _hoisted_3)), [[_directive_ripple]])], 16, _hoisted_2);
  }), 128)), createElementVNode("li", mergeProps({
    ref: "inkbar",
    "class": _ctx.cx('inkbar'),
    role: "presentation",
    "aria-hidden": "true"
  }, _ctx.ptm('inkbar')), null, 16)], 16)], 16), _ctx.scrollable && !$data.isNextButtonDisabled ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
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
  }), [renderSlot(_ctx.$slots, "nexticon", {}, function () {
    return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.nextIcon ? 'span' : 'ChevronRightIcon'), mergeProps({
      "aria-hidden": "true",
      "class": _ctx.nextIcon
    }, _ctx.ptm('nextIcon')), null, 16, ["class"]))];
  })], 16, _hoisted_4)), [[_directive_ripple]]) : createCommentVNode("", true)], 16), createElementVNode("div", mergeProps({
    "class": _ctx.cx('panelContainer')
  }, _ctx.ptm('panelContainer')), [(openBlock(true), createElementBlock(Fragment, null, renderList($options.tabs, function (tab, index) {
    return openBlock(), createElementBlock(Fragment, {
      key: $options.getKey(tab, index)
    }, [(_ctx.lazy ? $options.isTabActive(index) : true) ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
      key: 0,
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
    }), [(openBlock(), createBlock(resolveDynamicComponent(tab)))], 16, _hoisted_5)), [[vShow, _ctx.lazy ? true : $options.isTabActive(index)]]) : createCommentVNode("", true)], 64);
  }), 128))], 16)], 16);
}

script.render = render;

export { script as default };
