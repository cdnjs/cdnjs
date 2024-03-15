this.primevue = this.primevue || {};
this.primevue.speeddial = (function (Button, PlusIcon, Ripple, Tooltip, utils, BaseComponent, SpeedDialStyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
    var PlusIcon__default = /*#__PURE__*/_interopDefaultLegacy(PlusIcon);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
    var Tooltip__default = /*#__PURE__*/_interopDefaultLegacy(Tooltip);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var SpeedDialStyle__default = /*#__PURE__*/_interopDefaultLegacy(SpeedDialStyle);

    var script$1 = {
      name: 'BaseSpeedDial',
      "extends": BaseComponent__default["default"],
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
        ariaLabelledby: {
          type: String,
          "default": null
        },
        ariaLabel: {
          type: String,
          "default": null
        }
      },
      style: SpeedDialStyle__default["default"],
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
    function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
    function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
    function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
    function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
    function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
    function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
    function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
    var script = {
      name: 'SpeedDial',
      "extends": script$1,
      inheritAttrs: false,
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
          this.id = newValue || utils.UniqueComponentId();
        },
        visible: function visible(newValue) {
          this.d_visible = newValue;
        }
      },
      mounted: function mounted() {
        this.id = this.id || utils.UniqueComponentId();
        if (this.type !== 'linear') {
          var button = utils.DomHandler.findSingle(this.container, '[data-pc-name="button"]');
          var firstItem = utils.DomHandler.findSingle(this.list, '[data-pc-section="menuitem"]');
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
      beforeUnmount: function beforeUnmount() {
        this.unbindDocumentClickListener();
      },
      methods: {
        getPTOptions: function getPTOptions(id, key) {
          return this.ptm(key, {
            context: {
              active: this.isItemActive(id),
              hidden: !this.d_visible
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
            case 'NumpadEnter':
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
          utils.DomHandler.focus(this.list);
          this.show();
          this.navigatePrevItem(event);
          event.preventDefault();
        },
        onTogglerArrowDown: function onTogglerArrowDown(event) {
          this.focused = true;
          utils.DomHandler.focus(this.list);
          this.show();
          this.navigateNextItem(event);
          event.preventDefault();
        },
        onEnterKey: function onEnterKey(event) {
          var _this = this;
          var items = utils.DomHandler.find(this.container, '[data-pc-section="menuitem"]');
          var itemIndex = _toConsumableArray(items).findIndex(function (item) {
            return item.id === _this.focusedOptionIndex;
          });
          this.onItemClick(event, this.model[itemIndex]);
          this.onBlur(event);
          var buttonEl = utils.DomHandler.findSingle(this.container, 'button');
          buttonEl && utils.DomHandler.focus(buttonEl);
        },
        onEscapeKey: function onEscapeKey() {
          this.hide();
          var buttonEl = utils.DomHandler.findSingle(this.container, 'button');
          buttonEl && utils.DomHandler.focus(buttonEl);
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
          var items = utils.DomHandler.find(this.container, '[data-pc-section="menuitem"]');
          var filteredItems = _toConsumableArray(items).filter(function (item) {
            return !utils.DomHandler.hasClass(utils.DomHandler.findSingle(item, 'a'), 'p-disabled');
          });
          if (filteredItems[index]) {
            this.focusedOptionIndex = filteredItems[index].getAttribute('id');
          }
        },
        findPrevOptionIndex: function findPrevOptionIndex(index) {
          var items = utils.DomHandler.find(this.container, '[data-pc-section="menuitem"]');
          var filteredItems = _toConsumableArray(items).filter(function (item) {
            return !utils.DomHandler.hasClass(utils.DomHandler.findSingle(item, 'a'), 'p-disabled');
          });
          var newIndex = index === -1 ? filteredItems[filteredItems.length - 1].id : index;
          var matchedOptionIndex = filteredItems.findIndex(function (link) {
            return link.getAttribute('id') === newIndex;
          });
          matchedOptionIndex = index === -1 ? filteredItems.length - 1 : matchedOptionIndex - 1;
          return matchedOptionIndex;
        },
        findNextOptionIndex: function findNextOptionIndex(index) {
          var items = utils.DomHandler.find(this.container, '[data-pc-section="menuitem"]');
          var filteredItems = _toConsumableArray(items).filter(function (item) {
            return !utils.DomHandler.hasClass(utils.DomHandler.findSingle(item, 'a'), 'p-disabled');
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
        SDButton: Button__default["default"],
        PlusIcon: PlusIcon__default["default"]
      },
      directives: {
        ripple: Ripple__default["default"],
        tooltip: Tooltip__default["default"]
      }
    };

    var _hoisted_1 = ["id", "aria-activedescendant"];
    var _hoisted_2 = ["id", "aria-controls"];
    var _hoisted_3 = ["href", "target", "onClick", "aria-label"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_SDButton = vue.resolveComponent("SDButton");
      var _directive_ripple = vue.resolveDirective("ripple");
      var _directive_tooltip = vue.resolveDirective("tooltip");
      return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [vue.createElementVNode("div", vue.mergeProps({
        ref: $options.containerRef,
        "class": $options.containerClass,
        style: [_ctx.style, _ctx.sx('root')]
      }, _ctx.ptmi('root')), [vue.renderSlot(_ctx.$slots, "button", {
        onClick: $options.onClick,
        toggleCallback: $options.onClick
      }, function () {
        return [vue.createVNode(_component_SDButton, {
          type: "button",
          "class": vue.normalizeClass([_ctx.cx('button'), _ctx.buttonClass]),
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
          icon: vue.withCtx(function () {
            return [vue.renderSlot(_ctx.$slots, "icon", {
              visible: $data.d_visible
            }, function () {
              return [$data.d_visible && !!_ctx.hideIcon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.hideIcon ? 'span' : 'PlusIcon'), vue.mergeProps({
                key: 0,
                "class": [_ctx.hideIcon, _ctx.cx('buttonIcon')]
              }, _ctx.ptm('button')['icon'], {
                "data-pc-section": "icon"
              }), null, 16, ["class"])) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.showIcon ? 'span' : 'PlusIcon'), vue.mergeProps({
                key: 1,
                "class": $data.d_visible && !!_ctx.hideIcon ? _ctx.hideIcon : _ctx.showIcon
              }, _ctx.ptm('button')['icon'], {
                "data-pc-section": "icon"
              }), null, 16, ["class"]))];
            })];
          }),
          _: 3
        }, 8, ["class", "disabled", "onKeydown", "aria-expanded", "aria-controls", "aria-label", "aria-labelledby", "pt", "unstyled"])];
      }), vue.createElementVNode("ul", vue.mergeProps({
        ref: $options.listRef,
        id: $data.id + '_list',
        "class": _ctx.cx('menu'),
        style: _ctx.sx('menu'),
        role: "menu",
        "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
        tabindex: "-1",
        onFocus: _cache[1] || (_cache[1] = function () {
          return $options.onFocus && $options.onFocus.apply($options, arguments);
        }),
        onBlur: _cache[2] || (_cache[2] = function () {
          return $options.onBlur && $options.onBlur.apply($options, arguments);
        }),
        onKeydown: _cache[3] || (_cache[3] = function () {
          return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
        })
      }, _ctx.ptm('menu')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.model, function (item, index) {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
          key: index
        }, [$options.isItemVisible(item) ? (vue.openBlock(), vue.createElementBlock("li", vue.mergeProps({
          key: 0,
          id: "".concat($data.id, "_").concat(index),
          "aria-controls": "".concat($data.id, "_item"),
          "class": _ctx.cx('menuitem', {
            id: "".concat($data.id, "_").concat(index)
          }),
          style: $options.getItemStyle(index),
          role: "menuitem"
        }, $options.getPTOptions("".concat($data.id, "_").concat(index), 'menuitem')), [!_ctx.$slots.item ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("a", vue.mergeProps({
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
        }, $options.getPTOptions("".concat($data.id, "_").concat(index), 'action')), [item.icon ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
          key: 0,
          "class": [_ctx.cx('actionIcon'), item.icon]
        }, $options.getPTOptions("".concat($data.id, "_").concat(index), 'actionIcon')), null, 16)) : vue.createCommentVNode("", true)], 16, _hoisted_3)), [[_directive_ripple], [_directive_tooltip, {
          value: item.label,
          disabled: !_ctx.tooltipOptions
        }, _ctx.tooltipOptions]]) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$slots.item), {
          key: 1,
          item: item,
          onClick: function onClick(event) {
            return $options.onItemClick(event, item);
          }
        }, null, 8, ["item", "onClick"]))], 16, _hoisted_2)) : vue.createCommentVNode("", true)], 64);
      }), 128))], 16, _hoisted_1)], 16), _ctx.mask ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        key: 0,
        "class": [_ctx.cx('mask'), _ctx.maskClass],
        style: _ctx.maskStyle
      }, _ctx.ptm('mask')), null, 16)) : vue.createCommentVNode("", true)], 64);
    }

    script.render = render;

    return script;

})(primevue.button, primevue.icons.plus, primevue.ripple, primevue.tooltip, primevue.utils, primevue.basecomponent, primevue.speeddial.style, Vue);
