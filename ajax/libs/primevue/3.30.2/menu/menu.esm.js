import OverlayEventBus from 'primevue/overlayeventbus';
import Portal from 'primevue/portal';
import { ObjectUtils, UniqueComponentId, ZIndexUtils, DomHandler, ConnectedOverlayScrollHandler } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import { useStyle } from 'primevue/usestyle';
import Ripple from 'primevue/ripple';
import { resolveComponent, resolveDirective, openBlock, createElementBlock, mergeProps, createElementVNode, Fragment, createBlock, withCtx, withDirectives, resolveDynamicComponent, normalizeClass, createCommentVNode, toDisplayString, createVNode, Transition, renderSlot, renderList, createTextVNode } from 'vue';

var styles = "\n.p-menu ul {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n\n.p-menu .p-menuitem-link {\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    text-decoration: none;\n    overflow: hidden;\n    position: relative;\n}\n\n.p-menu .p-menuitem-text {\n    line-height: 1;\n}\n";
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-menu p-component', {
      'p-menu-overlay': props.popup,
      'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
      'p-ripple-disabled': instance.$primevue.config.ripple === false
    }];
  },
  start: 'p-menu-start',
  menu: 'p-menu-list p-reset',
  submenuHeader: 'p-submenu-header',
  separator: 'p-menuitem-separator',
  end: 'p-menu-end',
  menuitem: function menuitem(_ref2) {
    var instance = _ref2.instance;
    return ['p-menuitem', {
      'p-focus': instance.id === instance.focusedOptionId,
      'p-disabled': instance.disabled()
    }];
  },
  content: 'p-menuitem-content',
  action: function action(_ref3) {
    var props = _ref3.props,
      isActive = _ref3.isActive,
      isExactActive = _ref3.isExactActive;
    return ['p-menuitem-link', {
      'router-link-active': isActive,
      'router-link-active-exact': props.exact && isExactActive
    }];
  },
  icon: 'p-menuitem-icon',
  label: 'p-menuitem-text'
};
var _useStyle = useStyle(styles, {
    name: 'menu',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$2 = {
  name: 'BaseMenu',
  "extends": BaseComponent,
  props: {
    popup: {
      type: Boolean,
      "default": false
    },
    model: {
      type: Array,
      "default": null
    },
    appendTo: {
      type: String,
      "default": 'body'
    },
    autoZIndex: {
      type: Boolean,
      "default": true
    },
    baseZIndex: {
      type: Number,
      "default": 0
    },
    exact: {
      type: Boolean,
      "default": true
    },
    tabindex: {
      type: Number,
      "default": 0
    },
    'aria-label': {
      type: String,
      "default": null
    },
    'aria-labelledby': {
      type: String,
      "default": null
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

var script$1 = {
  name: 'Menuitem',
  hostName: 'Menu',
  "extends": BaseComponent,
  inheritAttrs: false,
  emits: ['item-click'],
  props: {
    item: null,
    templates: null,
    exact: null,
    id: null,
    focusedOptionId: null
  },
  methods: {
    getItemProp: function getItemProp(processedItem, name) {
      return processedItem && processedItem.item ? ObjectUtils.getItemValue(processedItem.item[name]) : undefined;
    },
    getPTOptions: function getPTOptions(key) {
      return this.ptm(key, {
        context: {
          focused: this.isItemFocused()
        }
      });
    },
    isItemFocused: function isItemFocused() {
      return this.focusedOptionId === this.id;
    },
    onItemActionClick: function onItemActionClick(event, navigate) {
      navigate && navigate(event);
    },
    onItemClick: function onItemClick(event) {
      var command = this.getItemProp(this.item, 'command');
      command && command({
        originalEvent: event,
        item: this.item.item
      });
      this.$emit('item-click', {
        originalEvent: event,
        item: this.item,
        id: this.id
      });
    },
    visible: function visible() {
      return typeof this.item.visible === 'function' ? this.item.visible() : this.item.visible !== false;
    },
    disabled: function disabled() {
      return typeof this.item.disabled === 'function' ? this.item.disabled() : this.item.disabled;
    },
    label: function label() {
      return typeof this.item.label === 'function' ? this.item.label() : this.item.label;
    }
  },
  directives: {
    ripple: Ripple
  }
};

var _hoisted_1$1 = ["id", "aria-label", "aria-disabled", "data-p-focused", "data-p-disabled"];
var _hoisted_2$1 = ["href", "onClick"];
var _hoisted_3$1 = ["href", "target"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = resolveComponent("router-link");
  var _directive_ripple = resolveDirective("ripple");
  return $options.visible() ? (openBlock(), createElementBlock("li", mergeProps({
    key: 0,
    id: $props.id,
    "class": [_ctx.cx('menuitem'), $props.item["class"]],
    role: "menuitem",
    style: $props.item.style,
    "aria-label": $options.label(),
    "aria-disabled": $options.disabled()
  }, $options.getPTOptions('menuitem'), {
    "data-p-focused": $options.isItemFocused(),
    "data-p-disabled": $options.disabled() || false
  }), [createElementVNode("div", mergeProps({
    "class": _ctx.cx('content'),
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return $options.onItemClick($event);
    })
  }, $options.getPTOptions('content')), [!$props.templates.item ? (openBlock(), createElementBlock(Fragment, {
    key: 0
  }, [$props.item.to && !$options.disabled() ? (openBlock(), createBlock(_component_router_link, {
    key: 0,
    to: $props.item.to,
    custom: ""
  }, {
    "default": withCtx(function (_ref) {
      var navigate = _ref.navigate,
        href = _ref.href,
        isActive = _ref.isActive,
        isExactActive = _ref.isExactActive;
      return [withDirectives((openBlock(), createElementBlock("a", mergeProps({
        href: href,
        "class": _ctx.cx('action', {
          isActive: isActive,
          isExactActive: isExactActive
        }),
        tabindex: "-1",
        "aria-hidden": "true",
        onClick: function onClick($event) {
          return $options.onItemActionClick($event, navigate);
        }
      }, $options.getPTOptions('action')), [$props.templates.itemicon ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.itemicon), {
        key: 0,
        item: $props.item,
        "class": normalizeClass([_ctx.cx('icon'), $props.item.icon])
      }, null, 8, ["item", "class"])) : $props.item.icon ? (openBlock(), createElementBlock("span", mergeProps({
        key: 1,
        "class": [_ctx.cx('icon'), $props.item.icon]
      }, $options.getPTOptions('icon')), null, 16)) : createCommentVNode("", true), createElementVNode("span", mergeProps({
        "class": _ctx.cx('label')
      }, $options.getPTOptions('label')), toDisplayString($options.label()), 17)], 16, _hoisted_2$1)), [[_directive_ripple]])];
    }),
    _: 1
  }, 8, ["to"])) : withDirectives((openBlock(), createElementBlock("a", mergeProps({
    key: 1,
    href: $props.item.url,
    "class": _ctx.cx('action'),
    target: $props.item.target,
    tabindex: "-1",
    "aria-hidden": "true"
  }, $options.getPTOptions('action')), [$props.templates.itemicon ? (openBlock(), createBlock(resolveDynamicComponent($props.templates.itemicon), {
    key: 0,
    item: $props.item,
    "class": normalizeClass([_ctx.cx('icon'), $props.item.icon])
  }, null, 8, ["item", "class"])) : $props.item.icon ? (openBlock(), createElementBlock("span", mergeProps({
    key: 1,
    "class": [_ctx.cx('icon'), $props.item.icon]
  }, $options.getPTOptions('icon')), null, 16)) : createCommentVNode("", true), createElementVNode("span", mergeProps({
    "class": _ctx.cx('label')
  }, $options.getPTOptions('label')), toDisplayString($options.label()), 17)], 16, _hoisted_3$1)), [[_directive_ripple]])], 64)) : (openBlock(), createBlock(resolveDynamicComponent($props.templates.item), {
    key: 1,
    item: $props.item
  }, null, 8, ["item"]))], 16)], 16, _hoisted_1$1)) : createCommentVNode("", true);
}

script$1.render = render$1;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var script = {
  name: 'Menu',
  "extends": script$2,
  inheritAttrs: false,
  emits: ['show', 'hide', 'focus', 'blur'],
  data: function data() {
    return {
      id: this.$attrs.id,
      overlayVisible: false,
      focused: false,
      focusedOptionIndex: -1,
      selectedOptionIndex: -1
    };
  },
  watch: {
    '$attrs.id': function $attrsId(newValue) {
      this.id = newValue || UniqueComponentId();
    }
  },
  target: null,
  outsideClickListener: null,
  scrollHandler: null,
  resizeListener: null,
  container: null,
  list: null,
  mounted: function mounted() {
    this.id = this.id || UniqueComponentId();
    if (!this.popup) {
      this.bindResizeListener();
      this.bindOutsideClickListener();
    }
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindResizeListener();
    this.unbindOutsideClickListener();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    this.target = null;
    if (this.container && this.autoZIndex) {
      ZIndexUtils.clear(this.container);
    }
    this.container = null;
  },
  methods: {
    itemClick: function itemClick(event) {
      var item = event.item;
      if (this.disabled(item)) {
        return;
      }
      if (item.command) {
        item.command(event);
      }
      if (item.to && event.navigate) {
        event.navigate(event.originalEvent);
      }
      if (this.overlayVisible) this.hide();
      if (!this.popup && this.focusedOptionIndex !== event.id) {
        this.focusedOptionIndex = event.id;
      }
    },
    onListFocus: function onListFocus(event) {
      this.focused = true;
      if (!this.popup) {
        if (this.selectedOptionIndex !== -1) {
          this.changeFocusedOptionIndex(this.selectedOptionIndex);
          this.selectedOptionIndex = -1;
        } else this.changeFocusedOptionIndex(0);
      }
      this.$emit('focus', event);
    },
    onListBlur: function onListBlur(event) {
      this.focused = false;
      this.focusedOptionIndex = -1;
      this.$emit('blur', event);
    },
    onListKeyDown: function onListKeyDown(event) {
      switch (event.code) {
        case 'ArrowDown':
          this.onArrowDownKey(event);
          break;
        case 'ArrowUp':
          this.onArrowUpKey(event);
          break;
        case 'Home':
          this.onHomeKey(event);
          break;
        case 'End':
          this.onEndKey(event);
          break;
        case 'Enter':
          this.onEnterKey(event);
          break;
        case 'Space':
          this.onSpaceKey(event);
          break;
        case 'Escape':
          if (this.popup) {
            DomHandler.focus(this.target);
            this.hide();
          }
        case 'Tab':
          this.overlayVisible && this.hide();
          break;
      }
    },
    onArrowDownKey: function onArrowDownKey(event) {
      var optionIndex = this.findNextOptionIndex(this.focusedOptionIndex);
      this.changeFocusedOptionIndex(optionIndex);
      event.preventDefault();
    },
    onArrowUpKey: function onArrowUpKey(event) {
      if (event.altKey && this.popup) {
        DomHandler.focus(this.target);
        this.hide();
        event.preventDefault();
      } else {
        var optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex);
        this.changeFocusedOptionIndex(optionIndex);
        event.preventDefault();
      }
    },
    onHomeKey: function onHomeKey(event) {
      this.changeFocusedOptionIndex(0);
      event.preventDefault();
    },
    onEndKey: function onEndKey(event) {
      this.changeFocusedOptionIndex(DomHandler.find(this.container, 'li[data-pc-section="menuitem"][data-p-disabled="false"]').length - 1);
      event.preventDefault();
    },
    onEnterKey: function onEnterKey(event) {
      var element = DomHandler.findSingle(this.list, "li[id=\"".concat("".concat(this.focusedOptionIndex), "\"]"));
      var anchorElement = element && DomHandler.findSingle(element, 'a[data-pc-section="action"]');
      this.popup && DomHandler.focus(this.target);
      anchorElement ? anchorElement.click() : element && element.click();
      event.preventDefault();
    },
    onSpaceKey: function onSpaceKey(event) {
      this.onEnterKey(event);
    },
    findNextOptionIndex: function findNextOptionIndex(index) {
      var links = DomHandler.find(this.container, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
      var matchedOptionIndex = _toConsumableArray(links).findIndex(function (link) {
        return link.id === index;
      });
      return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
    },
    findPrevOptionIndex: function findPrevOptionIndex(index) {
      var links = DomHandler.find(this.container, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
      var matchedOptionIndex = _toConsumableArray(links).findIndex(function (link) {
        return link.id === index;
      });
      return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
    },
    changeFocusedOptionIndex: function changeFocusedOptionIndex(index) {
      var links = DomHandler.find(this.container, 'li[data-pc-section="menuitem"][data-p-disabled="false"]');
      var order = index >= links.length ? links.length - 1 : index < 0 ? 0 : index;
      order > -1 && (this.focusedOptionIndex = links[order].getAttribute('id'));
    },
    toggle: function toggle(event) {
      if (this.overlayVisible) this.hide();else this.show(event);
    },
    show: function show(event) {
      this.overlayVisible = true;
      this.target = event.currentTarget;
    },
    hide: function hide() {
      this.overlayVisible = false;
      this.target = null;
    },
    onEnter: function onEnter(el) {
      DomHandler.addStyles(el, {
        position: 'absolute',
        top: '0',
        left: '0'
      });
      this.alignOverlay();
      this.bindOutsideClickListener();
      this.bindResizeListener();
      this.bindScrollListener();
      if (this.autoZIndex) {
        ZIndexUtils.set('menu', el, this.baseZIndex + this.$primevue.config.zIndex.menu);
      }
      if (this.popup) {
        DomHandler.focus(this.list);
        this.changeFocusedOptionIndex(0);
      }
      this.$emit('show');
    },
    onLeave: function onLeave() {
      this.unbindOutsideClickListener();
      this.unbindResizeListener();
      this.unbindScrollListener();
      this.$emit('hide');
    },
    onAfterLeave: function onAfterLeave(el) {
      if (this.autoZIndex) {
        ZIndexUtils.clear(el);
      }
    },
    alignOverlay: function alignOverlay() {
      DomHandler.absolutePosition(this.container, this.target);
      this.container.style.minWidth = DomHandler.getOuterWidth(this.target) + 'px';
    },
    bindOutsideClickListener: function bindOutsideClickListener() {
      var _this = this;
      if (!this.outsideClickListener) {
        this.outsideClickListener = function (event) {
          var isOutsideContainer = _this.container && !_this.container.contains(event.target);
          var isOutsideTarget = !(_this.target && (_this.target === event.target || _this.target.contains(event.target)));
          if (_this.overlayVisible && isOutsideContainer && isOutsideTarget) {
            _this.hide();
          } else if (!_this.popup && isOutsideContainer && isOutsideTarget) {
            _this.focusedOptionIndex = -1;
          }
        };
        document.addEventListener('click', this.outsideClickListener);
      }
    },
    unbindOutsideClickListener: function unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener('click', this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },
    bindScrollListener: function bindScrollListener() {
      var _this2 = this;
      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.target, function () {
          if (_this2.overlayVisible) {
            _this2.hide();
          }
        });
      }
      this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener: function unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    },
    bindResizeListener: function bindResizeListener() {
      var _this3 = this;
      if (!this.resizeListener) {
        this.resizeListener = function () {
          if (_this3.overlayVisible && !DomHandler.isTouchDevice()) {
            _this3.hide();
          }
        };
        window.addEventListener('resize', this.resizeListener);
      }
    },
    unbindResizeListener: function unbindResizeListener() {
      if (this.resizeListener) {
        window.removeEventListener('resize', this.resizeListener);
        this.resizeListener = null;
      }
    },
    visible: function visible(item) {
      return typeof item.visible === 'function' ? item.visible() : item.visible !== false;
    },
    disabled: function disabled(item) {
      return typeof item.disabled === 'function' ? item.disabled() : item.disabled;
    },
    label: function label(item) {
      return typeof item.label === 'function' ? item.label() : item.label;
    },
    onOverlayClick: function onOverlayClick(event) {
      OverlayEventBus.emit('overlay-click', {
        originalEvent: event,
        target: this.target
      });
    },
    containerRef: function containerRef(el) {
      this.container = el;
    },
    listRef: function listRef(el) {
      this.list = el;
    }
  },
  computed: {
    focusedOptionId: function focusedOptionId() {
      return this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : null;
    }
  },
  components: {
    PVMenuitem: script$1,
    Portal: Portal
  }
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _hoisted_1 = ["id"];
var _hoisted_2 = ["id", "tabindex", "aria-activedescendant", "aria-label", "aria-labelledby"];
var _hoisted_3 = ["id"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_PVMenuitem = resolveComponent("PVMenuitem");
  var _component_Portal = resolveComponent("Portal");
  return openBlock(), createBlock(_component_Portal, {
    appendTo: _ctx.appendTo,
    disabled: !_ctx.popup
  }, {
    "default": withCtx(function () {
      return [createVNode(Transition, {
        name: "p-connected-overlay",
        onEnter: $options.onEnter,
        onLeave: $options.onLeave,
        onAfterLeave: $options.onAfterLeave
      }, {
        "default": withCtx(function () {
          return [(_ctx.popup ? $data.overlayVisible : true) ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: $options.containerRef,
            id: $data.id,
            "class": _ctx.cx('root'),
            onClick: _cache[3] || (_cache[3] = function () {
              return $options.onOverlayClick && $options.onOverlayClick.apply($options, arguments);
            })
          }, _objectSpread(_objectSpread({}, _ctx.$attrs), _ctx.ptm('root')), {
            "data-pc-name": "menu"
          }), [_ctx.$slots.start ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            "class": _ctx.cx('start')
          }, _ctx.ptm('start')), [renderSlot(_ctx.$slots, "start")], 16)) : createCommentVNode("", true), createElementVNode("ul", mergeProps({
            ref: $options.listRef,
            id: $data.id + '_list',
            "class": _ctx.cx('menu'),
            role: "menu",
            tabindex: _ctx.tabindex,
            "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
            "aria-label": _ctx.ariaLabel,
            "aria-labelledby": _ctx.ariaLabelledby,
            onFocus: _cache[0] || (_cache[0] = function () {
              return $options.onListFocus && $options.onListFocus.apply($options, arguments);
            }),
            onBlur: _cache[1] || (_cache[1] = function () {
              return $options.onListBlur && $options.onListBlur.apply($options, arguments);
            }),
            onKeydown: _cache[2] || (_cache[2] = function () {
              return $options.onListKeyDown && $options.onListKeyDown.apply($options, arguments);
            })
          }, _ctx.ptm('menu')), [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.model, function (item, i) {
            return openBlock(), createElementBlock(Fragment, {
              key: $options.label(item) + i.toString()
            }, [item.items && $options.visible(item) && !item.separator ? (openBlock(), createElementBlock(Fragment, {
              key: 0
            }, [item.items ? (openBlock(), createElementBlock("li", mergeProps({
              key: 0,
              id: $data.id + '_' + i,
              "class": _ctx.cx('submenuHeader'),
              role: "none"
            }, _ctx.ptm('submenuHeader')), [renderSlot(_ctx.$slots, "item", {
              item: item
            }, function () {
              return [createTextVNode(toDisplayString($options.label(item)), 1)];
            })], 16, _hoisted_3)) : createCommentVNode("", true), (openBlock(true), createElementBlock(Fragment, null, renderList(item.items, function (child, j) {
              return openBlock(), createElementBlock(Fragment, {
                key: child.label + i + '_' + j
              }, [$options.visible(child) && !child.separator ? (openBlock(), createBlock(_component_PVMenuitem, {
                key: 0,
                id: $data.id + '_' + i + '_' + j,
                item: child,
                templates: _ctx.$slots,
                exact: _ctx.exact,
                focusedOptionId: $options.focusedOptionId,
                onItemClick: $options.itemClick,
                pt: _ctx.pt
              }, null, 8, ["id", "item", "templates", "exact", "focusedOptionId", "onItemClick", "pt"])) : $options.visible(child) && child.separator ? (openBlock(), createElementBlock("li", mergeProps({
                key: 'separator' + i + j,
                "class": [_ctx.cx('separator'), item["class"]],
                style: child.style,
                role: "separator"
              }, _ctx.ptm('separator')), null, 16)) : createCommentVNode("", true)], 64);
            }), 128))], 64)) : $options.visible(item) && item.separator ? (openBlock(), createElementBlock("li", mergeProps({
              key: 'separator' + i.toString(),
              "class": [_ctx.cx('separator'), item["class"]],
              style: item.style,
              role: "separator"
            }, _ctx.ptm('separator')), null, 16)) : (openBlock(), createBlock(_component_PVMenuitem, {
              key: $options.label(item) + i.toString(),
              id: $data.id + '_' + i,
              item: item,
              templates: _ctx.$slots,
              exact: _ctx.exact,
              focusedOptionId: $options.focusedOptionId,
              onItemClick: $options.itemClick,
              pt: _ctx.pt
            }, null, 8, ["id", "item", "templates", "exact", "focusedOptionId", "onItemClick", "pt"]))], 64);
          }), 128))], 16, _hoisted_2), _ctx.$slots.end ? (openBlock(), createElementBlock("div", mergeProps({
            key: 1,
            "class": _ctx.cx('end')
          }, _ctx.ptm('end')), [renderSlot(_ctx.$slots, "end")], 16)) : createCommentVNode("", true)], 16, _hoisted_1)) : createCommentVNode("", true)];
        }),
        _: 3
      }, 8, ["onEnter", "onLeave", "onAfterLeave"])];
    }),
    _: 3
  }, 8, ["appendTo", "disabled"]);
}

script.render = render;

export { script as default };
