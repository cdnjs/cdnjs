'use strict';

var ChevronDownIcon = require('primevue/icons/chevrondown');
var ChevronRightIcon = require('primevue/icons/chevronright');
var Ripple = require('primevue/ripple');
var utils = require('primevue/utils');
var vue = require('vue');
var AccordionStyle = require('primevue/accordion/style');
var BaseComponent = require('primevue/basecomponent');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ChevronDownIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronDownIcon);
var ChevronRightIcon__default = /*#__PURE__*/_interopDefaultLegacy(ChevronRightIcon);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
var AccordionStyle__default = /*#__PURE__*/_interopDefaultLegacy(AccordionStyle);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var script$1 = {
  name: 'BaseAccordion',
  "extends": BaseComponent__default["default"],
  props: {
    multiple: {
      type: Boolean,
      "default": false
    },
    activeIndex: {
      type: [Number, Array],
      "default": null
    },
    lazy: {
      type: Boolean,
      "default": false
    },
    expandIcon: {
      type: String,
      "default": undefined
    },
    collapseIcon: {
      type: String,
      "default": undefined
    },
    tabindex: {
      type: Number,
      "default": 0
    },
    selectOnFocus: {
      type: Boolean,
      "default": false
    }
  },
  style: AccordionStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Accordion',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:activeIndex', 'tab-open', 'tab-close', 'tab-click'],
  data: function data() {
    return {
      id: this.$attrs.id,
      d_activeIndex: this.activeIndex
    };
  },
  watch: {
    '$attrs.id': function $attrsId(newValue) {
      this.id = newValue || utils.UniqueComponentId();
    },
    activeIndex: function activeIndex(newValue) {
      this.d_activeIndex = newValue;
    }
  },
  mounted: function mounted() {
    this.id = this.id || utils.UniqueComponentId();
  },
  methods: {
    isAccordionTab: function isAccordionTab(child) {
      return child.type.name === 'AccordionTab';
    },
    isTabActive: function isTabActive(index) {
      return this.multiple ? this.d_activeIndex && this.d_activeIndex.includes(index) : this.d_activeIndex === index;
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
        props: tab.props || {},
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
      }), this.ptm("accordiontab.".concat(key), {
        accordiontab: tabMetaData
      }), this.ptm("accordiontab.".concat(key), tabMetaData), this.ptmo(this.getTabProp(tab, 'pt'), key, tabMetaData));
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
        case 'ArrowDown':
          this.onTabArrowDownKey(event);
          break;
        case 'ArrowUp':
          this.onTabArrowUpKey(event);
          break;
        case 'Home':
          this.onTabHomeKey(event);
          break;
        case 'End':
          this.onTabEndKey(event);
          break;
        case 'Enter':
        case 'NumpadEnter':
        case 'Space':
          this.onTabEnterKey(event, tab, index);
          break;
      }
    },
    onTabArrowDownKey: function onTabArrowDownKey(event) {
      var nextHeaderAction = this.findNextHeaderAction(event.target.parentElement.parentElement);
      nextHeaderAction ? this.changeFocusedTab(event, nextHeaderAction) : this.onTabHomeKey(event);
      event.preventDefault();
    },
    onTabArrowUpKey: function onTabArrowUpKey(event) {
      var prevHeaderAction = this.findPrevHeaderAction(event.target.parentElement.parentElement);
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
    onTabEnterKey: function onTabEnterKey(event, tab, index) {
      this.changeActiveIndex(event, tab, index);
      event.preventDefault();
    },
    findNextHeaderAction: function findNextHeaderAction(tabElement) {
      var selfCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var nextTabElement = selfCheck ? tabElement : tabElement.nextElementSibling;
      var headerElement = utils.DomHandler.findSingle(nextTabElement, '[data-pc-section="header"]');
      return headerElement ? utils.DomHandler.getAttribute(headerElement, 'data-p-disabled') ? this.findNextHeaderAction(headerElement.parentElement) : utils.DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]') : null;
    },
    findPrevHeaderAction: function findPrevHeaderAction(tabElement) {
      var selfCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var prevTabElement = selfCheck ? tabElement : tabElement.previousElementSibling;
      var headerElement = utils.DomHandler.findSingle(prevTabElement, '[data-pc-section="header"]');
      return headerElement ? utils.DomHandler.getAttribute(headerElement, 'data-p-disabled') ? this.findPrevHeaderAction(headerElement.parentElement) : utils.DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]') : null;
    },
    findFirstHeaderAction: function findFirstHeaderAction() {
      return this.findNextHeaderAction(this.$el.firstElementChild, true);
    },
    findLastHeaderAction: function findLastHeaderAction() {
      return this.findPrevHeaderAction(this.$el.lastElementChild, true);
    },
    changeActiveIndex: function changeActiveIndex(event, tab, index) {
      if (!this.getTabProp(tab, 'disabled')) {
        var active = this.isTabActive(index);
        var eventName = active ? 'tab-close' : 'tab-open';
        if (this.multiple) {
          if (active) {
            this.d_activeIndex = this.d_activeIndex.filter(function (i) {
              return i !== index;
            });
          } else {
            if (this.d_activeIndex) this.d_activeIndex.push(index);else this.d_activeIndex = [index];
          }
        } else {
          this.d_activeIndex = this.d_activeIndex === index ? null : index;
        }
        this.$emit('update:activeIndex', this.d_activeIndex);
        this.$emit(eventName, {
          originalEvent: event,
          index: index
        });
      }
    },
    changeFocusedTab: function changeFocusedTab(event, element) {
      if (element) {
        utils.DomHandler.focus(element);
        if (this.selectOnFocus) {
          var index = parseInt(element.parentElement.parentElement.dataset.pcIndex, 10);
          var tab = this.tabs[index];
          this.changeActiveIndex(event, tab, index);
        }
      }
    }
  },
  computed: {
    tabs: function tabs() {
      var _this = this;
      return this.$slots["default"]().reduce(function (tabs, child) {
        if (_this.isAccordionTab(child)) {
          tabs.push(child);
        } else if (child.children && child.children instanceof Array) {
          child.children.forEach(function (nestedChild) {
            if (_this.isAccordionTab(nestedChild)) {
              tabs.push(nestedChild);
            }
          });
        }
        return tabs;
      }, []);
    }
  },
  components: {
    ChevronDownIcon: ChevronDownIcon__default["default"],
    ChevronRightIcon: ChevronRightIcon__default["default"]
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
var _hoisted_1 = ["data-pc-index", "data-p-active"];
var _hoisted_2 = ["data-p-highlight", "data-p-disabled"];
var _hoisted_3 = ["id", "tabindex", "aria-disabled", "aria-expanded", "aria-controls", "onClick", "onKeydown"];
var _hoisted_4 = ["id", "aria-labelledby"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.tabs, function (tab, i) {
    return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
      key: $options.getKey(tab, i),
      "class": _ctx.cx('tab.root', {
        tab: tab,
        index: i
      })
    }, $options.getTabPT(tab, 'root', i), {
      "data-pc-name": "accordiontab",
      "data-pc-index": i,
      "data-p-active": $options.isTabActive(i)
    }), [vue.createElementVNode("div", vue.mergeProps({
      style: $options.getTabProp(tab, 'headerStyle'),
      "class": [_ctx.cx('tab.header', {
        tab: tab,
        index: i
      }), $options.getTabProp(tab, 'headerClass')]
    }, _objectSpread(_objectSpread({}, $options.getTabProp(tab, 'headerProps')), $options.getTabPT(tab, 'header', i)), {
      "data-p-highlight": $options.isTabActive(i),
      "data-p-disabled": $options.getTabProp(tab, 'disabled')
    }), [vue.createElementVNode("a", vue.mergeProps({
      id: $options.getTabHeaderActionId(i),
      "class": _ctx.cx('tab.headerAction'),
      tabindex: $options.getTabProp(tab, 'disabled') ? -1 : _ctx.tabindex,
      role: "button",
      "aria-disabled": $options.getTabProp(tab, 'disabled'),
      "aria-expanded": $options.isTabActive(i),
      "aria-controls": $options.getTabContentId(i),
      onClick: function onClick($event) {
        return $options.onTabClick($event, tab, i);
      },
      onKeydown: function onKeydown($event) {
        return $options.onTabKeyDown($event, tab, i);
      }
    }, _objectSpread(_objectSpread({}, $options.getTabProp(tab, 'headeractionprops')), $options.getTabPT(tab, 'headeraction', i))), [tab.children && tab.children.headericon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(tab.children.headericon), {
      key: 0,
      isTabActive: $options.isTabActive(i),
      active: $options.isTabActive(i),
      index: i
    }, null, 8, ["isTabActive", "active", "index"])) : $options.isTabActive(i) ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.collapseicon ? _ctx.$slots.collapseicon : _ctx.collapseIcon ? 'span' : 'ChevronDownIcon'), vue.mergeProps({
      key: 1,
      "class": [_ctx.cx('tab.headerIcon'), _ctx.collapseIcon],
      "aria-hidden": "true"
    }, $options.getTabPT(tab, 'headericon', i)), null, 16, ["class"])) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.expandicon ? _ctx.$slots.expandicon : _ctx.expandIcon ? 'span' : 'ChevronRightIcon'), vue.mergeProps({
      key: 2,
      "class": [_ctx.cx('tab.headerIcon'), _ctx.expandIcon],
      "aria-hidden": "true"
    }, $options.getTabPT(tab, 'headericon', i)), null, 16, ["class"])), tab.props && tab.props.header ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
      key: 3,
      "class": _ctx.cx('tab.headerTitle')
    }, $options.getTabPT(tab, 'headertitle', i)), vue.toDisplayString(tab.props.header), 17)) : vue.createCommentVNode("", true), tab.children && tab.children.header ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(tab.children.header), {
      key: 4
    })) : vue.createCommentVNode("", true)], 16, _hoisted_3)], 16, _hoisted_2), vue.createVNode(vue.Transition, vue.mergeProps({
      name: "p-toggleable-content"
    }, $options.getTabPT(tab, 'transition', i)), {
      "default": vue.withCtx(function () {
        return [(_ctx.lazy ? $options.isTabActive(i) : true) ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
          key: 0,
          id: $options.getTabContentId(i),
          style: $options.getTabProp(tab, 'contentStyle'),
          "class": [_ctx.cx('tab.toggleableContent'), $options.getTabProp(tab, 'contentClass')],
          role: "region",
          "aria-labelledby": $options.getTabHeaderActionId(i)
        }, _objectSpread(_objectSpread({}, $options.getTabProp(tab, 'contentProps')), $options.getTabPT(tab, 'toggleablecontent', i))), [vue.createElementVNode("div", vue.mergeProps({
          "class": _ctx.cx('tab.content')
        }, $options.getTabPT(tab, 'content', i)), [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(tab)))], 16)], 16, _hoisted_4)), [[vue.vShow, _ctx.lazy ? true : $options.isTabActive(i)]]) : vue.createCommentVNode("", true)];
      }),
      _: 2
    }, 1040)], 16, _hoisted_1);
  }), 128))], 16);
}

script.render = render;

module.exports = script;
