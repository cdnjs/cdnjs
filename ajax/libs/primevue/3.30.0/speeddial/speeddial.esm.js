import Button from 'primevue/button';
import PlusIcon from 'primevue/icons/plus';
import Ripple from 'primevue/ripple';
import Tooltip from 'primevue/tooltip';
import { UniqueComponentId, DomHandler } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import { useStyle } from 'primevue/usestyle';
import { resolveComponent, resolveDirective, openBlock, createElementBlock, Fragment, createElementVNode, mergeProps, renderSlot, createVNode, normalizeClass, withCtx, createBlock, resolveDynamicComponent, renderList, withDirectives, createCommentVNode } from 'vue';

function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
function _toPrimitive$1(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var styles = "\n.p-speeddial {\n    position: absolute;\n    display: flex;\n}\n\n.p-speeddial-button {\n    z-index: 1;\n}\n\n.p-speeddial-list {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    transition: top 0s linear 0.2s;\n    pointer-events: none;\n    z-index: 2;\n}\n\n.p-speeddial-item {\n    transform: scale(0);\n    opacity: 0;\n    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, opacity 0.8s;\n    will-change: transform;\n}\n\n.p-speeddial-action {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 50%;\n    position: relative;\n    overflow: hidden;\n}\n\n.p-speeddial-circle .p-speeddial-item,\n.p-speeddial-semi-circle .p-speeddial-item,\n.p-speeddial-quarter-circle .p-speeddial-item {\n    position: absolute;\n}\n\n.p-speeddial-rotate {\n    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;\n    will-change: transform;\n}\n\n.p-speeddial-mask {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    transition: opacity 250ms cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n\n.p-speeddial-mask-visible {\n    pointer-events: none;\n    opacity: 1;\n    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n\n.p-speeddial-opened .p-speeddial-list {\n    pointer-events: auto;\n}\n\n.p-speeddial-opened .p-speeddial-item {\n    transform: scale(1);\n    opacity: 1;\n}\n\n.p-speeddial-opened .p-speeddial-rotate {\n    transform: rotate(45deg);\n}\n\n/* Direction */\n.p-speeddial-direction-up {\n    align-items: center;\n    flex-direction: column-reverse;\n}\n\n.p-speeddial-direction-up .p-speeddial-list {\n    flex-direction: column-reverse;\n}\n\n.p-speeddial-direction-down {\n    align-items: center;\n    flex-direction: column;\n}\n\n.p-speeddial-direction-down .p-speeddial-list {\n    flex-direction: column;\n}\n\n.p-speeddial-direction-left {\n    justify-content: center;\n    flex-direction: row-reverse;\n}\n\n.p-speeddial-direction-left .p-speeddial-list {\n    flex-direction: row-reverse;\n}\n\n.p-speeddial-direction-right {\n    justify-content: center;\n    flex-direction: row;\n}\n\n.p-speeddial-direction-right .p-speeddial-list {\n    flex-direction: row;\n}\n";
var classes = {
  root: function root(_ref) {
    var _ref2;
    var instance = _ref.instance,
      props = _ref.props;
    return ["p-speeddial p-component p-speeddial-".concat(props.type), (_ref2 = {}, _defineProperty$1(_ref2, "p-speeddial-direction-".concat(props.direction), props.type !== 'circle'), _defineProperty$1(_ref2, 'p-speeddial-opened', instance.d_visible), _defineProperty$1(_ref2, 'p-disabled', props.disabled), _ref2)];
  },
  button: function button(_ref3) {
    var props = _ref3.props;
    return ['p-speeddial-button p-button-rounded', {
      'p-speeddial-rotate': props.rotateAnimation && !props.hideIcon
    }];
  },
  menu: 'p-speeddial-list',
  menuitem: function menuitem(_ref4) {
    var instance = _ref4.instance,
      id = _ref4.id;
    return ['p-speeddial-item', {
      'p-focus': instance.isItemActive(id)
    }];
  },
  action: function action(_ref5) {
    var item = _ref5.item;
    return ['p-speeddial-action', {
      'p-disabled': item.disabled
    }];
  },
  actionIcon: 'p-speeddial-action-icon',
  mask: function mask(_ref6) {
    var instance = _ref6.instance;
    return ['p-speeddial-mask', {
      'p-speeddial-mask-visible': instance.d_visible
    }];
  }
};
var _useStyle = useStyle(styles, {
    name: 'speeddial',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$1 = {
  name: 'BaseSpeedDial',
  "extends": BaseComponent,
  props: {
    model: null,
    visible: {
      type: Boolean,
      "default": false
    },
    direction: {
      type: String,
      "default": 'up'
    },
    transitionDelay: {
      type: Number,
      "default": 30
    },
    type: {
      type: String,
      "default": 'linear'
    },
    radius: {
      type: Number,
      "default": 0
    },
    mask: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    hideOnClickOutside: {
      type: Boolean,
      "default": true
    },
    buttonClass: null,
    maskStyle: null,
    maskClass: null,
    showIcon: {
      type: String,
      "default": undefined
    },
    hideIcon: {
      type: String,
      "default": undefined
    },
    rotateAnimation: {
      type: Boolean,
      "default": true
    },
    tooltipOptions: null,
    style: null,
    "class": null,
    'aria-labelledby': {
      type: String,
      "default": null
    },
    'aria-label': {
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

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var script = {
  name: 'SpeedDial',
  "extends": script$1,
  emits: ['click', 'show', 'hide', 'focus', 'blur'],
  documentClickListener: null,
  container: null,
  list: null,
  data: function data() {
    return {
      id: this.$attrs.id,
      d_visible: this.visible,
      isItemClicked: false,
      focused: false,
      focusedOptionIndex: -1
    };
  },
  watch: {
    '$attrs.id': function $attrsId(newValue) {
      this.id = newValue || UniqueComponentId();
    },
    visible: function visible(newValue) {
      this.d_visible = newValue;
    }
  },
  mounted: function mounted() {
    this.id = this.id || UniqueComponentId();
    if (this.type !== 'linear') {
      var button = DomHandler.findSingle(this.container, '[data-pc-section="button"]');
      var firstItem = DomHandler.findSingle(this.list, '[data-pc-section="menuitem"]');
      if (button && firstItem) {
        var wDiff = Math.abs(button.offsetWidth - firstItem.offsetWidth);
        var hDiff = Math.abs(button.offsetHeight - firstItem.offsetHeight);
        this.list.style.setProperty('--item-diff-x', "".concat(wDiff / 2, "px"));
        this.list.style.setProperty('--item-diff-y', "".concat(hDiff / 2, "px"));
      }
    }
    if (this.hideOnClickOutside) {
      this.bindDocumentClickListener();
    }
  },
  beforeMount: function beforeMount() {
    this.unbindDocumentClickListener();
  },
  methods: {
    getPTOptions: function getPTOptions(id, key) {
      return this.ptm(key, {
        context: {
          active: this.isItemActive(id)
        }
      });
    },
    onFocus: function onFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
    },
    onBlur: function onBlur(event) {
      this.focused = false;
      this.focusedOptionIndex = -1;
      this.$emit('blur', event);
    },
    onItemClick: function onItemClick(e, item) {
      if (item.command) {
        item.command({
          originalEvent: e,
          item: item
        });
      }
      this.hide();
      this.isItemClicked = true;
      e.preventDefault();
    },
    onClick: function onClick(event) {
      this.d_visible ? this.hide() : this.show();
      this.isItemClicked = true;
      this.$emit('click', event);
    },
    show: function show() {
      this.d_visible = true;
      this.$emit('show');
    },
    hide: function hide() {
      this.d_visible = false;
      this.$emit('hide');
    },
    calculateTransitionDelay: function calculateTransitionDelay(index) {
      var length = this.model.length;
      var visible = this.d_visible;
      return (visible ? index : length - index - 1) * this.transitionDelay;
    },
    onTogglerKeydown: function onTogglerKeydown(event) {
      switch (event.code) {
        case 'ArrowDown':
        case 'ArrowLeft':
          this.onTogglerArrowDown(event);
          break;
        case 'ArrowUp':
        case 'ArrowRight':
          this.onTogglerArrowUp(event);
          break;
        case 'Escape':
          this.onEscapeKey();
          break;
      }
    },
    onKeyDown: function onKeyDown(event) {
      switch (event.code) {
        case 'ArrowDown':
          this.onArrowDown(event);
          break;
        case 'ArrowUp':
          this.onArrowUp(event);
          break;
        case 'ArrowLeft':
          this.onArrowLeft(event);
          break;
        case 'ArrowRight':
          this.onArrowRight(event);
          break;
        case 'Enter':
        case 'Space':
          this.onEnterKey(event);
          break;
        case 'Escape':
          this.onEscapeKey(event);
          break;
        case 'Home':
          this.onHomeKey(event);
          break;
        case 'End':
          this.onEndKey(event);
          break;
      }
    },
    onTogglerArrowUp: function onTogglerArrowUp(event) {
      this.focused = true;
      DomHandler.focus(this.list);
      this.show();
      this.navigatePrevItem(event);
      event.preventDefault();
    },
    onTogglerArrowDown: function onTogglerArrowDown(event) {
      this.focused = true;
      DomHandler.focus(this.list);
      this.show();
      this.navigateNextItem(event);
      event.preventDefault();
    },
    onEnterKey: function onEnterKey(event) {
      var _this = this;
      var items = DomHandler.find(this.container, '[data-pc-section="menuitem"]');
      var itemIndex = _toConsumableArray(items).findIndex(function (item) {
        return item.id === _this.focusedOptionIndex;
      });
      this.onItemClick(event, this.model[itemIndex]);
      this.onBlur(event);
      var buttonEl = DomHandler.findSingle(this.container, 'button');
      buttonEl && DomHandler.focus(buttonEl);
    },
    onEscapeKey: function onEscapeKey() {
      this.hide();
      var buttonEl = DomHandler.findSingle(this.container, 'button');
      buttonEl && DomHandler.focus(buttonEl);
    },
    onArrowUp: function onArrowUp(event) {
      if (this.direction === 'up') {
        this.navigateNextItem(event);
      } else if (this.direction === 'down') {
        this.navigatePrevItem(event);
      } else {
        this.navigateNextItem(event);
      }
    },
    onArrowDown: function onArrowDown(event) {
      if (this.direction === 'up') {
        this.navigatePrevItem(event);
      } else if (this.direction === 'down') {
        this.navigateNextItem(event);
      } else {
        this.navigatePrevItem(event);
      }
    },
    onArrowLeft: function onArrowLeft(event) {
      var leftValidDirections = ['left', 'up-right', 'down-left'];
      var rightValidDirections = ['right', 'up-left', 'down-right'];
      if (leftValidDirections.includes(this.direction)) {
        this.navigateNextItem(event);
      } else if (rightValidDirections.includes(this.direction)) {
        this.navigatePrevItem(event);
      } else {
        this.navigatePrevItem(event);
      }
    },
    onArrowRight: function onArrowRight(event) {
      var leftValidDirections = ['left', 'up-right', 'down-left'];
      var rightValidDirections = ['right', 'up-left', 'down-right'];
      if (leftValidDirections.includes(this.direction)) {
        this.navigatePrevItem(event);
      } else if (rightValidDirections.includes(this.direction)) {
        this.navigateNextItem(event);
      } else {
        this.navigateNextItem(event);
      }
    },
    onEndKey: function onEndKey(event) {
      event.preventDefault();
      this.focusedOptionIndex = -1;
      this.navigatePrevItem(event);
    },
    onHomeKey: function onHomeKey(event) {
      event.preventDefault();
      this.focusedOptionIndex = -1;
      this.navigateNextItem(event);
    },
    navigateNextItem: function navigateNextItem(event) {
      var optionIndex = this.findNextOptionIndex(this.focusedOptionIndex);
      this.changeFocusedOptionIndex(optionIndex);
      event.preventDefault();
    },
    navigatePrevItem: function navigatePrevItem(event) {
      var optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex);
      this.changeFocusedOptionIndex(optionIndex);
      event.preventDefault();
    },
    changeFocusedOptionIndex: function changeFocusedOptionIndex(index) {
      var items = DomHandler.find(this.container, '[data-pc-section="menuitem"]');
      var filteredItems = _toConsumableArray(items).filter(function (item) {
        return !DomHandler.hasClass(DomHandler.findSingle(item, 'a'), 'p-disabled');
      });
      if (filteredItems[index]) {
        this.focusedOptionIndex = filteredItems[index].getAttribute('id');
      }
    },
    findPrevOptionIndex: function findPrevOptionIndex(index) {
      var items = DomHandler.find(this.container, '[data-pc-section="menuitem"]');
      var filteredItems = _toConsumableArray(items).filter(function (item) {
        return !DomHandler.hasClass(DomHandler.findSingle(item, 'a'), 'p-disabled');
      });
      var newIndex = index === -1 ? filteredItems[filteredItems.length - 1].id : index;
      var matchedOptionIndex = filteredItems.findIndex(function (link) {
        return link.getAttribute('id') === newIndex;
      });
      matchedOptionIndex = index === -1 ? filteredItems.length - 1 : matchedOptionIndex - 1;
      return matchedOptionIndex;
    },
    findNextOptionIndex: function findNextOptionIndex(index) {
      var items = DomHandler.find(this.container, '[data-pc-section="menuitem"]');
      var filteredItems = _toConsumableArray(items).filter(function (item) {
        return !DomHandler.hasClass(DomHandler.findSingle(item, 'a'), 'p-disabled');
      });
      var newIndex = index === -1 ? filteredItems[0].id : index;
      var matchedOptionIndex = filteredItems.findIndex(function (link) {
        return link.getAttribute('id') === newIndex;
      });
      matchedOptionIndex = index === -1 ? 0 : matchedOptionIndex + 1;
      return matchedOptionIndex;
    },
    calculatePointStyle: function calculatePointStyle(index) {
      var type = this.type;
      if (type !== 'linear') {
        var length = this.model.length;
        var radius = this.radius || length * 20;
        if (type === 'circle') {
          var step = 2 * Math.PI / length;
          return {
            left: "calc(".concat(radius * Math.cos(step * index), "px + var(--item-diff-x, 0px))"),
            top: "calc(".concat(radius * Math.sin(step * index), "px + var(--item-diff-y, 0px))")
          };
        } else if (type === 'semi-circle') {
          var direction = this.direction;
          var _step = Math.PI / (length - 1);
          var x = "calc(".concat(radius * Math.cos(_step * index), "px + var(--item-diff-x, 0px))");
          var y = "calc(".concat(radius * Math.sin(_step * index), "px + var(--item-diff-y, 0px))");
          if (direction === 'up') {
            return {
              left: x,
              bottom: y
            };
          } else if (direction === 'down') {
            return {
              left: x,
              top: y
            };
          } else if (direction === 'left') {
            return {
              right: y,
              top: x
            };
          } else if (direction === 'right') {
            return {
              left: y,
              top: x
            };
          }
        } else if (type === 'quarter-circle') {
          var _direction = this.direction;
          var _step2 = Math.PI / (2 * (length - 1));
          var _x = "calc(".concat(radius * Math.cos(_step2 * index), "px + var(--item-diff-x, 0px))");
          var _y = "calc(".concat(radius * Math.sin(_step2 * index), "px + var(--item-diff-y, 0px))");
          if (_direction === 'up-left') {
            return {
              right: _x,
              bottom: _y
            };
          } else if (_direction === 'up-right') {
            return {
              left: _x,
              bottom: _y
            };
          } else if (_direction === 'down-left') {
            return {
              right: _y,
              top: _x
            };
          } else if (_direction === 'down-right') {
            return {
              left: _y,
              top: _x
            };
          }
        }
      }
      return {};
    },
    getItemStyle: function getItemStyle(index) {
      var transitionDelay = this.calculateTransitionDelay(index);
      var pointStyle = this.calculatePointStyle(index);
      return _objectSpread({
        transitionDelay: "".concat(transitionDelay, "ms")
      }, pointStyle);
    },
    bindDocumentClickListener: function bindDocumentClickListener() {
      var _this2 = this;
      if (!this.documentClickListener) {
        this.documentClickListener = function (event) {
          if (_this2.d_visible && _this2.isOutsideClicked(event)) {
            _this2.hide();
          }
          _this2.isItemClicked = false;
        };
        document.addEventListener('click', this.documentClickListener);
      }
    },
    unbindDocumentClickListener: function unbindDocumentClickListener() {
      if (this.documentClickListener) {
        document.removeEventListener('click', this.documentClickListener);
        this.documentClickListener = null;
      }
    },
    isOutsideClicked: function isOutsideClicked(event) {
      return this.container && !(this.container.isSameNode(event.target) || this.container.contains(event.target) || this.isItemClicked);
    },
    isItemVisible: function isItemVisible(item) {
      return typeof item.visible === 'function' ? item.visible() : item.visible !== false;
    },
    isItemActive: function isItemActive(id) {
      return id === this.focusedOptionId;
    },
    containerRef: function containerRef(el) {
      this.container = el;
    },
    listRef: function listRef(el) {
      this.list = el;
    }
  },
  computed: {
    containerClass: function containerClass() {
      return [this.cx('root'), this["class"]];
    },
    focusedOptionId: function focusedOptionId() {
      return this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : null;
    }
  },
  components: {
    SDButton: Button,
    PlusIcon: PlusIcon
  },
  directives: {
    ripple: Ripple,
    tooltip: Tooltip
  }
};

var _hoisted_1 = ["id", "aria-activedescendant"];
var _hoisted_2 = ["id", "aria-controls"];
var _hoisted_3 = ["href", "target", "onClick", "aria-label"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_SDButton = resolveComponent("SDButton");
  var _directive_tooltip = resolveDirective("tooltip");
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock(Fragment, null, [createElementVNode("div", mergeProps({
    ref: $options.containerRef,
    "class": $options.containerClass,
    style: _ctx.style
  }, _ctx.ptm('root'), {
    "data-pc-name": "speeddial"
  }), [renderSlot(_ctx.$slots, "button", {
    toggle: $options.onClick
  }, function () {
    return [createVNode(_component_SDButton, {
      type: "button",
      "class": normalizeClass([_ctx.cx('button'), _ctx.buttonClass]),
      onClick: _cache[0] || (_cache[0] = function ($event) {
        return $options.onClick($event);
      }),
      disabled: _ctx.disabled,
      onKeydown: $options.onTogglerKeydown,
      "aria-expanded": $data.d_visible,
      "aria-haspopup": true,
      "aria-controls": $data.id + '_list',
      "aria-label": _ctx.ariaLabel,
      "aria-labelledby": _ctx.ariaLabelledby,
      pt: _ctx.ptm('button'),
      unstyled: _ctx.unstyled
    }, {
      icon: withCtx(function () {
        return [renderSlot(_ctx.$slots, "icon", {
          visible: $data.d_visible
        }, function () {
          return [$data.d_visible && !!_ctx.hideIcon ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.hideIcon ? 'span' : 'PlusIcon'), mergeProps({
            key: 0,
            "class": _ctx.cx('buttonIcon')
          }, _ctx.ptm('button')['icon']), null, 16, ["class"])) : (openBlock(), createBlock(resolveDynamicComponent(_ctx.showIcon ? 'span' : 'PlusIcon'), mergeProps({
            key: 1,
            "class": $data.d_visible && !!_ctx.hideIcon ? _ctx.hideIcon : _ctx.showIcon
          }, _ctx.ptm('button')['icon']), null, 16, ["class"]))];
        })];
      }),
      _: 3
    }, 8, ["class", "disabled", "onKeydown", "aria-expanded", "aria-controls", "aria-label", "aria-labelledby", "pt", "unstyled"])];
  }), createElementVNode("ul", mergeProps({
    ref: $options.listRef,
    id: $data.id + '_list',
    "class": _ctx.cx('menu'),
    role: "menu",
    onFocus: _cache[1] || (_cache[1] = function () {
      return $options.onFocus && $options.onFocus.apply($options, arguments);
    }),
    onBlur: _cache[2] || (_cache[2] = function () {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    }),
    onKeydown: _cache[3] || (_cache[3] = function () {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    }),
    "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
    tabindex: "-1"
  }, _ctx.ptm('menu')), [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.model, function (item, index) {
    return openBlock(), createElementBlock(Fragment, {
      key: index
    }, [$options.isItemVisible(item) ? (openBlock(), createElementBlock("li", mergeProps({
      key: 0,
      id: "".concat($data.id, "_").concat(index),
      "aria-controls": "".concat($data.id, "_item"),
      "class": _ctx.cx('menuitem', {
        id: "".concat($data.id, "_").concat(index)
      }),
      style: $options.getItemStyle(index),
      role: "menuitem"
    }, $options.getPTOptions("".concat($data.id, "_").concat(index), 'menuitem')), [!_ctx.$slots.item ? withDirectives((openBlock(), createElementBlock("a", mergeProps({
      key: 0,
      tabindex: -1,
      href: item.url || '#',
      role: "menuitem",
      "class": _ctx.cx('action', {
        item: item
      }),
      target: item.target,
      onClick: function onClick($event) {
        return $options.onItemClick($event, item);
      },
      "aria-label": item.label
    }, $options.getPTOptions("".concat($data.id, "_").concat(index), 'action')), [item.icon ? (openBlock(), createElementBlock("span", mergeProps({
      key: 0,
      "class": [_ctx.cx('actionIcon'), item.icon]
    }, $options.getPTOptions("".concat($data.id, "_").concat(index), 'actionIcon')), null, 16)) : createCommentVNode("", true)], 16, _hoisted_3)), [[_directive_tooltip, {
      value: item.label,
      disabled: !_ctx.tooltipOptions
    }, _ctx.tooltipOptions], [_directive_ripple]]) : (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.item), {
      key: 1,
      item: item,
      onClick: function onClick(event) {
        return $options.onItemClick(event, item);
      }
    }, null, 8, ["item", "onClick"]))], 16, _hoisted_2)) : createCommentVNode("", true)], 64);
  }), 128))], 16, _hoisted_1)], 16), _ctx.mask ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": [_ctx.cx('mask'), _ctx.maskClass],
    style: _ctx.maskStyle
  }, _ctx.ptm('mask')), null, 16)) : createCommentVNode("", true)], 64);
}

script.render = render;

export { script as default };
