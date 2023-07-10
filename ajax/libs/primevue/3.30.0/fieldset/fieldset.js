this.primevue = this.primevue || {};
this.primevue.fieldset = (function (MinusIcon, PlusIcon, Ripple, utils, BaseComponent, usestyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var MinusIcon__default = /*#__PURE__*/_interopDefaultLegacy(MinusIcon);
    var PlusIcon__default = /*#__PURE__*/_interopDefaultLegacy(PlusIcon);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var _classes;
    function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
    function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
    function _toPrimitive$1(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
    var styles = "\n.p-fieldset-legend > a,\n.p-fieldset-legend > span {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.p-fieldset-toggleable .p-fieldset-legend a {\n    cursor: pointer;\n    user-select: none;\n    overflow: hidden;\n    position: relative;\n    text-decoration: none;\n}\n\n.p-fieldset-legend-text {\n    line-height: 1;\n}\n";
    var classes = (_classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-fieldset p-component', {
          'p-fieldset-toggleable': props.toggleable
        }];
      },
      legend: 'p-fieldset-legend',
      legendtitle: 'p-fieldset-legend-text',
      togglericon: 'p-fieldset-toggler'
    }, _defineProperty$1(_classes, "legendtitle", 'p-fieldset-legend-text'), _defineProperty$1(_classes, "toggleablecontent", 'p-toggleable-content'), _defineProperty$1(_classes, "content", 'p-fieldset-content'), _classes);
    var _useStyle = usestyle.useStyle(styles, {
        name: 'fieldset',
        manual: true
      }),
      loadStyle = _useStyle.load;
    var script$1 = {
      name: 'BaseFieldset',
      "extends": BaseComponent__default["default"],
      props: {
        legend: String,
        toggleable: Boolean,
        collapsed: Boolean,
        toggleButtonProps: {
          type: null,
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

    var script = {
      name: 'Fieldset',
      "extends": script$1,
      emits: ['update:collapsed', 'toggle'],
      data: function data() {
        return {
          d_collapsed: this.collapsed
        };
      },
      watch: {
        collapsed: function collapsed(newValue) {
          this.d_collapsed = newValue;
        }
      },
      methods: {
        toggle: function toggle(event) {
          this.d_collapsed = !this.d_collapsed;
          this.$emit('update:collapsed', this.d_collapsed);
          this.$emit('toggle', {
            originalEvent: event,
            value: this.d_collapsed
          });
        },
        onKeyDown: function onKeyDown(event) {
          if (event.code === 'Enter' || event.code === 'Space') {
            this.toggle(event);
            event.preventDefault();
          }
        }
      },
      computed: {
        ariaId: function ariaId() {
          return utils.UniqueComponentId();
        },
        buttonAriaLabel: function buttonAriaLabel() {
          return this.toggleButtonProps && this.toggleButtonProps['aria-label'] ? this.toggleButtonProps['aria-label'] : this.legend;
        }
      },
      directives: {
        ripple: Ripple__default["default"]
      },
      components: {
        PlusIcon: PlusIcon__default["default"],
        MinusIcon: MinusIcon__default["default"]
      }
    };

    function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
    function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
    function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
    var _hoisted_1 = ["id"];
    var _hoisted_2 = ["id", "aria-controls", "aria-expanded", "aria-label"];
    var _hoisted_3 = ["id", "aria-labelledby"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _directive_ripple = vue.resolveDirective("ripple");
      return vue.openBlock(), vue.createElementBlock("fieldset", vue.mergeProps({
        "class": _ctx.cx('root')
      }, _ctx.ptm('root'), {
        "data-pc-name": "fieldset"
      }), [vue.createElementVNode("legend", vue.mergeProps({
        "class": _ctx.cx('legend')
      }, _ctx.ptm('legend')), [!_ctx.toggleable ? vue.renderSlot(_ctx.$slots, "legend", {
        key: 0
      }, function () {
        return [vue.createElementVNode("span", vue.mergeProps({
          id: $options.ariaId + '_header',
          "class": _ctx.cx('legendtitle')
        }, _ctx.ptm('legendtitle')), vue.toDisplayString(_ctx.legend), 17, _hoisted_1)];
      }) : vue.createCommentVNode("", true), _ctx.toggleable ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("a", vue.mergeProps({
        key: 1,
        id: $options.ariaId + '_header',
        tabindex: "0",
        role: "button",
        "aria-controls": $options.ariaId + '_content',
        "aria-expanded": !$data.d_collapsed,
        "aria-label": $options.buttonAriaLabel,
        onClick: _cache[0] || (_cache[0] = function () {
          return $options.toggle && $options.toggle.apply($options, arguments);
        }),
        onKeydown: _cache[1] || (_cache[1] = function () {
          return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
        })
      }, _objectSpread(_objectSpread({}, _ctx.toggleButtonProps), _ctx.ptm('toggler'))), [vue.renderSlot(_ctx.$slots, "togglericon", {
        collapsed: $data.d_collapsed
      }, function () {
        return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($data.d_collapsed ? 'PlusIcon' : 'MinusIcon'), vue.mergeProps({
          "class": _ctx.cx('togglericon')
        }, _ctx.ptm('togglericon')), null, 16, ["class"]))];
      }), vue.renderSlot(_ctx.$slots, "legend", {}, function () {
        return [vue.createElementVNode("span", vue.mergeProps({
          "class": _ctx.cx('legendtitle')
        }, _ctx.ptm('legendtitle')), vue.toDisplayString(_ctx.legend), 17)];
      })], 16, _hoisted_2)), [[_directive_ripple]]) : vue.createCommentVNode("", true)], 16), vue.createVNode(vue.Transition, {
        name: "p-toggleable-content"
      }, {
        "default": vue.withCtx(function () {
          return [vue.withDirectives(vue.createElementVNode("div", vue.mergeProps({
            id: $options.ariaId + '_content',
            "class": _ctx.cx('toggleablecontent'),
            role: "region",
            "aria-labelledby": $options.ariaId + '_header'
          }, _ctx.ptm('toggleablecontent')), [vue.createElementVNode("div", vue.mergeProps({
            "class": _ctx.cx('content')
          }, _ctx.ptm('content')), [vue.renderSlot(_ctx.$slots, "default")], 16)], 16, _hoisted_3), [[vue.vShow, !$data.d_collapsed]])];
        }),
        _: 3
      })], 16);
    }

    script.render = render;

    return script;

})(primevue.icons.minus, primevue.icons.plus, primevue.ripple, primevue.utils, primevue.basecomponent, primevue.usestyle, Vue);
