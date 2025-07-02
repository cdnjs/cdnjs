import { defineComponent, resolveComponent, createBlock, openBlock, mergeProps, withCtx, createElementVNode, createElementBlock, createCommentVNode, renderSlot, createVNode } from 'vue';
import { F as FormElementMixin } from './FormElementMixin-Dd_wkBN5.js';
import { matchWithGroups, isMobile } from './helpers.js';
import { c as config } from './config-CKuo-p6e.js';
import { B as BInput } from './Input-C4L520az.js';
import { B as BDatepicker } from './Datepicker-Bl8Wfdkn.js';
import { T as Timepicker } from './Timepicker-DnkqnOBT.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';
import { a as registerComponent } from './plugins-B172kuKE.js';
import './Icon-DPyGDeRK.js';
import './CompatFallthroughMixin-C8LPuwDr.js';
import './Dropdown-CGTYVyoL.js';
import './trapFocus-KHP_kCNE.js';
import './DropdownItem-Cn3nM0A3.js';
import './Field-B7bX_uUg.js';
import './Select-bl4qUzij.js';
import './TimepickerMixin-Bikh6_Fg.js';

const AM = "AM";
const PM = "PM";
var _sfc_main = defineComponent({
  name: "BDatetimepicker",
  components: {
    BDatepicker,
    BInput,
    BTimepicker: Timepicker
  },
  mixins: [FormElementMixin],
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [Date, null]
    },
    editable: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    horizontalTimePicker: Boolean,
    disabled: Boolean,
    firstDayOfWeek: {
      type: Number,
      default: () => {
        if (typeof config.defaultFirstDayOfWeek === "number") {
          return config.defaultFirstDayOfWeek;
        } else {
          return 0;
        }
      }
    },
    rulesForFirstWeek: {
      type: Number,
      default: () => 4
    },
    icon: String,
    iconRight: String,
    iconRightClickable: Boolean,
    iconPack: String,
    inline: Boolean,
    openOnFocus: Boolean,
    position: String,
    mobileNative: {
      type: Boolean,
      default: true
    },
    minDatetime: Date,
    maxDatetime: Date,
    nearbyMonthDays: {
      type: Boolean,
      default: config.defaultDatepickerNearbyMonthDays
    },
    datetimeFormatter: {
      type: Function
    },
    datetimeParser: {
      type: Function
    },
    datetimeCreator: {
      type: Function,
      default: (date) => {
        if (typeof config.defaultDatetimeCreator === "function") {
          return config.defaultDatetimeCreator(date);
        } else {
          return date;
        }
      }
    },
    datepicker: Object,
    timepicker: Object,
    tzOffset: {
      type: Number,
      default: 0
    },
    focusable: {
      type: Boolean,
      default: true
    },
    appendToBody: Boolean
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    "active-change": (_active) => true,
    "change-month": (_month) => true,
    "change-year": (_year) => true,
    "icon-right-click": () => true,
    "update:modelValue": (_value) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      newValue: this.adjustValue(this.modelValue)
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.newValue;
      },
      set(value) {
        if (value) {
          let val = new Date(value.getTime());
          if (this.newValue) {
            if ((value.getDate() !== this.newValue.getDate() || value.getMonth() !== this.newValue.getMonth() || value.getFullYear() !== this.newValue.getFullYear()) && value.getHours() === 0 && value.getMinutes() === 0 && value.getSeconds() === 0) {
              val.setHours(
                this.newValue.getHours(),
                this.newValue.getMinutes(),
                this.newValue.getSeconds(),
                0
              );
            }
          } else {
            val = this.datetimeCreator(value);
          }
          if (this.minDatetime && val < this.adjustValue(this.minDatetime)) {
            val = this.adjustValue(this.minDatetime);
          } else if (this.maxDatetime && val > this.adjustValue(this.maxDatetime)) {
            val = this.adjustValue(this.maxDatetime);
          }
          this.newValue = new Date(val.getTime());
        } else {
          this.newValue = this.adjustValue(value);
        }
        const adjustedValue = this.adjustValue(this.newValue, true);
        this.$emit("update:modelValue", adjustedValue);
      }
    },
    localeOptions() {
      return new Intl.DateTimeFormat(this.locale, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: this.enableSeconds() ? "numeric" : void 0
      }).resolvedOptions();
    },
    dtf() {
      return new Intl.DateTimeFormat(this.locale, {
        year: this.localeOptions.year || "numeric",
        month: this.localeOptions.month || "numeric",
        day: this.localeOptions.day || "numeric",
        hour: this.localeOptions.hour || "numeric",
        minute: this.localeOptions.minute || "numeric",
        second: this.enableSeconds() ? this.localeOptions.second || "numeric" : void 0,
        hourCycle: !this.isHourFormat24() ? "h12" : "h23"
      });
    },
    isMobileNative() {
      return this.mobileNative && this.tzOffset === 0;
    },
    isMobile() {
      return this.isMobileNative && isMobile.any();
    },
    minDate() {
      if (!this.minDatetime) {
        return this.datepicker ? this.adjustValue(this.datepicker.minDate) : null;
      }
      const adjMinDatetime = this.adjustValue(this.minDatetime);
      return new Date(
        adjMinDatetime.getFullYear(),
        adjMinDatetime.getMonth(),
        adjMinDatetime.getDate(),
        0,
        0,
        0,
        0
      );
    },
    maxDate() {
      if (!this.maxDatetime) {
        return this.datepicker ? this.adjustValue(this.datepicker.maxDate) : null;
      }
      const adjMaxDatetime = this.adjustValue(this.maxDatetime);
      return new Date(
        adjMaxDatetime.getFullYear(),
        adjMaxDatetime.getMonth(),
        adjMaxDatetime.getDate(),
        0,
        0,
        0,
        0
      );
    },
    minTime() {
      if (!this.minDatetime || (this.newValue === null || typeof this.newValue === "undefined")) {
        return this.timepicker ? this.adjustValue(this.timepicker.minTime) : null;
      }
      const adjMinDatetime = this.adjustValue(this.minDatetime);
      if (adjMinDatetime.getFullYear() === this.newValue.getFullYear() && adjMinDatetime.getMonth() === this.newValue.getMonth() && adjMinDatetime.getDate() === this.newValue.getDate()) {
        return adjMinDatetime;
      }
      return void 0;
    },
    maxTime() {
      if (!this.maxDatetime || (this.newValue === null || typeof this.newValue === "undefined")) {
        return this.timepicker ? this.adjustValue(this.timepicker.maxTime) : null;
      }
      const adjMaxDatetime = this.adjustValue(this.maxDatetime);
      if (adjMaxDatetime.getFullYear() === this.newValue.getFullYear() && adjMaxDatetime.getMonth() === this.newValue.getMonth() && adjMaxDatetime.getDate() === this.newValue.getDate()) {
        return adjMaxDatetime;
      }
      return void 0;
    },
    datepickerSize() {
      return this.datepicker && this.datepicker.size ? this.datepicker.size : this.size;
    },
    timepickerSize() {
      return this.timepicker && this.timepicker.size ? this.timepicker.size : this.size;
    },
    timepickerDisabled() {
      return this.timepicker && this.timepicker.disabled ? this.timepicker.disabled : this.disabled;
    },
    disabledOrUndefined() {
      return this.disabled || void 0;
    }
  },
  watch: {
    modelValue() {
      this.newValue = this.adjustValue(this.modelValue);
    },
    tzOffset() {
      this.newValue = this.adjustValue(this.modelValue);
    }
  },
  methods: {
    enableSeconds() {
      if (this.$refs.timepicker) {
        return this.$refs.timepicker.enableSeconds;
      }
      return false;
    },
    isHourFormat24() {
      if (this.$refs.timepicker) {
        return this.$refs.timepicker.isHourFormat24;
      }
      return !this.localeOptions.hour12;
    },
    adjustValue(value, reverse = false) {
      if (!value) return value;
      if (reverse) {
        return new Date(value.getTime() - this.tzOffset * 6e4);
      } else {
        return new Date(value.getTime() + this.tzOffset * 6e4);
      }
    },
    defaultDatetimeParser(date) {
      if (typeof this.datetimeParser === "function") {
        return this.datetimeParser(date);
      } else if (typeof config.defaultDatetimeParser === "function") {
        return config.defaultDatetimeParser(date);
      } else {
        if (this.dtf.formatToParts && typeof this.dtf.formatToParts === "function") {
          const dayPeriods = [AM, PM, AM.toLowerCase(), PM.toLowerCase()];
          if (this.$refs.timepicker) {
            dayPeriods.push(this.$refs.timepicker.amString);
            dayPeriods.push(this.$refs.timepicker.pmString);
          }
          const parts = this.dtf.formatToParts(/* @__PURE__ */ new Date());
          const formatRegex = parts.map((part, idx) => {
            if (part.type === "literal") {
              if (idx + 1 < parts.length && parts[idx + 1].type === "hour") {
                return "[^\\d]+";
              }
              return part.value.replace(/ /g, "\\s?");
            } else if (part.type === "dayPeriod") {
              return `((?!=<${part.type}>)(${dayPeriods.join("|")})?)`;
            }
            return `((?!=<${part.type}>)\\d+)`;
          }).join("");
          const datetimeGroups = matchWithGroups(formatRegex, date);
          if (datetimeGroups.year && datetimeGroups.year.length === 4 && datetimeGroups.month && +datetimeGroups.month <= 12 && datetimeGroups.day && +datetimeGroups.day <= 31 && datetimeGroups.hour && +datetimeGroups.hour >= 0 && +datetimeGroups.hour < 24 && datetimeGroups.minute && +datetimeGroups.minute >= 0 && +datetimeGroups.minute <= 59) {
            const d = new Date(
              +datetimeGroups.year,
              +datetimeGroups.month - 1,
              +datetimeGroups.day,
              +datetimeGroups.hour,
              +datetimeGroups.minute,
              +(datetimeGroups.second || 0)
            );
            return d;
          }
        }
        return new Date(Date.parse(date));
      }
    },
    defaultDatetimeFormatter(date) {
      date = date;
      if (typeof this.datetimeFormatter === "function") {
        return this.datetimeFormatter(date);
      } else if (typeof config.defaultDatetimeFormatter === "function") {
        return config.defaultDatetimeFormatter(date);
      } else {
        return this.dtf.format(date);
      }
    },
    /*
    * Parse date from string
    */
    onChangeNativePicker(event) {
      const date = event.target.value;
      const s = date ? date.split(/\D/) : [];
      if (s.length >= 5) {
        const year = parseInt(s[0], 10);
        const month = parseInt(s[1], 10) - 1;
        const day = parseInt(s[2], 10);
        const hours = parseInt(s[3], 10);
        const minutes = parseInt(s[4], 10);
        this.computedValue = new Date(year, month, day, hours, minutes);
      } else {
        this.computedValue = null;
      }
    },
    /*
     * Emit 'active-change' on datepicker active state change
     */
    onActiveChange(value) {
      this.$emit("active-change", value);
    },
    formatNative(value) {
      const date = new Date(value);
      if (value && !isNaN(date.valueOf())) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return year + "-" + ((month < 10 ? "0" : "") + month) + "-" + ((day < 10 ? "0" : "") + day) + "T" + ((hours < 10 ? "0" : "") + hours) + ":" + ((minutes < 10 ? "0" : "") + minutes) + ":" + ((seconds < 10 ? "0" : "") + seconds);
      }
      return "";
    },
    toggle() {
      this.$refs.datepicker.toggle();
    }
  },
  mounted() {
    if (!this.isMobile || this.inline) {
      if (this.newValue) {
        this.$refs.datepicker.$forceUpdate();
      }
    }
  }
});

const _hoisted_1 = { class: "level is-mobile" };
const _hoisted_2 = {
  key: 0,
  class: "level-item has-text-centered"
};
const _hoisted_3 = { class: "level-item has-text-centered" };
const _hoisted_4 = {
  key: 1,
  class: "level-item has-text-centered"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_timepicker = resolveComponent("b-timepicker");
  const _component_b_datepicker = resolveComponent("b-datepicker");
  const _component_b_input = resolveComponent("b-input");
  return !_ctx.isMobile || _ctx.inline ? (openBlock(), createBlock(_component_b_datepicker, mergeProps({
    key: 0,
    ref: "datepicker",
    modelValue: _ctx.computedValue,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.computedValue = $event)
  }, _ctx.datepicker, {
    rounded: _ctx.rounded,
    "open-on-focus": _ctx.openOnFocus,
    position: _ctx.position,
    loading: _ctx.loading,
    inline: _ctx.inline,
    editable: _ctx.editable,
    expanded: _ctx.expanded,
    "close-on-click": false,
    "first-day-of-week": _ctx.firstDayOfWeek,
    "rules-for-first-week": _ctx.rulesForFirstWeek,
    "date-formatter": _ctx.defaultDatetimeFormatter,
    "date-parser": _ctx.defaultDatetimeParser,
    "min-date": _ctx.minDate,
    "max-date": _ctx.maxDate,
    "nearby-month-days": _ctx.nearbyMonthDays,
    icon: _ctx.icon,
    "icon-right": _ctx.iconRight,
    "icon-right-clickable": _ctx.iconRightClickable,
    "icon-pack": _ctx.iconPack,
    size: _ctx.datepickerSize,
    placeholder: _ctx.placeholder,
    "horizontal-time-picker": _ctx.horizontalTimePicker,
    range: false,
    disabled: _ctx.disabledOrUndefined,
    "mobile-native": _ctx.isMobileNative,
    locale: _ctx.locale,
    focusable: _ctx.focusable,
    "append-to-body": _ctx.appendToBody,
    onFocus: _ctx.onFocus,
    onBlur: _ctx.onBlur,
    onActiveChange: _ctx.onActiveChange,
    onIconRightClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("icon-right-click")),
    onChangeMonth: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("change-month", $event)),
    onChangeYear: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("change-year", $event))
  }), {
    default: withCtx(() => [
      createElementVNode("nav", _hoisted_1, [
        _ctx.$slots.left !== void 0 ? (openBlock(), createElementBlock("div", _hoisted_2, [
          renderSlot(_ctx.$slots, "left")
        ])) : createCommentVNode("v-if", true),
        createElementVNode("div", _hoisted_3, [
          createVNode(_component_b_timepicker, mergeProps({ ref: "timepicker" }, _ctx.timepicker, {
            modelValue: _ctx.computedValue,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
            inline: "",
            editable: _ctx.editable,
            "min-time": _ctx.minTime,
            "max-time": _ctx.maxTime,
            size: _ctx.timepickerSize,
            disabled: _ctx.timepickerDisabled || void 0,
            focusable: _ctx.focusable,
            "mobile-native": _ctx.isMobileNative,
            locale: _ctx.locale
          }), null, 16, ["modelValue", "editable", "min-time", "max-time", "size", "disabled", "focusable", "mobile-native", "locale"])
        ]),
        _ctx.$slots.right !== void 0 ? (openBlock(), createElementBlock("div", _hoisted_4, [
          renderSlot(_ctx.$slots, "right")
        ])) : createCommentVNode("v-if", true)
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 16, ["modelValue", "rounded", "open-on-focus", "position", "loading", "inline", "editable", "expanded", "first-day-of-week", "rules-for-first-week", "date-formatter", "date-parser", "min-date", "max-date", "nearby-month-days", "icon", "icon-right", "icon-right-clickable", "icon-pack", "size", "placeholder", "horizontal-time-picker", "disabled", "mobile-native", "locale", "focusable", "append-to-body", "onFocus", "onBlur", "onActiveChange"])) : (openBlock(), createBlock(_component_b_input, mergeProps({
    key: 1,
    ref: "input",
    type: "datetime-local",
    autocomplete: "off",
    "model-value": _ctx.formatNative(_ctx.computedValue),
    placeholder: _ctx.placeholder,
    size: _ctx.size,
    icon: _ctx.icon,
    "icon-pack": _ctx.iconPack,
    rounded: _ctx.rounded,
    loading: _ctx.loading,
    max: _ctx.formatNative(_ctx.maxDate),
    min: _ctx.formatNative(_ctx.minDate),
    disabled: _ctx.disabledOrUndefined,
    readonly: false
  }, _ctx.$attrs, {
    "use-html5-validation": _ctx.useHtml5Validation,
    onChange: _ctx.onChangeNativePicker,
    onFocus: _ctx.onFocus,
    onBlur: _ctx.onBlur
  }), null, 16, ["model-value", "placeholder", "size", "icon", "icon-pack", "rounded", "loading", "max", "min", "disabled", "use-html5-validation", "onChange", "onFocus", "onBlur"]));
}
var Datetimepicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    registerComponent(Vue, Datetimepicker);
  }
};

export { Datetimepicker as BDatetimepicker, Plugin as default };
