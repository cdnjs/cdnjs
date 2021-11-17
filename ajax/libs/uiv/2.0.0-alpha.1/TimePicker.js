var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import { openBlock, createElementBlock, normalizeClass, renderSlot, resolveComponent, createBlock, withCtx, createElementVNode, withModifiers, createVNode, createCommentVNode, withDirectives, normalizeStyle, withKeys, vModelText, toDisplayString, createTextVNode } from "vue";
function isExist(obj) {
  return typeof obj !== "undefined" && obj !== null;
}
var defaultLang = {
  uiv: {
    datePicker: {
      clear: "Clear",
      today: "Today",
      month: "Month",
      month1: "January",
      month2: "February",
      month3: "March",
      month4: "April",
      month5: "May",
      month6: "June",
      month7: "July",
      month8: "August",
      month9: "September",
      month10: "October",
      month11: "November",
      month12: "December",
      year: "Year",
      week1: "Mon",
      week2: "Tue",
      week3: "Wed",
      week4: "Thu",
      week5: "Fri",
      week6: "Sat",
      week7: "Sun"
    },
    timePicker: {
      am: "AM",
      pm: "PM"
    },
    modal: {
      cancel: "Cancel",
      ok: "OK"
    },
    multiSelect: {
      placeholder: "Select...",
      filterPlaceholder: "Search..."
    }
  }
};
let lang = defaultLang;
let i18nHandler = function() {
  if ("$t" in this) {
    return this.$t.apply(this, arguments);
  }
  return null;
};
const t = function(path, options) {
  options = options || {};
  let value;
  try {
    value = i18nHandler.apply(this, arguments);
    if (isExist(value) && !options.$$locale) {
      return value;
    }
  } catch (e) {
  }
  const array = path.split(".");
  let current = options.$$locale || lang;
  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i];
    value = current[property];
    if (i === j - 1)
      return value;
    if (!value)
      return "";
    current = value;
  }
  return "";
};
var Local = {
  methods: {
    t() {
      const args = [];
      for (let i = 0; i < arguments.length; ++i) {
        args.push(arguments[i]);
      }
      args[1] = __spreadValues({ $$locale: this.locale }, args[1]);
      return t.apply(this, args);
    }
  },
  props: {
    locale: Object
  }
};
var linkMixin = {
  props: {
    href: String,
    target: String,
    to: null,
    replace: {
      type: Boolean,
      default: false
    },
    append: {
      type: Boolean,
      default: false
    },
    exact: {
      type: Boolean,
      default: false
    }
  }
};
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main$2 = {
  props: {
    size: { type: String, default: void 0 },
    vertical: {
      type: Boolean,
      default: false
    },
    justified: {
      type: Boolean,
      default: false
    }
  }
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass({
      "btn-group": !$props.vertical,
      "btn-group-vertical": $props.vertical,
      "btn-group-justified": $props.justified,
      [`btn-group-${$props.size}`]: $props.size
    }),
    role: "group",
    "data-toggle": "buttons"
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var BtnGroup = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const INPUT_TYPE_CHECKBOX = "checkbox";
const INPUT_TYPE_RADIO = "radio";
const _sfc_main$1 = {
  components: { BtnGroup },
  mixins: [linkMixin],
  props: {
    justified: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "default"
    },
    nativeType: {
      type: String,
      default: "button"
    },
    size: {
      type: String,
      default: void 0
    },
    block: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: null,
      default: null
    },
    inputValue: {
      type: null,
      default: null
    },
    inputType: {
      type: String,
      validator(value) {
        return value === INPUT_TYPE_CHECKBOX || value === INPUT_TYPE_RADIO;
      },
      default: void 0
    }
  },
  emits: ["update:modelValue"],
  computed: {
    isInputActive() {
      return this.inputType === INPUT_TYPE_CHECKBOX ? this.modelValue.indexOf(this.inputValue) >= 0 : this.modelValue === this.inputValue;
    },
    classes() {
      return {
        btn: true,
        active: this.inputType ? this.isInputActive : this.active,
        disabled: this.disabled,
        "btn-block": this.block,
        [`btn-${this.type}`]: Boolean(this.type),
        [`btn-${this.size}`]: Boolean(this.size)
      };
    }
  },
  methods: {
    onClick(e) {
      if (this.disabled && e instanceof Event) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    onInputChange() {
      if (this.inputType === INPUT_TYPE_CHECKBOX) {
        const valueCopied = this.modelValue.slice();
        if (this.isInputActive) {
          valueCopied.splice(valueCopied.indexOf(this.inputValue), 1);
        } else {
          valueCopied.push(this.inputValue);
        }
        this.$emit("update:modelValue", valueCopied);
      } else {
        this.$emit("update:modelValue", this.inputValue);
      }
    }
  }
};
const _hoisted_1$1 = ["href", "target"];
const _hoisted_2$1 = ["type", "checked", "disabled"];
const _hoisted_3$1 = ["type", "disabled"];
const _hoisted_4$1 = ["type", "disabled"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");
  const _component_BtnGroup = resolveComponent("BtnGroup");
  return _ctx.href ? (openBlock(), createElementBlock("a", {
    key: 0,
    href: _ctx.href,
    target: _ctx.target,
    role: "button",
    class: normalizeClass($options.classes),
    onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 10, _hoisted_1$1)) : _ctx.to ? (openBlock(), createBlock(_component_router_link, {
    key: 1,
    to: _ctx.to,
    class: normalizeClass($options.classes),
    event: $props.disabled ? "" : "click",
    replace: _ctx.replace,
    append: _ctx.append,
    exact: _ctx.exact,
    role: "button",
    onClick: $options.onClick
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["to", "class", "event", "replace", "append", "exact", "onClick"])) : $props.inputType ? (openBlock(), createElementBlock("label", {
    key: 2,
    class: normalizeClass($options.classes),
    onClick: _cache[3] || (_cache[3] = (...args) => $options.onClick && $options.onClick(...args))
  }, [
    createElementVNode("input", {
      autocomplete: "off",
      type: $props.inputType,
      checked: $options.isInputActive,
      disabled: $props.disabled,
      onInput: _cache[1] || (_cache[1] = withModifiers(() => {
      }, ["stop"])),
      onChange: _cache[2] || (_cache[2] = (...args) => $options.onInputChange && $options.onInputChange(...args))
    }, null, 40, _hoisted_2$1),
    renderSlot(_ctx.$slots, "default")
  ], 2)) : $props.justified ? (openBlock(), createBlock(_component_BtnGroup, { key: 3 }, {
    default: withCtx(() => [
      createElementVNode("button", {
        class: normalizeClass($options.classes),
        type: $props.nativeType,
        disabled: $props.disabled,
        onClick: _cache[4] || (_cache[4] = (...args) => $options.onClick && $options.onClick(...args))
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_3$1)
    ]),
    _: 3
  })) : (openBlock(), createElementBlock("button", {
    key: 4,
    class: normalizeClass($options.classes),
    type: $props.nativeType,
    disabled: $props.disabled,
    onClick: _cache[5] || (_cache[5] = (...args) => $options.onClick && $options.onClick(...args))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 10, _hoisted_4$1));
}
var Btn = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
function pad(value, num) {
  value = value + "";
  for (let i = num - value.length; i > 0; i--) {
    value = "0" + value;
  }
  return value;
}
const maxHours = 23;
const zero = 0;
const maxMinutes = 59;
const cutUpAmAndPm = 12;
const _sfc_main = {
  components: { Btn },
  mixins: [Local],
  props: {
    modelValue: {
      type: Date,
      required: true
    },
    showMeridian: {
      type: Boolean,
      default: true
    },
    min: { type: null, default: void 0 },
    max: { type: null, default: void 0 },
    hourStep: {
      type: Number,
      default: 1
    },
    minStep: {
      type: Number,
      default: 1
    },
    readonly: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: true
    },
    iconControlUp: {
      type: String,
      default: "glyphicon glyphicon-chevron-up"
    },
    iconControlDown: {
      type: String,
      default: "glyphicon glyphicon-chevron-down"
    },
    inputWidth: {
      type: Number,
      default: 50
    }
  },
  emits: ["update:modelValue"],
  data() {
    return {
      hours: 0,
      minutes: 0,
      meridian: true,
      hoursText: "",
      minutesText: ""
    };
  },
  computed: {
    inputStyles() {
      return {
        width: `${this.inputWidth}px`
      };
    }
  },
  watch: {
    modelValue(value) {
      this.updateByValue(value);
    },
    showMeridian(value) {
      this.setTime();
    },
    hoursText(value) {
      if (this.hours === 0 && value === "") {
        return;
      }
      const hour = parseInt(value);
      if (this.showMeridian) {
        if (hour >= 1 && hour <= cutUpAmAndPm) {
          if (this.meridian) {
            this.hours = hour === cutUpAmAndPm ? 0 : hour;
          } else {
            this.hours = hour === cutUpAmAndPm ? cutUpAmAndPm : hour + cutUpAmAndPm;
          }
        }
      } else if (hour >= zero && hour <= maxHours) {
        this.hours = hour;
      }
      this.setTime();
    },
    minutesText(value) {
      if (this.minutes === 0 && value === "") {
        return;
      }
      const minutesStr = parseInt(value);
      if (minutesStr >= zero && minutesStr <= maxMinutes) {
        this.minutes = minutesStr;
      }
      this.setTime();
    }
  },
  mounted() {
    this.updateByValue(this.modelValue);
  },
  methods: {
    updateByValue(value) {
      if (isNaN(value.getTime())) {
        this.hours = 0;
        this.minutes = 0;
        this.hoursText = "";
        this.minutesText = "";
        this.meridian = true;
        return;
      }
      this.hours = value.getHours();
      this.minutes = value.getMinutes();
      if (!this.showMeridian) {
        this.hoursText = pad(this.hours, 2);
      } else {
        if (this.hours >= cutUpAmAndPm) {
          if (this.hours === cutUpAmAndPm) {
            this.hoursText = this.hours + "";
          } else {
            this.hoursText = pad(this.hours - cutUpAmAndPm, 2);
          }
          this.meridian = false;
        } else {
          if (this.hours === zero) {
            this.hoursText = cutUpAmAndPm.toString();
          } else {
            this.hoursText = pad(this.hours, 2);
          }
          this.meridian = true;
        }
      }
      this.minutesText = pad(this.minutes, 2);
      this.$refs.hoursInput.value = this.hoursText;
      this.$refs.minutesInput.value = this.minutesText;
    },
    addHour(step) {
      step = step || this.hourStep;
      this.hours = this.hours >= maxHours ? zero : this.hours + step;
    },
    reduceHour(step) {
      step = step || this.hourStep;
      this.hours = this.hours <= zero ? maxHours : this.hours - step;
    },
    addMinute() {
      if (this.minutes >= maxMinutes) {
        this.minutes = zero;
        this.addHour(1);
      } else {
        this.minutes += this.minStep;
      }
    },
    reduceMinute() {
      if (this.minutes <= zero) {
        this.minutes = maxMinutes + 1 - this.minStep;
        this.reduceHour(1);
      } else {
        this.minutes -= this.minStep;
      }
    },
    changeTime(isHour, isPlus) {
      if (!this.readonly) {
        if (isHour && isPlus) {
          this.addHour();
        } else if (isHour && !isPlus) {
          this.reduceHour();
        } else if (!isHour && isPlus) {
          this.addMinute();
        } else {
          this.reduceMinute();
        }
        this.setTime();
      }
    },
    toggleMeridian() {
      this.meridian = !this.meridian;
      if (this.meridian) {
        this.hours -= cutUpAmAndPm;
      } else {
        this.hours += cutUpAmAndPm;
      }
      this.setTime();
    },
    onWheel(e, isHour) {
      if (!this.readonly) {
        e.preventDefault();
        this.changeTime(isHour, e.deltaY < 0);
      }
    },
    setTime() {
      let time = this.modelValue;
      if (isNaN(time.getTime())) {
        time = new Date();
        time.setHours(0);
        time.setMinutes(0);
      }
      time.setHours(this.hours);
      time.setMinutes(this.minutes);
      if (this.max instanceof Date) {
        const max = new Date(time);
        max.setHours(this.max.getHours());
        max.setMinutes(this.max.getMinutes());
        time = time > max ? max : time;
      }
      if (this.min instanceof Date) {
        const min = new Date(time);
        min.setHours(this.min.getHours());
        min.setMinutes(this.min.getMinutes());
        time = time < min ? min : time;
      }
      this.$emit("update:modelValue", new Date(time));
    },
    selectInputValue(e) {
      e.target.setSelectionRange(0, 2);
    }
  }
};
const _hoisted_1 = {
  key: 0,
  class: "text-center"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("td", null, "\xA0", -1);
const _hoisted_3 = { key: 0 };
const _hoisted_4 = { class: "form-group" };
const _hoisted_5 = ["readonly"];
const _hoisted_6 = /* @__PURE__ */ createElementVNode("td", null, [
  /* @__PURE__ */ createTextVNode("\xA0"),
  /* @__PURE__ */ createElementVNode("b", null, ":"),
  /* @__PURE__ */ createTextVNode("\xA0")
], -1);
const _hoisted_7 = { class: "form-group" };
const _hoisted_8 = ["readonly"];
const _hoisted_9 = { key: 0 };
const _hoisted_10 = /* @__PURE__ */ createTextVNode(" \xA0 ");
const _hoisted_11 = {
  key: 1,
  class: "text-center"
};
const _hoisted_12 = /* @__PURE__ */ createElementVNode("td", null, "\xA0", -1);
const _hoisted_13 = { key: 0 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_btn = resolveComponent("btn");
  return openBlock(), createElementBlock("section", {
    onClick: _cache[14] || (_cache[14] = withModifiers(() => {
    }, ["stop"]))
  }, [
    createElementVNode("table", null, [
      createElementVNode("tbody", null, [
        $props.controls ? (openBlock(), createElementBlock("tr", _hoisted_1, [
          createElementVNode("td", null, [
            createVNode(_component_btn, {
              type: "link",
              size: "sm",
              disabled: $props.readonly,
              onClick: _cache[0] || (_cache[0] = ($event) => $options.changeTime(1, 1))
            }, {
              default: withCtx(() => [
                createElementVNode("i", {
                  class: normalizeClass($props.iconControlUp)
                }, null, 2)
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          _hoisted_2,
          createElementVNode("td", null, [
            createVNode(_component_btn, {
              type: "link",
              size: "sm",
              disabled: $props.readonly,
              onClick: _cache[1] || (_cache[1] = ($event) => $options.changeTime(0, 1))
            }, {
              default: withCtx(() => [
                createElementVNode("i", {
                  class: normalizeClass($props.iconControlUp)
                }, null, 2)
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          $props.showMeridian ? (openBlock(), createElementBlock("td", _hoisted_3)) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        createElementVNode("tr", null, [
          createElementVNode("td", _hoisted_4, [
            withDirectives(createElementVNode("input", {
              ref: "hoursInput",
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.hoursText = $event),
              type: "tel",
              pattern: "\\d*",
              class: "form-control text-center",
              style: normalizeStyle($options.inputStyles),
              placeholder: "HH",
              readonly: $props.readonly,
              maxlength: "2",
              size: "2",
              onMouseup: _cache[3] || (_cache[3] = (...args) => $options.selectInputValue && $options.selectInputValue(...args)),
              onKeydown: [
                _cache[4] || (_cache[4] = withKeys(withModifiers(($event) => $options.changeTime(1, 1), ["prevent"]), ["up"])),
                _cache[5] || (_cache[5] = withKeys(withModifiers(($event) => $options.changeTime(1, 0), ["prevent"]), ["down"]))
              ],
              onWheel: _cache[6] || (_cache[6] = ($event) => $options.onWheel($event, true))
            }, null, 44, _hoisted_5), [
              [
                vModelText,
                $data.hoursText,
                void 0,
                { lazy: true }
              ]
            ])
          ]),
          _hoisted_6,
          createElementVNode("td", _hoisted_7, [
            withDirectives(createElementVNode("input", {
              ref: "minutesInput",
              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.minutesText = $event),
              type: "tel",
              pattern: "\\d*",
              class: "form-control text-center",
              style: normalizeStyle($options.inputStyles),
              placeholder: "MM",
              readonly: $props.readonly,
              maxlength: "2",
              size: "2",
              onMouseup: _cache[8] || (_cache[8] = (...args) => $options.selectInputValue && $options.selectInputValue(...args)),
              onKeydown: [
                _cache[9] || (_cache[9] = withKeys(withModifiers(($event) => $options.changeTime(0, 1), ["prevent"]), ["up"])),
                _cache[10] || (_cache[10] = withKeys(withModifiers(($event) => $options.changeTime(0, 0), ["prevent"]), ["down"]))
              ],
              onWheel: _cache[11] || (_cache[11] = ($event) => $options.onWheel($event, false))
            }, null, 44, _hoisted_8), [
              [
                vModelText,
                $data.minutesText,
                void 0,
                { lazy: true }
              ]
            ])
          ]),
          $props.showMeridian ? (openBlock(), createElementBlock("td", _hoisted_9, [
            _hoisted_10,
            createVNode(_component_btn, {
              "data-action": "toggleMeridian",
              disabled: $props.readonly,
              onClick: $options.toggleMeridian,
              textContent: toDisplayString($data.meridian ? _ctx.t("uiv.timePicker.am") : _ctx.t("uiv.timePicker.pm"))
            }, null, 8, ["disabled", "onClick", "textContent"])
          ])) : createCommentVNode("", true)
        ]),
        $props.controls ? (openBlock(), createElementBlock("tr", _hoisted_11, [
          createElementVNode("td", null, [
            createVNode(_component_btn, {
              type: "link",
              size: "sm",
              disabled: $props.readonly,
              onClick: _cache[12] || (_cache[12] = ($event) => $options.changeTime(1, 0))
            }, {
              default: withCtx(() => [
                createElementVNode("i", {
                  class: normalizeClass($props.iconControlDown)
                }, null, 2)
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          _hoisted_12,
          createElementVNode("td", null, [
            createVNode(_component_btn, {
              type: "link",
              size: "sm",
              disabled: $props.readonly,
              onClick: _cache[13] || (_cache[13] = ($event) => $options.changeTime(0, 0))
            }, {
              default: withCtx(() => [
                createElementVNode("i", {
                  class: normalizeClass($props.iconControlDown)
                }, null, 2)
              ]),
              _: 1
            }, 8, ["disabled"])
          ]),
          $props.showMeridian ? (openBlock(), createElementBlock("td", _hoisted_13)) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ])
    ])
  ]);
}
var TimePicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { TimePicker as default };
