'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var TimepickerMixin = require('./TimepickerMixin-C9WVvcUL.js');
var config = require('./config-DR826Ki2.js');
var Dropdown = require('./Dropdown-DtpKU9qf.js');
var Input = require('./Input-BcloGeZ3.js');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');
var plugins = require('./plugins-DbyYGVpp.js');
require('./CompatFallthroughMixin-hhK0Gkhr.js');
require('./FormElementMixin-DavX4iOv.js');
require('./helpers.js');
require('./trapFocus-BlX6xykt.js');
require('./Icon-lsDKE2wQ.js');

const indicatorSize = 40;
const paddingInner = 5;
var _sfc_main$1 = vue.defineComponent({
  name: "BClockpickerFace",
  props: {
    pickerSize: Number,
    min: Number,
    max: Number,
    double: Boolean,
    value: Number,
    faceNumbers: Array,
    disabledValues: Function
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    change: (_value) => true,
    input: (_value) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      isDragging: false,
      inputValue: this.value,
      prevAngle: 720
    };
  },
  computed: {
    /*
    * How many number indicators are shown on the face
    */
    count() {
      return this.max - this.min + 1;
    },
    /*
    * How many number indicators are shown per ring on the face
    */
    countPerRing() {
      return this.double ? this.count / 2 : this.count;
    },
    /*
    * Radius of the clock face
    */
    radius() {
      return this.pickerSize / 2;
    },
    /*
    * Radius of the outer ring of number indicators
    */
    outerRadius() {
      return this.radius - paddingInner - indicatorSize / 2;
    },
    /*
    * Radius of the inner ring of number indicators
    */
    innerRadius() {
      return Math.max(
        this.outerRadius * 0.6,
        this.outerRadius - paddingInner - indicatorSize
      );
    },
    /*
    * The angle for each selectable value
    * For hours this ends up being 30 degrees, for minutes 6 degrees
    */
    degreesPerUnit() {
      return 360 / this.countPerRing;
    },
    /*
    * Used for calculating x/y grid location based on degrees
    */
    degrees() {
      return this.degreesPerUnit * Math.PI / 180;
    },
    /*
    * Calculates the angle the clock hand should be rotated for the
    * selected value
    */
    handRotateAngle() {
      let currentAngle = this.prevAngle;
      while (currentAngle < 0) currentAngle += 360;
      const targetAngle = this.calcHandAngle(this.displayedValue);
      const degreesDiff = this.shortestDistanceDegrees(currentAngle, targetAngle);
      const angle = this.prevAngle + degreesDiff;
      return angle;
    },
    /*
    * Determines how long the selector hand is based on if the
    * selected value is located along the outer or inner ring
    */
    handScale() {
      return this.calcHandScale(this.displayedValue);
    },
    handStyle() {
      return {
        transform: `rotate(${this.handRotateAngle}deg) scaleY(${this.handScale})`,
        transition: ".3s cubic-bezier(.25,.8,.50,1)"
      };
    },
    /*
    * The value the hand should be pointing at
    */
    displayedValue() {
      return this.inputValue == null ? this.min : this.inputValue;
    }
  },
  watch: {
    value(value) {
      if (value !== this.inputValue) {
        this.prevAngle = this.handRotateAngle;
      }
      this.inputValue = value;
    }
  },
  methods: {
    isDisabled(value) {
      return this.disabledValues && this.disabledValues(value);
    },
    /*
    * Calculates the distance between two points
    */
    euclidean(p0, p1) {
      const dx = p1.x - p0.x;
      const dy = p1.y - p0.y;
      return Math.sqrt(dx * dx + dy * dy);
    },
    shortestDistanceDegrees(start, stop) {
      const modDiff = (stop - start) % 360;
      const shortestDistance = 180 - Math.abs(Math.abs(modDiff) - 180);
      return (modDiff + 360) % 360 < 180 ? shortestDistance * 1 : shortestDistance * -1;
    },
    /*
    * Calculates the angle of the line from the center point
    * to the given point.
    */
    coordToAngle(center, p1) {
      const value = 2 * Math.atan2(p1.y - center.y - this.euclidean(center, p1), p1.x - center.x);
      return Math.abs(value * 180 / Math.PI);
    },
    /*
    * Generates the inline style translate() property for a
    * number indicator, which determines it's location on the
    * clock face
    */
    getNumberTranslate(value) {
      const { x, y } = this.getNumberCoords(value);
      return `translate(${x}px, ${y}px)`;
    },
    /*
    * Calculates the coordinates on the clock face for a number
    * indicator value
    */
    getNumberCoords(value) {
      const radius = this.isInnerRing(value) ? this.innerRadius : this.outerRadius;
      return {
        x: Math.round(radius * Math.sin((value - this.min) * this.degrees)),
        y: Math.round(-radius * Math.cos((value - this.min) * this.degrees))
      };
    },
    getFaceNumberClasses(num) {
      return {
        active: num.value === this.displayedValue,
        disabled: this.isDisabled(num.value)
      };
    },
    /*
    * Determines if a value resides on the inner ring
    */
    isInnerRing(value) {
      return this.double && value - this.min >= this.countPerRing;
    },
    calcHandAngle(value) {
      let angle = this.degreesPerUnit * (value - this.min);
      if (this.isInnerRing(value)) angle -= 360;
      return angle;
    },
    calcHandScale(value) {
      return this.isInnerRing(value) ? this.innerRadius / this.outerRadius : 1;
    },
    onMouseDown(e) {
      e.preventDefault();
      this.isDragging = true;
      this.onDragMove(e);
    },
    onMouseUp() {
      this.isDragging = false;
      if (!this.isDisabled(this.inputValue)) {
        this.$emit("change", this.inputValue);
      }
    },
    onDragMove(e) {
      e.preventDefault();
      if (!this.isDragging && e.type !== "click") return;
      const { width, top, left } = this.$refs.clock.getBoundingClientRect();
      const { clientX, clientY } = "touches" in e ? e.touches[0] : e;
      const center = { x: width / 2, y: -width / 2 };
      const coords = { x: clientX - left, y: top - clientY };
      const handAngle = Math.round(this.coordToAngle(center, coords) + 360) % 360;
      const insideClick = this.double && this.euclidean(center, coords) < (this.outerRadius + this.innerRadius) / 2 - 16;
      let value = Math.round(handAngle / this.degreesPerUnit) + this.min + (insideClick ? this.countPerRing : 0);
      if (handAngle >= 360 - this.degreesPerUnit / 2) {
        value = insideClick ? this.max : this.min;
      }
      this.update(value);
    },
    update(value) {
      if (this.inputValue !== value && !this.isDisabled(value)) {
        this.prevAngle = this.handRotateAngle;
        this.inputValue = value;
        this.$emit("input", value);
      }
    }
  }
});

const _hoisted_1$1 = {
  class: "b-clockpicker-face-outer-ring",
  ref: "clock"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock(
    "div",
    {
      class: "b-clockpicker-face",
      onMousedown: _cache[0] || (_cache[0] = (...args) => _ctx.onMouseDown && _ctx.onMouseDown(...args)),
      onMouseup: _cache[1] || (_cache[1] = (...args) => _ctx.onMouseUp && _ctx.onMouseUp(...args)),
      onMousemove: _cache[2] || (_cache[2] = (...args) => _ctx.onDragMove && _ctx.onDragMove(...args)),
      onTouchstart: _cache[3] || (_cache[3] = (...args) => _ctx.onMouseDown && _ctx.onMouseDown(...args)),
      onTouchend: _cache[4] || (_cache[4] = (...args) => _ctx.onMouseUp && _ctx.onMouseUp(...args)),
      onTouchmove: _cache[5] || (_cache[5] = (...args) => _ctx.onDragMove && _ctx.onDragMove(...args))
    },
    [
      vue.createElementVNode(
        "div",
        _hoisted_1$1,
        [
          vue.createElementVNode(
            "div",
            {
              class: "b-clockpicker-face-hand",
              style: vue.normalizeStyle(_ctx.handStyle)
            },
            null,
            4
            /* STYLE */
          ),
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(_ctx.faceNumbers, (num, index) => {
              return vue.openBlock(), vue.createElementBlock(
                "span",
                {
                  key: index,
                  class: vue.normalizeClass(["b-clockpicker-face-number", _ctx.getFaceNumberClasses(num)]),
                  style: vue.normalizeStyle({ transform: _ctx.getNumberTranslate(num.value) })
                },
                [
                  vue.createElementVNode(
                    "span",
                    null,
                    vue.toDisplayString(num.label),
                    1
                    /* TEXT */
                  )
                ],
                6
                /* CLASS, STYLE */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        512
        /* NEED_PATCH */
      )
    ],
    32
    /* NEED_HYDRATION */
  );
}
var BClockpickerFace = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);

const outerPadding = 12;
var _sfc_main = vue.defineComponent({
  name: "BClockpicker",
  components: {
    BClockpickerFace,
    BInput: Input.BInput,
    BDropdown: Dropdown.BDropdown
  },
  mixins: [TimepickerMixin.TimepickerMixin],
  props: {
    pickerSize: {
      type: Number,
      default: 290
    },
    incrementMinutes: {
      type: Number,
      default: 5
    },
    type: {
      type: String,
      default: "is-primary"
    },
    hoursLabel: {
      type: String,
      default: () => config.config.defaultClockpickerHoursLabel || "Hours"
    },
    minutesLabel: {
      type: String,
      default: () => config.config.defaultClockpickerMinutesLabel || "Min"
    }
  },
  data() {
    return {
      isSelectingHour: true,
      isDragging: false,
      _isClockpicker: true
    };
  },
  computed: {
    hoursDisplay() {
      if (this.hoursSelected == null) return "--";
      if (this.isHourFormat24) return this.pad(this.hoursSelected);
      let display = this.hoursSelected;
      if (this.meridienSelected === this.pmString) {
        display -= 12;
      }
      if (display === 0) display = 12;
      return display;
    },
    minutesDisplay() {
      return this.minutesSelected == null ? "--" : this.pad(this.minutesSelected);
    },
    minFaceValue() {
      return this.isSelectingHour && !this.isHourFormat24 && this.meridienSelected === this.pmString ? 12 : 0;
    },
    maxFaceValue() {
      return this.isSelectingHour ? !this.isHourFormat24 && this.meridienSelected === this.amString ? 11 : 23 : 59;
    },
    faceSize() {
      return this.pickerSize - outerPadding * 2;
    },
    faceDisabledValues() {
      return this.isSelectingHour ? this.isHourDisabled : this.isMinuteDisabled;
    }
  },
  methods: {
    onClockInput(value) {
      if (this.isSelectingHour) {
        this.hoursSelected = value;
        this.onHoursChange(value);
      } else {
        this.minutesSelected = value;
        this.onMinutesChange(value);
      }
    },
    onClockChange() {
      if (this.isSelectingHour) {
        this.isSelectingHour = !this.isSelectingHour;
      } else {
        this.toggle(false);
      }
    },
    /*
     * Toggle clockpicker
     */
    toggle(active) {
      if (this.$refs.dropdown) {
        const dropdown = this.$refs.dropdown;
        dropdown.isActive = active != null ? active : !dropdown.isActive;
        if (dropdown.isActive) {
          this.isSelectingHour = true;
        }
      }
    },
    onMeridienClick(value) {
      if (this.meridienSelected !== value) {
        this.meridienSelected = value;
        this.onMeridienChange(value);
      }
    },
    /*
     * Avoid dropdown toggle when is already visible
     */
    onInputClick(event) {
      if (this.$refs.dropdown.isActive) {
        event.stopPropagation();
      }
    }
  }
});

const _hoisted_1 = ["disabled"];
const _hoisted_2 = {
  key: 0,
  class: "card-header"
};
const _hoisted_3 = { class: "b-clockpicker-header card-header-title" };
const _hoisted_4 = { class: "b-clockpicker-time" };
const _hoisted_5 = {
  key: 0,
  class: "b-clockpicker-period"
};
const _hoisted_6 = { class: "card-content" };
const _hoisted_7 = {
  key: 0,
  class: "b-clockpicker-time"
};
const _hoisted_8 = {
  key: 1,
  class: "b-clockpicker-period"
};
const _hoisted_9 = {
  key: 1,
  class: "b-clockpicker-footer card-footer"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_input = vue.resolveComponent("b-input");
  const _component_b_clockpicker_face = vue.resolveComponent("b-clockpicker-face");
  const _component_b_dropdown = vue.resolveComponent("b-dropdown");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    vue.mergeProps({
      class: ["b-clockpicker control", [_ctx.size, _ctx.type, { "is-expanded": _ctx.expanded }]]
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
          vue.createElementVNode("div", {
            class: "card",
            disabled: _ctx.disabledOrUndefined,
            custom: ""
          }, [
            _ctx.inline ? (vue.openBlock(), vue.createElementBlock("header", _hoisted_2, [
              vue.createElementVNode("div", _hoisted_3, [
                vue.createElementVNode("div", _hoisted_4, [
                  vue.createElementVNode(
                    "span",
                    {
                      class: vue.normalizeClass(["b-clockpicker-btn", { active: _ctx.isSelectingHour }]),
                      onClick: _cache[3] || (_cache[3] = ($event) => _ctx.isSelectingHour = true)
                    },
                    vue.toDisplayString(_ctx.hoursDisplay),
                    3
                    /* TEXT, CLASS */
                  ),
                  vue.createElementVNode(
                    "span",
                    null,
                    vue.toDisplayString(_ctx.hourLiteral),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "span",
                    {
                      class: vue.normalizeClass(["b-clockpicker-btn", { active: !_ctx.isSelectingHour }]),
                      onClick: _cache[4] || (_cache[4] = ($event) => _ctx.isSelectingHour = false)
                    },
                    vue.toDisplayString(_ctx.minutesDisplay),
                    3
                    /* TEXT, CLASS */
                  )
                ]),
                !_ctx.isHourFormat24 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5, [
                  vue.createElementVNode(
                    "div",
                    {
                      class: vue.normalizeClass(["b-clockpicker-btn", {
                        active: _ctx.meridienSelected === _ctx.amString || _ctx.meridienSelected === _ctx.AM
                      }]),
                      onClick: _cache[5] || (_cache[5] = ($event) => _ctx.onMeridienClick(_ctx.amString))
                    },
                    vue.toDisplayString(_ctx.amString),
                    3
                    /* TEXT, CLASS */
                  ),
                  vue.createElementVNode(
                    "div",
                    {
                      class: vue.normalizeClass(["b-clockpicker-btn", {
                        active: _ctx.meridienSelected === _ctx.pmString || _ctx.meridienSelected === _ctx.PM
                      }]),
                      onClick: _cache[6] || (_cache[6] = ($event) => _ctx.onMeridienClick(_ctx.pmString))
                    },
                    vue.toDisplayString(_ctx.pmString),
                    3
                    /* TEXT, CLASS */
                  )
                ])) : vue.createCommentVNode("v-if", true)
              ])
            ])) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("div", _hoisted_6, [
              vue.createElementVNode(
                "div",
                {
                  class: "b-clockpicker-body",
                  style: vue.normalizeStyle({ width: _ctx.faceSize + "px", height: _ctx.faceSize + "px" })
                },
                [
                  !_ctx.inline ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, [
                    vue.createElementVNode(
                      "div",
                      {
                        class: vue.normalizeClass(["b-clockpicker-btn", { active: _ctx.isSelectingHour }]),
                        onClick: _cache[7] || (_cache[7] = ($event) => _ctx.isSelectingHour = true)
                      },
                      vue.toDisplayString(_ctx.hoursLabel),
                      3
                      /* TEXT, CLASS */
                    ),
                    vue.createElementVNode(
                      "span",
                      {
                        class: vue.normalizeClass(["b-clockpicker-btn", { active: !_ctx.isSelectingHour }]),
                        onClick: _cache[8] || (_cache[8] = ($event) => _ctx.isSelectingHour = false)
                      },
                      vue.toDisplayString(_ctx.minutesLabel),
                      3
                      /* TEXT, CLASS */
                    )
                  ])) : vue.createCommentVNode("v-if", true),
                  !_ctx.isHourFormat24 && !_ctx.inline ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_8, [
                    vue.createElementVNode(
                      "div",
                      {
                        class: vue.normalizeClass(["b-clockpicker-btn", {
                          active: _ctx.meridienSelected === _ctx.amString || _ctx.meridienSelected === _ctx.AM
                        }]),
                        onClick: _cache[9] || (_cache[9] = ($event) => _ctx.onMeridienClick(_ctx.amString))
                      },
                      vue.toDisplayString(_ctx.amString),
                      3
                      /* TEXT, CLASS */
                    ),
                    vue.createElementVNode(
                      "div",
                      {
                        class: vue.normalizeClass(["b-clockpicker-btn", {
                          active: _ctx.meridienSelected === _ctx.pmString || _ctx.meridienSelected === _ctx.PM
                        }]),
                        onClick: _cache[10] || (_cache[10] = ($event) => _ctx.onMeridienClick(_ctx.pmString))
                      },
                      vue.toDisplayString(_ctx.pmString),
                      3
                      /* TEXT, CLASS */
                    )
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createVNode(_component_b_clockpicker_face, {
                    ref: "clockpickerFace",
                    "picker-size": _ctx.faceSize,
                    min: _ctx.minFaceValue,
                    max: _ctx.maxFaceValue,
                    "face-numbers": _ctx.isSelectingHour ? _ctx.hours : _ctx.minutes,
                    "disabled-values": _ctx.faceDisabledValues,
                    double: _ctx.isSelectingHour && _ctx.isHourFormat24,
                    value: _ctx.isSelectingHour ? _ctx.hoursSelected ?? void 0 : _ctx.minutesSelected ?? void 0,
                    onInput: _ctx.onClockInput,
                    onChange: _ctx.onClockChange
                  }, null, 8, ["picker-size", "min", "max", "face-numbers", "disabled-values", "double", "value", "onInput", "onChange"])
                ],
                4
                /* STYLE */
              )
            ]),
            _ctx.$slots.default !== void 0 && _ctx.$slots.default([]).length ? (vue.openBlock(), vue.createElementBlock("footer", _hoisted_9, [
              vue.renderSlot(_ctx.$slots, "default")
            ])) : vue.createCommentVNode("v-if", true)
          ], 8, _hoisted_1)
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
                readonly: !_ctx.editable,
                rounded: _ctx.rounded
              }, _ctx.fallthroughAttrs, {
                "use-html5-validation": _ctx.useHtml5Validation,
                onClick: _ctx.onInputClick,
                onKeyup: _cache[0] || (_cache[0] = vue.withKeys(($event) => _ctx.toggle(true), ["enter"])),
                onChange: _cache[1] || (_cache[1] = ($event) => _ctx.onChange($event.target.value)),
                onFocus: _ctx.handleOnFocus,
                onBlur: _cache[2] || (_cache[2] = ($event) => _ctx.checkHtml5Validity())
              }), null, 16, ["model-value", "placeholder", "size", "icon", "icon-pack", "loading", "disabled", "readonly", "rounded", "use-html5-validation", "onClick", "onFocus"])
            ])
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["position", "disabled", "inline", "mobile-modal", "append-to-body", "onActiveChange"])) : (vue.openBlock(), vue.createBlock(_component_b_input, vue.mergeProps({
        key: 1,
        ref: "input",
        type: "time",
        autocomplete: "off",
        "model-value": _ctx.formatHHMMSS(_ctx.computedValue),
        placeholder: _ctx.placeholder,
        size: _ctx.size,
        icon: _ctx.icon,
        "icon-pack": _ctx.iconPack,
        loading: _ctx.loading,
        max: _ctx.formatHHMMSS(_ctx.maxTime),
        min: _ctx.formatHHMMSS(_ctx.minTime),
        disabled: _ctx.disabledOrUndefined,
        readonly: false
      }, _ctx.fallthroughAttrs, {
        "use-html5-validation": _ctx.useHtml5Validation,
        onClick: _cache[11] || (_cache[11] = vue.withModifiers(($event) => _ctx.toggle(true), ["stop"])),
        onKeyup: _cache[12] || (_cache[12] = vue.withKeys(($event) => _ctx.toggle(true), ["enter"])),
        onChange: _ctx.onChangeNativePicker,
        onFocus: _ctx.handleOnFocus,
        onBlur: _cache[13] || (_cache[13] = ($event) => _ctx.onBlur() && _ctx.checkHtml5Validity())
      }), null, 16, ["model-value", "placeholder", "size", "icon", "icon-pack", "loading", "max", "min", "disabled", "use-html5-validation", "onChange", "onFocus"]))
    ],
    16
    /* FULL_PROPS */
  );
}
var Clockpicker = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Clockpicker);
  }
};

exports.BClockpicker = Clockpicker;
exports.default = Plugin;
