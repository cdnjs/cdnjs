import { openBlock, createElementBlock, normalizeClass, renderSlot, resolveComponent, createBlock, withCtx, createElementVNode, withModifiers, createVNode, createCommentVNode, withDirectives, normalizeStyle, withKeys, vModelText, toDisplayString, createTextVNode } from 'vue';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
function assign(target, varArgs) {
  var arguments$1 = arguments;

  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object')
  }
  var to = Object(target);
  for (var index = 1; index < arguments.length; index++) {
    var nextSource = arguments$1[index];
    if (nextSource !== null && nextSource !== undefined) {
      for (var nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        /* istanbul ignore else */
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return to
}

function isExist(obj) {
  return typeof obj !== 'undefined' && obj !== null
}

var defaultLang = {
  uiv: {
    datePicker: {
      clear: 'Clear',
      today: 'Today',
      month: 'Month',
      month1: 'January',
      month2: 'February',
      month3: 'March',
      month4: 'April',
      month5: 'May',
      month6: 'June',
      month7: 'July',
      month8: 'August',
      month9: 'September',
      month10: 'October',
      month11: 'November',
      month12: 'December',
      year: 'Year',
      week1: 'Mon',
      week2: 'Tue',
      week3: 'Wed',
      week4: 'Thu',
      week5: 'Fri',
      week6: 'Sat',
      week7: 'Sun',
    },
    timePicker: {
      am: 'AM',
      pm: 'PM',
    },
    modal: {
      cancel: 'Cancel',
      ok: 'OK',
    },
    multiSelect: {
      placeholder: 'Select...',
      filterPlaceholder: 'Search...',
    },
  },
};

var lang = defaultLang;

var i18nHandler = function () {
  if ('$t' in this) {
    return this.$t.apply(this, arguments)
  }
  return null
};

var t = function (path, options) {
  options = options || {};
  var value;
  try {
    value = i18nHandler.apply(this, arguments);
    /* istanbul ignore next */
    if (isExist(value) && !options.$$locale) {
      return value
    }
  } catch (e) {
    // ignore
  }
  var array = path.split('.');
  var current = options.$$locale || lang;

  for (var i = 0, j = array.length; i < j; i++) {
    var property = array[i];
    value = current[property];
    if (i === j - 1) { return value }
    if (!value) { return '' }
    current = value;
  }
  /* istanbul ignore next */
  return ''
};

var Local = {
  methods: {
    t: function t$1() {
      var arguments$1 = arguments;

      var args = [];
      for (var i = 0; i < arguments.length; ++i) {
        args.push(arguments$1[i]);
      }
      args[1] = assign({}, { $$locale: this.locale }, args[1]);
      return t.apply(this, args)
    },
  },
  props: {
    locale: Object,
  },
};

var linkMixin = {
  props: {
    // <a> props
    href: String,
    target: String,
    // <router-link> props
    to: null,
    replace: {
      type: Boolean,
      default: false,
    },
    append: {
      type: Boolean,
      default: false,
    },
    exact: {
      type: Boolean,
      default: false,
    },
  },
};

var script$2 = {
  props: {
    size: { type: String, default: undefined },
    vertical: {
      type: Boolean,
      default: false,
    },
    justified: {
      type: Boolean,
      default: false,
    },
  },
};

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  var obj;

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(( obj = {
      'btn-group': !$props.vertical,
      'btn-group-vertical': $props.vertical,
      'btn-group-justified': $props.justified
    }, obj[("btn-group-" + ($props.size))] = $props.size, obj )),
    role: "group",
    "data-toggle": "buttons"
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2 /* CLASS */))
}

script$2.render = render$2;
script$2.__file = "src/components/button/BtnGroup.vue";

var INPUT_TYPE_CHECKBOX = 'checkbox';
var INPUT_TYPE_RADIO = 'radio';

var script$1 = {
  components: { BtnGroup: script$2 },
  mixins: [linkMixin],
  props: {
    justified: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'default',
    },
    nativeType: {
      type: String,
      default: 'button',
    },
    size: {
      type: String,
      default: undefined,
    },
    block: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // <input> props
    modelValue: {
      type: null,
      default: null,
    },
    inputValue: {
      type: null,
      default: null,
    },
    inputType: {
      type: String,
      validator: function validator(value) {
        return value === INPUT_TYPE_CHECKBOX || value === INPUT_TYPE_RADIO
      },
      default: undefined,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    isInputActive: function isInputActive() {
      return this.inputType === INPUT_TYPE_CHECKBOX
        ? this.modelValue.indexOf(this.inputValue) >= 0
        : this.modelValue === this.inputValue
    },
    classes: function classes() {
      var obj;

      return ( obj = {
        btn: true,
        active: this.inputType ? this.isInputActive : this.active,
        disabled: this.disabled,
        'btn-block': this.block
      }, obj[("btn-" + (this.type))] = Boolean(this.type), obj[("btn-" + (this.size))] = Boolean(this.size), obj )
    },
  },
  methods: {
    onClick: function onClick(e) {
      if (this.disabled && e instanceof Event) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    onInputChange: function onInputChange() {
      if (this.inputType === INPUT_TYPE_CHECKBOX) {
        var valueCopied = this.modelValue.slice();
        if (this.isInputActive) {
          valueCopied.splice(valueCopied.indexOf(this.inputValue), 1);
        } else {
          valueCopied.push(this.inputValue);
        }
        this.$emit('update:modelValue', valueCopied);
      } else {
        this.$emit('update:modelValue', this.inputValue);
      }
    },
  },
};

var _hoisted_1$1 = ["href", "target"];
var _hoisted_2$1 = ["type", "checked", "disabled"];
var _hoisted_3$1 = ["type", "disabled"];
var _hoisted_4$1 = ["type", "disabled"];

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = resolveComponent("router-link");
  var _component_BtnGroup = resolveComponent("BtnGroup");

  return (_ctx.href)
    ? (openBlock(), createElementBlock("a", {
        key: 0,
        href: _ctx.href,
        target: _ctx.target,
        role: "button",
        class: normalizeClass($options.classes),
        onClick: _cache[0] || (_cache[0] = function () {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          return ($options.onClick && $options.onClick.apply($options, args));
  })
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 10 /* CLASS, PROPS */, _hoisted_1$1))
    : (_ctx.to)
      ? (openBlock(), createBlock(_component_router_link, {
          key: 1,
          to: _ctx.to,
          class: normalizeClass($options.classes),
          event: $props.disabled ? '' : 'click',
          replace: _ctx.replace,
          append: _ctx.append,
          exact: _ctx.exact,
          role: "button",
          onClick: $options.onClick
        }, {
          default: withCtx(function () { return [
            renderSlot(_ctx.$slots, "default")
          ]; }),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["to", "class", "event", "replace", "append", "exact", "onClick"]))
      : ($props.inputType)
        ? (openBlock(), createElementBlock("label", {
            key: 2,
            class: normalizeClass($options.classes),
            onClick: _cache[3] || (_cache[3] = function () {
              var args = [], len = arguments.length;
              while ( len-- ) args[ len ] = arguments[ len ];

              return ($options.onClick && $options.onClick.apply($options, args));
  })
          }, [
            createElementVNode("input", {
              autocomplete: "off",
              type: $props.inputType,
              checked: $options.isInputActive,
              disabled: $props.disabled,
              onInput: _cache[1] || (_cache[1] = withModifiers(function () {}, ["stop"])),
              onChange: _cache[2] || (_cache[2] = function () {
                var args = [], len = arguments.length;
                while ( len-- ) args[ len ] = arguments[ len ];

                return ($options.onInputChange && $options.onInputChange.apply($options, args));
  })
            }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_2$1),
            renderSlot(_ctx.$slots, "default")
          ], 2 /* CLASS */))
        : ($props.justified)
          ? (openBlock(), createBlock(_component_BtnGroup, { key: 3 }, {
              default: withCtx(function () { return [
                createElementVNode("button", {
                  class: normalizeClass($options.classes),
                  type: $props.nativeType,
                  disabled: $props.disabled,
                  onClick: _cache[4] || (_cache[4] = function () {
                    var args = [], len = arguments.length;
                    while ( len-- ) args[ len ] = arguments[ len ];

                    return ($options.onClick && $options.onClick.apply($options, args));
                })
                }, [
                  renderSlot(_ctx.$slots, "default")
                ], 10 /* CLASS, PROPS */, _hoisted_3$1)
              ]; }),
              _: 3 /* FORWARDED */
            }))
          : (openBlock(), createElementBlock("button", {
              key: 4,
              class: normalizeClass($options.classes),
              type: $props.nativeType,
              disabled: $props.disabled,
              onClick: _cache[5] || (_cache[5] = function () {
                var args = [], len = arguments.length;
                while ( len-- ) args[ len ] = arguments[ len ];

                return ($options.onClick && $options.onClick.apply($options, args));
  })
            }, [
              renderSlot(_ctx.$slots, "default")
            ], 10 /* CLASS, PROPS */, _hoisted_4$1))
}

script$1.render = render$1;
script$1.__file = "src/components/button/Btn.vue";

function pad(value, num) {
  value = value + '';
  for (var i = num - value.length; i > 0; i--) {
    value = '0' + value;
  }
  return value
}

var maxHours = 23;
var zero = 0;
var maxMinutes = 59;
var cutUpAmAndPm = 12;

var script = {
  components: { Btn: script$1 },
  mixins: [Local],
  props: {
    modelValue: {
      type: Date,
      required: true,
    },
    showMeridian: {
      type: Boolean,
      default: true,
    },
    min: { type: null, default: undefined },
    max: { type: null, default: undefined },
    hourStep: {
      type: Number,
      default: 1,
    },
    minStep: {
      type: Number,
      default: 1,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    controls: {
      type: Boolean,
      default: true,
    },
    iconControlUp: {
      type: String,
      default: 'glyphicon glyphicon-chevron-up',
    },
    iconControlDown: {
      type: String,
      default: 'glyphicon glyphicon-chevron-down',
    },
    inputWidth: {
      type: Number,
      default: 50,
    },
  },
  emits: ['update:modelValue'],
  data: function data() {
    return {
      hours: 0,
      minutes: 0,
      meridian: true,
      hoursText: '',
      minutesText: '',
    }
  },
  computed: {
    inputStyles: function inputStyles() {
      return {
        width: ((this.inputWidth) + "px"),
      }
    },
  },
  watch: {
    modelValue: function modelValue(value) {
      this.updateByValue(value);
    },
    showMeridian: function showMeridian(value) {
      this.setTime();
    },
    hoursText: function hoursText(value) {
      if (this.hours === 0 && value === '') {
        // Prevent a runtime reset from being overwritten
        return
      }
      var hour = parseInt(value);
      if (this.showMeridian) {
        if (hour >= 1 && hour <= cutUpAmAndPm) {
          if (this.meridian) {
            this.hours = hour === cutUpAmAndPm ? 0 : hour;
          } else {
            this.hours =
              hour === cutUpAmAndPm ? cutUpAmAndPm : hour + cutUpAmAndPm;
          }
        }
      } else if (hour >= zero && hour <= maxHours) {
        this.hours = hour;
      }
      this.setTime();
    },
    minutesText: function minutesText(value) {
      if (this.minutes === 0 && value === '') {
        // Prevent a runtime reset from being overwritten
        return
      }
      var minutesStr = parseInt(value);
      if (minutesStr >= zero && minutesStr <= maxMinutes) {
        this.minutes = minutesStr;
      }
      this.setTime();
    },
  },
  mounted: function mounted() {
    this.updateByValue(this.modelValue);
  },
  methods: {
    updateByValue: function updateByValue(value) {
      if (isNaN(value.getTime())) {
        this.hours = 0;
        this.minutes = 0;
        this.hoursText = '';
        this.minutesText = '';
        this.meridian = true;
        return
      }
      this.hours = value.getHours();
      this.minutes = value.getMinutes();
      if (!this.showMeridian) {
        this.hoursText = pad(this.hours, 2);
      } else {
        if (this.hours >= cutUpAmAndPm) {
          if (this.hours === cutUpAmAndPm) {
            this.hoursText = this.hours + '';
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
      // lazy model won't update when using keyboard up/down
      this.$refs.hoursInput.value = this.hoursText;
      this.$refs.minutesInput.value = this.minutesText;
    },
    addHour: function addHour(step) {
      step = step || this.hourStep;
      this.hours = this.hours >= maxHours ? zero : this.hours + step;
    },
    reduceHour: function reduceHour(step) {
      step = step || this.hourStep;
      this.hours = this.hours <= zero ? maxHours : this.hours - step;
    },
    addMinute: function addMinute() {
      if (this.minutes >= maxMinutes) {
        this.minutes = zero;
        this.addHour(1);
      } else {
        this.minutes += this.minStep;
      }
    },
    reduceMinute: function reduceMinute() {
      if (this.minutes <= zero) {
        this.minutes = maxMinutes + 1 - this.minStep;
        this.reduceHour(1);
      } else {
        this.minutes -= this.minStep;
      }
    },
    changeTime: function changeTime(isHour, isPlus) {
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
    toggleMeridian: function toggleMeridian() {
      this.meridian = !this.meridian;
      if (this.meridian) {
        this.hours -= cutUpAmAndPm;
      } else {
        this.hours += cutUpAmAndPm;
      }
      this.setTime();
    },
    onWheel: function onWheel(e, isHour) {
      if (!this.readonly) {
        e.preventDefault();
        this.changeTime(isHour, e.deltaY < 0);
      }
    },
    setTime: function setTime() {
      var time = this.modelValue;
      if (isNaN(time.getTime())) {
        time = new Date();
        time.setHours(0);
        time.setMinutes(0);
      }
      time.setHours(this.hours);
      time.setMinutes(this.minutes);
      if (this.max instanceof Date) {
        var max = new Date(time);
        max.setHours(this.max.getHours());
        max.setMinutes(this.max.getMinutes());
        time = time > max ? max : time;
      }
      if (this.min instanceof Date) {
        var min = new Date(time);
        min.setHours(this.min.getHours());
        min.setMinutes(this.min.getMinutes());
        time = time < min ? min : time;
      }
      this.$emit('update:modelValue', new Date(time));
    },
    selectInputValue: function selectInputValue(e) {
      // mouseup should be prevented!
      // See various comments in https://stackoverflow.com/questions/3272089/programmatically-selecting-text-in-an-input-field-on-ios-devices-mobile-safari
      e.target.setSelectionRange(0, 2);
    },
  },
};

var _hoisted_1 = {
  key: 0,
  class: "text-center"
};
var _hoisted_2 = /*#__PURE__*/createElementVNode("td", null, " ", -1 /* HOISTED */);
var _hoisted_3 = { key: 0 };
var _hoisted_4 = { class: "form-group" };
var _hoisted_5 = ["readonly"];
var _hoisted_6 = /*#__PURE__*/createElementVNode("td", null, [
  /*#__PURE__*/createTextVNode(" "),
  /*#__PURE__*/createElementVNode("b", null, ":"),
  /*#__PURE__*/createTextVNode(" ")
], -1 /* HOISTED */);
var _hoisted_7 = { class: "form-group" };
var _hoisted_8 = ["readonly"];
var _hoisted_9 = { key: 0 };
var _hoisted_10 = /*#__PURE__*/createTextVNode("   ");
var _hoisted_11 = {
  key: 1,
  class: "text-center"
};
var _hoisted_12 = /*#__PURE__*/createElementVNode("td", null, " ", -1 /* HOISTED */);
var _hoisted_13 = { key: 0 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_btn = resolveComponent("btn");

  return (openBlock(), createElementBlock("section", {
    onClick: _cache[14] || (_cache[14] = withModifiers(function () {}, ["stop"]))
  }, [
    createElementVNode("table", null, [
      createElementVNode("tbody", null, [
        ($props.controls)
          ? (openBlock(), createElementBlock("tr", _hoisted_1, [
              createElementVNode("td", null, [
                createVNode(_component_btn, {
                  type: "link",
                  size: "sm",
                  disabled: $props.readonly,
                  onClick: _cache[0] || (_cache[0] = function ($event) { return ($options.changeTime(1, 1)); })
                }, {
                  default: withCtx(function () { return [
                    createElementVNode("i", {
                      class: normalizeClass($props.iconControlUp)
                    }, null, 2 /* CLASS */)
                  ]; }),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["disabled"])
              ]),
              _hoisted_2,
              createElementVNode("td", null, [
                createVNode(_component_btn, {
                  type: "link",
                  size: "sm",
                  disabled: $props.readonly,
                  onClick: _cache[1] || (_cache[1] = function ($event) { return ($options.changeTime(0, 1)); })
                }, {
                  default: withCtx(function () { return [
                    createElementVNode("i", {
                      class: normalizeClass($props.iconControlUp)
                    }, null, 2 /* CLASS */)
                  ]; }),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["disabled"])
              ]),
              ($props.showMeridian)
                ? (openBlock(), createElementBlock("td", _hoisted_3))
                : createCommentVNode("v-if", true)
            ]))
          : createCommentVNode("v-if", true),
        createElementVNode("tr", null, [
          createElementVNode("td", _hoisted_4, [
            withDirectives(createElementVNode("input", {
              ref: "hoursInput",
              "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) { return (($data.hoursText) = $event); }),
              type: "tel",
              pattern: "\\d*",
              class: "form-control text-center",
              style: normalizeStyle($options.inputStyles),
              placeholder: "HH",
              readonly: $props.readonly,
              maxlength: "2",
              size: "2",
              onMouseup: _cache[3] || (_cache[3] = function () {
                var args = [], len = arguments.length;
                while ( len-- ) args[ len ] = arguments[ len ];

                return ($options.selectInputValue && $options.selectInputValue.apply($options, args));
  }),
              onKeydown: [
                _cache[4] || (_cache[4] = withKeys(withModifiers(function ($event) { return ($options.changeTime(1, 1)); }, ["prevent"]), ["up"])),
                _cache[5] || (_cache[5] = withKeys(withModifiers(function ($event) { return ($options.changeTime(1, 0)); }, ["prevent"]), ["down"]))
              ],
              onWheel: _cache[6] || (_cache[6] = function ($event) { return ($options.onWheel($event, true)); })
            }, null, 44 /* STYLE, PROPS, HYDRATE_EVENTS */, _hoisted_5), [
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
              "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) { return (($data.minutesText) = $event); }),
              type: "tel",
              pattern: "\\d*",
              class: "form-control text-center",
              style: normalizeStyle($options.inputStyles),
              placeholder: "MM",
              readonly: $props.readonly,
              maxlength: "2",
              size: "2",
              onMouseup: _cache[8] || (_cache[8] = function () {
                var args = [], len = arguments.length;
                while ( len-- ) args[ len ] = arguments[ len ];

                return ($options.selectInputValue && $options.selectInputValue.apply($options, args));
  }),
              onKeydown: [
                _cache[9] || (_cache[9] = withKeys(withModifiers(function ($event) { return ($options.changeTime(0, 1)); }, ["prevent"]), ["up"])),
                _cache[10] || (_cache[10] = withKeys(withModifiers(function ($event) { return ($options.changeTime(0, 0)); }, ["prevent"]), ["down"]))
              ],
              onWheel: _cache[11] || (_cache[11] = function ($event) { return ($options.onWheel($event, false)); })
            }, null, 44 /* STYLE, PROPS, HYDRATE_EVENTS */, _hoisted_8), [
              [
                vModelText,
                $data.minutesText,
                void 0,
                { lazy: true }
              ]
            ])
          ]),
          ($props.showMeridian)
            ? (openBlock(), createElementBlock("td", _hoisted_9, [
                _hoisted_10,
                createVNode(_component_btn, {
                  "data-action": "toggleMeridian",
                  disabled: $props.readonly,
                  onClick: $options.toggleMeridian,
                  textContent: toDisplayString(
                $data.meridian ? _ctx.t('uiv.timePicker.am') : _ctx.t('uiv.timePicker.pm')
              )
                }, null, 8 /* PROPS */, ["disabled", "onClick", "textContent"])
              ]))
            : createCommentVNode("v-if", true)
        ]),
        ($props.controls)
          ? (openBlock(), createElementBlock("tr", _hoisted_11, [
              createElementVNode("td", null, [
                createVNode(_component_btn, {
                  type: "link",
                  size: "sm",
                  disabled: $props.readonly,
                  onClick: _cache[12] || (_cache[12] = function ($event) { return ($options.changeTime(1, 0)); })
                }, {
                  default: withCtx(function () { return [
                    createElementVNode("i", {
                      class: normalizeClass($props.iconControlDown)
                    }, null, 2 /* CLASS */)
                  ]; }),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["disabled"])
              ]),
              _hoisted_12,
              createElementVNode("td", null, [
                createVNode(_component_btn, {
                  type: "link",
                  size: "sm",
                  disabled: $props.readonly,
                  onClick: _cache[13] || (_cache[13] = function ($event) { return ($options.changeTime(0, 0)); })
                }, {
                  default: withCtx(function () { return [
                    createElementVNode("i", {
                      class: normalizeClass($props.iconControlDown)
                    }, null, 2 /* CLASS */)
                  ]; }),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["disabled"])
              ]),
              ($props.showMeridian)
                ? (openBlock(), createElementBlock("td", _hoisted_13))
                : createCommentVNode("v-if", true)
            ]))
          : createCommentVNode("v-if", true)
      ])
    ])
  ]))
}

script.render = render;
script.__file = "src/components/timepicker/TimePicker.vue";

export { script as default };
//# sourceMappingURL=TimePicker.js.map
