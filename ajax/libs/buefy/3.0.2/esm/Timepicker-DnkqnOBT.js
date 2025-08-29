import { defineComponent, resolveComponent, createElementBlock, openBlock, mergeProps, createBlock, createSlots, withCtx, createVNode, createCommentVNode, createElementVNode, Fragment, renderList, toDisplayString, renderSlot, withKeys } from 'vue';
import { T as TimepickerMixin } from './TimepickerMixin-Bikh6_Fg.js';
import { B as BDropdown } from './Dropdown-CGTYVyoL.js';
import { B as BDropdownItem } from './DropdownItem-Cn3nM0A3.js';
import { B as BInput } from './Input-C4L520az.js';
import { F as Field } from './Field-B7bX_uUg.js';
import { B as BSelect } from './Select-bl4qUzij.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';

var _sfc_main = defineComponent({
  name: "BTimepicker",
  components: {
    BInput,
    BField: Field,
    BSelect,
    BDropdown,
    BDropdownItem
  },
  mixins: [TimepickerMixin],
  data() {
    return {
      _isTimepicker: true
    };
  },
  computed: {
    nativeStep() {
      if (this.enableSeconds) {
        return "1";
      } else {
        return void 0;
      }
    }
  }
});

const _hoisted_1 = ["value", "disabled"];
const _hoisted_2 = { class: "control is-colon" };
const _hoisted_3 = ["value", "disabled"];
const _hoisted_4 = { class: "control is-colon" };
const _hoisted_5 = ["value", "disabled"];
const _hoisted_6 = { class: "control is-colon" };
const _hoisted_7 = ["value"];
const _hoisted_8 = {
  key: 0,
  class: "timepicker-footer"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_input = resolveComponent("b-input");
  const _component_b_select = resolveComponent("b-select");
  const _component_b_field = resolveComponent("b-field");
  const _component_b_dropdown_item = resolveComponent("b-dropdown-item");
  const _component_b_dropdown = resolveComponent("b-dropdown");
  return openBlock(), createElementBlock(
    "div",
    mergeProps({
      class: ["timepicker control", [_ctx.size, { "is-expanded": _ctx.expanded }]]
    }, _ctx.rootAttrs),
    [
      !_ctx.isMobile || _ctx.inline ? (openBlock(), createBlock(_component_b_dropdown, {
        key: 0,
        ref: "dropdown",
        position: _ctx.position,
        disabled: _ctx.disabledOrUndefined,
        inline: _ctx.inline,
        "mobile-modal": _ctx.mobileModal,
        "append-to-body": _ctx.appendToBody,
        "append-to-body-copy-parent": "",
        onActiveChange: _ctx.onActiveChange
      }, createSlots({
        default: withCtx(() => [
          createVNode(_component_b_dropdown_item, {
            disabled: _ctx.disabledOrUndefined,
            focusable: _ctx.focusable,
            custom: ""
          }, {
            default: withCtx(() => [
              createVNode(_component_b_field, {
                grouped: "",
                position: "is-centered"
              }, {
                default: withCtx(() => [
                  createVNode(_component_b_select, {
                    modelValue: _ctx.hoursSelected,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.hoursSelected = $event),
                    onChange: _cache[3] || (_cache[3] = ($event) => _ctx.onHoursChange($event.target.value)),
                    disabled: _ctx.disabledOrUndefined,
                    placeholder: "00"
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(
                        Fragment,
                        null,
                        renderList(_ctx.hours, (hour) => {
                          return openBlock(), createElementBlock("option", {
                            value: hour.value,
                            key: hour.value,
                            disabled: _ctx.isHourDisabled(hour.value) || void 0
                          }, toDisplayString(hour.label), 9, _hoisted_1);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "disabled"]),
                  createElementVNode(
                    "span",
                    _hoisted_2,
                    toDisplayString(_ctx.hourLiteral),
                    1
                    /* TEXT */
                  ),
                  createVNode(_component_b_select, {
                    modelValue: _ctx.minutesSelected,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.minutesSelected = $event),
                    onChange: _cache[5] || (_cache[5] = ($event) => _ctx.onMinutesChange($event.target.value)),
                    disabled: _ctx.disabledOrUndefined,
                    placeholder: "00"
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(
                        Fragment,
                        null,
                        renderList(_ctx.minutes, (minute) => {
                          return openBlock(), createElementBlock("option", {
                            value: minute.value,
                            key: minute.value,
                            disabled: _ctx.isMinuteDisabled(minute.value) || void 0
                          }, toDisplayString(minute.label), 9, _hoisted_3);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "disabled"]),
                  _ctx.enableSeconds ? (openBlock(), createElementBlock(
                    Fragment,
                    { key: 0 },
                    [
                      createElementVNode(
                        "span",
                        _hoisted_4,
                        toDisplayString(_ctx.minuteLiteral),
                        1
                        /* TEXT */
                      ),
                      createVNode(_component_b_select, {
                        modelValue: _ctx.secondsSelected,
                        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.secondsSelected = $event),
                        onChange: _cache[7] || (_cache[7] = ($event) => _ctx.onSecondsChange($event.target.value)),
                        disabled: _ctx.disabledOrUndefined,
                        placeholder: "00"
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(
                            Fragment,
                            null,
                            renderList(_ctx.seconds, (second) => {
                              return openBlock(), createElementBlock("option", {
                                value: second.value,
                                key: second.value,
                                disabled: _ctx.isSecondDisabled(second.value) || void 0
                              }, toDisplayString(second.label), 9, _hoisted_5);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["modelValue", "disabled"]),
                      createElementVNode(
                        "span",
                        _hoisted_6,
                        toDisplayString(_ctx.secondLiteral),
                        1
                        /* TEXT */
                      )
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )) : createCommentVNode("v-if", true),
                  !_ctx.isHourFormat24 ? (openBlock(), createBlock(_component_b_select, {
                    key: 1,
                    modelValue: _ctx.meridienSelected,
                    "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => _ctx.meridienSelected = $event),
                    onChange: _cache[9] || (_cache[9] = ($event) => _ctx.onMeridienChange($event.target.value)),
                    disabled: _ctx.disabledOrUndefined
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(
                        Fragment,
                        null,
                        renderList(_ctx.meridiens, (meridien) => {
                          return openBlock(), createElementBlock("option", {
                            value: meridien,
                            key: meridien
                          }, toDisplayString(meridien), 9, _hoisted_7);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "disabled"])) : createCommentVNode("v-if", true)
                ]),
                _: 1
                /* STABLE */
              }),
              _ctx.$slots.default !== void 0 ? (openBlock(), createElementBlock("footer", _hoisted_8, [
                renderSlot(_ctx.$slots, "default")
              ])) : createCommentVNode("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["disabled", "focusable"])
        ]),
        _: 2
        /* DYNAMIC */
      }, [
        !_ctx.inline ? {
          name: "trigger",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "trigger", {}, () => [
              createVNode(_component_b_input, mergeProps({
                ref: "input",
                autocomplete: "off",
                "model-value": _ctx.formatValue(_ctx.computedValue),
                placeholder: _ctx.placeholder,
                size: _ctx.size,
                icon: _ctx.icon,
                "icon-pack": _ctx.iconPack,
                loading: _ctx.loading,
                disabled: _ctx.disabledOrUndefined,
                readonly: !_ctx.editable || void 0,
                rounded: _ctx.rounded
              }, _ctx.fallthroughAttrs, {
                "use-html5-validation": _ctx.useHtml5Validation,
                onKeyup: _cache[0] || (_cache[0] = withKeys(($event) => _ctx.toggle(true), ["enter"])),
                onChange: _cache[1] || (_cache[1] = ($event) => _ctx.onChange($event.target.value)),
                onFocus: _ctx.handleOnFocus
              }), null, 16, ["model-value", "placeholder", "size", "icon", "icon-pack", "loading", "disabled", "readonly", "rounded", "use-html5-validation", "onFocus"])
            ])
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["position", "disabled", "inline", "mobile-modal", "append-to-body", "onActiveChange"])) : (openBlock(), createBlock(_component_b_input, mergeProps({
        key: 1,
        ref: "input",
        type: "time",
        step: _ctx.nativeStep,
        autocomplete: "off",
        "model-value": _ctx.formatHHMMSS(_ctx.computedValue),
        placeholder: _ctx.placeholder,
        size: _ctx.size,
        icon: _ctx.icon,
        "icon-pack": _ctx.iconPack,
        rounded: _ctx.rounded,
        loading: _ctx.loading,
        max: _ctx.formatHHMMSS(_ctx.maxTime),
        min: _ctx.formatHHMMSS(_ctx.minTime),
        disabled: _ctx.disabledOrUndefined,
        readonly: false
      }, _ctx.fallthroughAttrs, {
        "use-html5-validation": _ctx.useHtml5Validation,
        onChange: _cache[10] || (_cache[10] = ($event) => _ctx.onChange($event.target.value)),
        onFocus: _ctx.handleOnFocus,
        onBlur: _cache[11] || (_cache[11] = ($event) => _ctx.onBlur() && _ctx.checkHtml5Validity())
      }), null, 16, ["step", "model-value", "placeholder", "size", "icon", "icon-pack", "rounded", "loading", "max", "min", "disabled", "use-html5-validation", "onFocus"]))
    ],
    16
    /* FULL_PROPS */
  );
}
var Timepicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { Timepicker as T };
