'use strict';

var vue = require('vue');
var TimepickerMixin = require('./TimepickerMixin-C9WVvcUL.js');
var Dropdown = require('./Dropdown-DtpKU9qf.js');
var DropdownItem = require('./DropdownItem-IMOKyRGV.js');
var Input = require('./Input-BcloGeZ3.js');
var Field = require('./Field-19ZCJFF8.js');
var Select = require('./Select-DayPKwCY.js');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');

var _sfc_main = vue.defineComponent({
  name: "BTimepicker",
  components: {
    BInput: Input.BInput,
    BField: Field.Field,
    BSelect: Select.BSelect,
    BDropdown: Dropdown.BDropdown,
    BDropdownItem: DropdownItem.BDropdownItem
  },
  mixins: [TimepickerMixin.TimepickerMixin],
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
  const _component_b_input = vue.resolveComponent("b-input");
  const _component_b_select = vue.resolveComponent("b-select");
  const _component_b_field = vue.resolveComponent("b-field");
  const _component_b_dropdown_item = vue.resolveComponent("b-dropdown-item");
  const _component_b_dropdown = vue.resolveComponent("b-dropdown");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    vue.mergeProps({
      class: ["timepicker control", [_ctx.size, { "is-expanded": _ctx.expanded }]]
    }, _ctx.rootAttrs),
    [
      !_ctx.isMobile || _ctx.inline ? (vue.openBlock(), vue.createBlock(_component_b_dropdown, {
        key: 0,
        ref: "dropdown",
        position: _ctx.position,
        disabled: _ctx.disabledOrUndefined,
        inline: _ctx.inline,
        "mobile-modal": _ctx.mobileModal,
        "append-to-body": _ctx.appendToBody,
        "append-to-body-copy-parent": "",
        onActiveChange: _ctx.onActiveChange
      }, vue.createSlots({
        default: vue.withCtx(() => [
          vue.createVNode(_component_b_dropdown_item, {
            disabled: _ctx.disabledOrUndefined,
            focusable: _ctx.focusable,
            custom: ""
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_b_field, {
                grouped: "",
                position: "is-centered"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_b_select, {
                    modelValue: _ctx.hoursSelected,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.hoursSelected = $event),
                    onChange: _cache[3] || (_cache[3] = ($event) => _ctx.onHoursChange($event.target.value)),
                    disabled: _ctx.disabledOrUndefined,
                    placeholder: "00"
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(_ctx.hours, (hour) => {
                          return vue.openBlock(), vue.createElementBlock("option", {
                            value: hour.value,
                            key: hour.value,
                            disabled: _ctx.isHourDisabled(hour.value) || void 0
                          }, vue.toDisplayString(hour.label), 9, _hoisted_1);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "disabled"]),
                  vue.createElementVNode(
                    "span",
                    _hoisted_2,
                    vue.toDisplayString(_ctx.hourLiteral),
                    1
                    /* TEXT */
                  ),
                  vue.createVNode(_component_b_select, {
                    modelValue: _ctx.minutesSelected,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.minutesSelected = $event),
                    onChange: _cache[5] || (_cache[5] = ($event) => _ctx.onMinutesChange($event.target.value)),
                    disabled: _ctx.disabledOrUndefined,
                    placeholder: "00"
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(_ctx.minutes, (minute) => {
                          return vue.openBlock(), vue.createElementBlock("option", {
                            value: minute.value,
                            key: minute.value,
                            disabled: _ctx.isMinuteDisabled(minute.value) || void 0
                          }, vue.toDisplayString(minute.label), 9, _hoisted_3);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "disabled"]),
                  _ctx.enableSeconds ? (vue.openBlock(), vue.createElementBlock(
                    vue.Fragment,
                    { key: 0 },
                    [
                      vue.createElementVNode(
                        "span",
                        _hoisted_4,
                        vue.toDisplayString(_ctx.minuteLiteral),
                        1
                        /* TEXT */
                      ),
                      vue.createVNode(_component_b_select, {
                        modelValue: _ctx.secondsSelected,
                        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.secondsSelected = $event),
                        onChange: _cache[7] || (_cache[7] = ($event) => _ctx.onSecondsChange($event.target.value)),
                        disabled: _ctx.disabledOrUndefined,
                        placeholder: "00"
                      }, {
                        default: vue.withCtx(() => [
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList(_ctx.seconds, (second) => {
                              return vue.openBlock(), vue.createElementBlock("option", {
                                value: second.value,
                                key: second.value,
                                disabled: _ctx.isSecondDisabled(second.value) || void 0
                              }, vue.toDisplayString(second.label), 9, _hoisted_5);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["modelValue", "disabled"]),
                      vue.createElementVNode(
                        "span",
                        _hoisted_6,
                        vue.toDisplayString(_ctx.secondLiteral),
                        1
                        /* TEXT */
                      )
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )) : vue.createCommentVNode("v-if", true),
                  !_ctx.isHourFormat24 ? (vue.openBlock(), vue.createBlock(_component_b_select, {
                    key: 1,
                    modelValue: _ctx.meridienSelected,
                    "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => _ctx.meridienSelected = $event),
                    onChange: _cache[9] || (_cache[9] = ($event) => _ctx.onMeridienChange($event.target.value)),
                    disabled: _ctx.disabledOrUndefined
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(_ctx.meridiens, (meridien) => {
                          return vue.openBlock(), vue.createElementBlock("option", {
                            value: meridien,
                            key: meridien
                          }, vue.toDisplayString(meridien), 9, _hoisted_7);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "disabled"])) : vue.createCommentVNode("v-if", true)
                ]),
                _: 1
                /* STABLE */
              }),
              _ctx.$slots.default !== void 0 ? (vue.openBlock(), vue.createElementBlock("footer", _hoisted_8, [
                vue.renderSlot(_ctx.$slots, "default")
              ])) : vue.createCommentVNode("v-if", true)
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
          fn: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "trigger", {}, () => [
              vue.createVNode(_component_b_input, vue.mergeProps({
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
                onKeyup: _cache[0] || (_cache[0] = vue.withKeys(($event) => _ctx.toggle(true), ["enter"])),
                onChange: _cache[1] || (_cache[1] = ($event) => _ctx.onChange($event.target.value)),
                onFocus: _ctx.handleOnFocus
              }), null, 16, ["model-value", "placeholder", "size", "icon", "icon-pack", "loading", "disabled", "readonly", "rounded", "use-html5-validation", "onFocus"])
            ])
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["position", "disabled", "inline", "mobile-modal", "append-to-body", "onActiveChange"])) : (vue.openBlock(), vue.createBlock(_component_b_input, vue.mergeProps({
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
var Timepicker = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main, [["render", _sfc_render]]);

exports.Timepicker = Timepicker;
