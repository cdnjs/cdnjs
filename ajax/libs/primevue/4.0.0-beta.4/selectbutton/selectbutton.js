this.primevue = this.primevue || {};
this.primevue.selectbutton = (function (Ripple, ToggleButton, utils, BaseComponent, SelectButtonStyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
    var ToggleButton__default = /*#__PURE__*/_interopDefaultLegacy(ToggleButton);
    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
    var SelectButtonStyle__default = /*#__PURE__*/_interopDefaultLegacy(SelectButtonStyle);

    var script$1 = {
      name: 'BaseSelectButton',
      "extends": BaseComponent__default["default"],
      props: {
        modelValue: null,
        options: Array,
        optionLabel: null,
        optionValue: null,
        optionDisabled: null,
        multiple: Boolean,
        unselectable: {
          type: Boolean,
          "default": true
        },
        allowEmpty: {
          type: Boolean,
          "default": true
        },
        invalid: {
          type: Boolean,
          "default": false
        },
        disabled: Boolean,
        dataKey: null,
        ariaLabelledby: {
          type: String,
          "default": null
        }
      },
      style: SelectButtonStyle__default["default"],
      provide: function provide() {
        return {
          $pcSelectButton: this,
          $parentInstance: this
        };
      }
    };

    function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
    function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
    function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
    function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
    function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
    var script = {
      name: 'SelectButton',
      "extends": script$1,
      inheritAttrs: false,
      emits: ['update:modelValue', 'change'],
      methods: {
        getOptionLabel: function getOptionLabel(option) {
          return this.optionLabel ? utils.ObjectUtils.resolveFieldData(option, this.optionLabel) : option;
        },
        getOptionValue: function getOptionValue(option) {
          return this.optionValue ? utils.ObjectUtils.resolveFieldData(option, this.optionValue) : option;
        },
        getOptionRenderKey: function getOptionRenderKey(option) {
          return this.dataKey ? utils.ObjectUtils.resolveFieldData(option, this.dataKey) : this.getOptionLabel(option);
        },
        getPTOptions: function getPTOptions(option, key) {
          return this.ptm(key, {
            context: {
              active: this.isSelected(option),
              disabled: this.isOptionDisabled(option),
              option: option
            }
          });
        },
        isOptionDisabled: function isOptionDisabled(option) {
          return this.optionDisabled ? utils.ObjectUtils.resolveFieldData(option, this.optionDisabled) : false;
        },
        onOptionSelect: function onOptionSelect(event, option, index) {
          var _this = this;
          if (this.disabled || this.isOptionDisabled(option)) {
            return;
          }
          var selected = this.isSelected(option);
          if (selected && !(this.unselectable && this.allowEmpty)) {
            return;
          }
          var optionValue = this.getOptionValue(option);
          var newValue;
          if (this.multiple) {
            if (selected) newValue = this.modelValue.filter(function (val) {
              return !utils.ObjectUtils.equals(val, optionValue, _this.equalityKey);
            });else newValue = this.modelValue ? [].concat(_toConsumableArray(this.modelValue), [optionValue]) : [optionValue];
          } else {
            newValue = selected ? null : optionValue;
          }
          this.focusedIndex = index;
          this.$emit('update:modelValue', newValue);
          this.$emit('change', {
            event: event,
            value: newValue
          });
        },
        isSelected: function isSelected(option) {
          var selected = false;
          var optionValue = this.getOptionValue(option);
          if (this.multiple) {
            if (this.modelValue) {
              var _iterator = _createForOfIteratorHelper(this.modelValue),
                _step;
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var val = _step.value;
                  if (utils.ObjectUtils.equals(val, optionValue, this.equalityKey)) {
                    selected = true;
                    break;
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            }
          } else {
            selected = utils.ObjectUtils.equals(this.modelValue, optionValue, this.equalityKey);
          }
          return selected;
        }
      },
      computed: {
        equalityKey: function equalityKey() {
          return this.optionValue ? null : this.dataKey;
        }
      },
      directives: {
        ripple: Ripple__default["default"]
      },
      components: {
        ToggleButton: ToggleButton__default["default"]
      }
    };

    var _hoisted_1 = ["aria-labelledby"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      var _component_ToggleButton = vue.resolveComponent("ToggleButton");
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('root'),
        role: "group",
        "aria-labelledby": _ctx.ariaLabelledby
      }, _ctx.ptmi('root')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.options, function (option, index) {
        return vue.openBlock(), vue.createBlock(_component_ToggleButton, {
          key: $options.getOptionRenderKey(option),
          modelValue: $options.isSelected(option),
          onLabel: $options.getOptionLabel(option),
          offLabel: $options.getOptionLabel(option),
          disabled: _ctx.disabled || $options.isOptionDisabled(option),
          unstyled: _ctx.unstyled,
          onChange: function onChange($event) {
            return $options.onOptionSelect($event, option, index);
          },
          pt: _ctx.ptm('pcButton')
        }, vue.createSlots({
          _: 2
        }, [_ctx.$slots.option ? {
          name: "default",
          fn: vue.withCtx(function () {
            return [vue.renderSlot(_ctx.$slots, "option", {
              option: option,
              index: index
            }, function () {
              return [vue.createElementVNode("span", vue.mergeProps({
                ref_for: true
              }, _ctx.ptm('pcButton')['label']), vue.toDisplayString($options.getOptionLabel(option)), 17)];
            })];
          }),
          key: "0"
        } : undefined]), 1032, ["modelValue", "onLabel", "offLabel", "disabled", "unstyled", "onChange", "pt"]);
      }), 128))], 16, _hoisted_1);
    }

    script.render = render;

    return script;

})(primevue.ripple, primevue.togglebutton, primevue.utils, primevue.basecomponent, primevue.selectbutton.style, Vue);
