'use strict';

var vue = require('vue');
var CompatFallthroughMixin = require('./CompatFallthroughMixin-hhK0Gkhr.js');
var FormElementMixin = require('./FormElementMixin-DavX4iOv.js');
var helpers = require('./helpers.js');
var config = require('./config-DR826Ki2.js');

const AM = "AM";
const PM = "PM";
const HOUR_FORMAT_24 = "24";
const HOUR_FORMAT_12 = "12";
const defaultTimeFormatter = (date, vm) => {
  return vm.dtf.format(date);
};
const defaultTimeParser = (timeString, vm) => {
  if (timeString) {
    let d = null;
    if (vm.computedValue && !isNaN(vm.computedValue.valueOf())) {
      d = new Date(vm.computedValue);
    } else {
      d = vm.timeCreator();
      d.setMilliseconds(0);
    }
    if (vm.dtf.formatToParts && typeof vm.dtf.formatToParts === "function") {
      const formatRegex = vm.dtf.formatToParts(d).map((part) => {
        if (part.type === "literal") {
          return part.value.replace(/ /g, "\\s?");
        } else if (part.type === "dayPeriod") {
          return `((?!=<${part.type}>)(${vm.amString}|${vm.pmString}|${AM}|${PM}|${AM.toLowerCase()}|${PM.toLowerCase()})?)`;
        }
        return `((?!=<${part.type}>)\\d+)`;
      }).join("");
      const timeGroups = helpers.matchWithGroups(formatRegex, timeString);
      timeGroups.hour = timeGroups.hour ? parseInt(timeGroups.hour + "", 10) : null;
      timeGroups.minute = timeGroups.minute ? parseInt(timeGroups.minute + "", 10) : null;
      timeGroups.second = timeGroups.second ? parseInt(timeGroups.second + "", 10) : null;
      if (timeGroups.hour && timeGroups.hour >= 0 && timeGroups.hour < 24 && timeGroups.minute && timeGroups.minute >= 0 && timeGroups.minute < 59) {
        const dayPeriod = timeGroups.dayPeriod;
        if (dayPeriod && (dayPeriod.toLowerCase() === vm.pmString.toLowerCase() || dayPeriod.toLowerCase() === PM.toLowerCase()) && timeGroups.hour < 12) {
          timeGroups.hour += 12;
        }
        d.setHours(timeGroups.hour);
        d.setMinutes(timeGroups.minute);
        d.setSeconds(timeGroups.second || 0);
        return d;
      }
    }
    let am = false;
    if (vm.hourFormat === HOUR_FORMAT_12) {
      const dateString12 = timeString.split(" ");
      timeString = dateString12[0];
      am = dateString12[1] === vm.amString || dateString12[1] === AM;
    }
    const time = timeString.split(":");
    let hours = parseInt(time[0], 10);
    const minutes = parseInt(time[1], 10);
    const seconds = vm.enableSeconds ? parseInt(time[2], 10) : 0;
    if (isNaN(hours) || hours < 0 || hours > 23 || vm.hourFormat === HOUR_FORMAT_12 && (hours < 1 || hours > 12) || isNaN(minutes) || minutes < 0 || minutes > 59) {
      return null;
    }
    d.setSeconds(seconds);
    d.setMinutes(minutes);
    if (vm.hourFormat === HOUR_FORMAT_12) {
      if (am && hours === 12) {
        hours = 0;
      } else if (!am && hours !== 12) {
        hours += 12;
      }
    }
    d.setHours(hours);
    return new Date(d.getTime());
  }
  return null;
};
var TimepickerMixin = vue.defineComponent({
  mixins: [CompatFallthroughMixin.CompatFallthroughMixin, FormElementMixin.FormElementMixin],
  props: {
    modelValue: [Date, null],
    inline: Boolean,
    minTime: [Date, null],
    maxTime: [Date, null],
    placeholder: String,
    editable: Boolean,
    disabled: Boolean,
    hourFormat: {
      type: String,
      validator: (value) => {
        return value === HOUR_FORMAT_24 || value === HOUR_FORMAT_12;
      }
    },
    incrementHours: {
      type: Number,
      default: 1
    },
    incrementMinutes: {
      type: Number,
      default: 1
    },
    incrementSeconds: {
      type: Number,
      default: 1
    },
    timeFormatter: {
      type: Function,
      default: (date, vm) => {
        if (typeof config.config.defaultTimeFormatter === "function") {
          return config.config.defaultTimeFormatter(date);
        } else {
          return defaultTimeFormatter(date, vm);
        }
      }
    },
    timeParser: {
      type: Function,
      default: (date, vm) => {
        if (typeof config.config.defaultTimeParser === "function") {
          return config.config.defaultTimeParser(date);
        } else {
          return defaultTimeParser(date, vm);
        }
      }
    },
    mobileNative: {
      type: Boolean,
      default: () => config.config.defaultTimepickerMobileNative
    },
    mobileModal: {
      type: Boolean,
      default: () => config.config.defaultTimepickerMobileModal
    },
    timeCreator: {
      type: Function,
      default: () => {
        if (typeof config.config.defaultTimeCreator === "function") {
          return config.config.defaultTimeCreator();
        } else {
          return /* @__PURE__ */ new Date();
        }
      }
    },
    position: String,
    unselectableTimes: Array,
    openOnFocus: Boolean,
    enableSeconds: Boolean,
    defaultMinutes: Number,
    defaultSeconds: Number,
    focusable: {
      type: Boolean,
      default: true
    },
    tzOffset: {
      type: Number,
      default: 0
    },
    appendToBody: Boolean,
    resetOnMeridianChange: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    "update:modelValue": (_value) => true
  },
  data() {
    return {
      dateSelected: this.modelValue,
      hoursSelected: null,
      minutesSelected: null,
      secondsSelected: null,
      meridienSelected: null,
      _elementRef: "input",
      AM,
      PM,
      HOUR_FORMAT_24,
      HOUR_FORMAT_12
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.dateSelected;
      },
      set(value) {
        this.dateSelected = value;
        this.$emit("update:modelValue", this.dateSelected);
      }
    },
    localeOptions() {
      return new Intl.DateTimeFormat(this.locale, {
        hour: "numeric",
        minute: "numeric",
        second: this.enableSeconds ? "numeric" : void 0
      }).resolvedOptions();
    },
    dtf() {
      return new Intl.DateTimeFormat(this.locale, {
        hour: this.localeOptions.hour || "numeric",
        minute: this.localeOptions.minute || "numeric",
        second: this.enableSeconds ? this.localeOptions.second || "numeric" : void 0,
        // Fixes 12 hour display github.com/buefy/buefy/issues/3418
        hourCycle: !this.isHourFormat24 ? "h12" : "h23"
      });
    },
    newHourFormat() {
      return this.hourFormat || (this.localeOptions.hour12 ? HOUR_FORMAT_12 : HOUR_FORMAT_24);
    },
    sampleTime() {
      const d = this.timeCreator();
      d.setHours(10);
      d.setSeconds(0);
      d.setMinutes(0);
      d.setMilliseconds(0);
      return d;
    },
    hourLiteral() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === "function") {
        const d = this.sampleTime;
        const parts = this.dtf.formatToParts(d);
        const literal = parts.find((part, idx) => idx > 0 && parts[idx - 1].type === "hour");
        if (literal) {
          return literal.value;
        }
      }
      return ":";
    },
    minuteLiteral() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === "function") {
        const d = this.sampleTime;
        const parts = this.dtf.formatToParts(d);
        const literal = parts.find((part, idx) => idx > 0 && parts[idx - 1].type === "minute");
        if (literal) {
          return literal.value;
        }
      }
      return ":";
    },
    secondLiteral() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === "function") {
        const d = this.sampleTime;
        const parts = this.dtf.formatToParts(d);
        const literal = parts.find((part, idx) => idx > 0 && parts[idx - 1].type === "second");
        if (literal) {
          return literal.value;
        }
      }
      return void 0;
    },
    amString() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === "function") {
        const d = this.sampleTime;
        d.setHours(10);
        const dayPeriod = this.dtf.formatToParts(d).find((part) => part.type === "dayPeriod");
        if (dayPeriod) {
          return dayPeriod.value;
        }
      }
      return AM;
    },
    pmString() {
      if (this.dtf.formatToParts && typeof this.dtf.formatToParts === "function") {
        const d = this.sampleTime;
        d.setHours(20);
        const dayPeriod = this.dtf.formatToParts(d).find((part) => part.type === "dayPeriod");
        if (dayPeriod) {
          return dayPeriod.value;
        }
      }
      return PM;
    },
    hours() {
      if (!this.incrementHours || this.incrementHours < 1) throw new Error("Hour increment cannot be null or less than 1.");
      const hours = [];
      const numberOfHours = this.isHourFormat24 ? 24 : 12;
      for (let i = 0; i < numberOfHours; i += this.incrementHours) {
        let value = i;
        let label = value;
        if (!this.isHourFormat24) {
          value = i + 1;
          label = value;
          if (this.meridienSelected === this.amString) {
            if (value === 12) {
              value = 0;
            }
          } else if (this.meridienSelected === this.pmString) {
            if (value !== 12) {
              value += 12;
            }
          }
        }
        hours.push({
          label: this.formatNumber(label),
          value
        });
      }
      return hours;
    },
    minutes() {
      if (!this.incrementMinutes || this.incrementMinutes < 1) throw new Error("Minute increment cannot be null or less than 1.");
      const minutes = [];
      for (let i = 0; i < 60; i += this.incrementMinutes) {
        minutes.push({
          label: this.formatNumber(i, true),
          value: i
        });
      }
      return minutes;
    },
    seconds() {
      if (!this.incrementSeconds || this.incrementSeconds < 1) throw new Error("Second increment cannot be null or less than 1.");
      const seconds = [];
      for (let i = 0; i < 60; i += this.incrementSeconds) {
        seconds.push({
          label: this.formatNumber(i, true),
          value: i
        });
      }
      return seconds;
    },
    meridiens() {
      return [this.amString, this.pmString];
    },
    isMobile() {
      return this.mobileNative && helpers.isMobile.any();
    },
    isHourFormat24() {
      return this.newHourFormat === HOUR_FORMAT_24;
    },
    disabledOrUndefined() {
      return this.disabled || void 0;
    }
  },
  watch: {
    hourFormat() {
      if (this.hoursSelected !== null) {
        this.meridienSelected = this.hoursSelected >= 12 ? this.pmString : this.amString;
      }
    },
    locale() {
      if (!this.modelValue) {
        this.meridienSelected = this.amString;
      }
    },
    /*
     * When v-model is changed:
     *   1. Update internal value.
     *   2. If it's invalid, validate again.
     */
    modelValue: {
      handler(value) {
        this.updateInternalState(value);
        !this.isValid && this.$refs.input.checkHtml5Validity();
      },
      immediate: true
    }
  },
  methods: {
    onMeridienChange(value) {
      if (this.hoursSelected !== null && this.resetOnMeridianChange) {
        this.hoursSelected = null;
        this.minutesSelected = null;
        this.secondsSelected = null;
        this.computedValue = null;
      } else if (this.hoursSelected !== null) {
        if (value === this.pmString) {
          this.hoursSelected += 12;
        } else if (value === this.amString) {
          this.hoursSelected -= 12;
        }
      }
      this.updateDateSelected(
        this.hoursSelected,
        this.minutesSelected,
        this.enableSeconds ? this.secondsSelected : 0,
        value
      );
    },
    onHoursChange(value) {
      if (!this.minutesSelected && typeof this.defaultMinutes !== "undefined") {
        this.minutesSelected = this.defaultMinutes;
      }
      if (!this.secondsSelected && typeof this.defaultSeconds !== "undefined") {
        this.secondsSelected = this.defaultSeconds;
      }
      this.updateDateSelected(
        parseInt(`${value}`, 10),
        this.minutesSelected,
        this.enableSeconds ? this.secondsSelected : 0,
        this.meridienSelected
      );
    },
    onMinutesChange(value) {
      if (!this.secondsSelected && this.defaultSeconds) {
        this.secondsSelected = this.defaultSeconds;
      }
      this.updateDateSelected(
        this.hoursSelected,
        parseInt(`${value}`, 10),
        this.enableSeconds ? this.secondsSelected : 0,
        this.meridienSelected
      );
    },
    onSecondsChange(value) {
      this.updateDateSelected(
        this.hoursSelected,
        this.minutesSelected,
        parseInt(`${value}`, 10),
        this.meridienSelected
      );
    },
    updateDateSelected(hours, minutes, seconds, meridiens) {
      if (hours != null && minutes != null && (!this.isHourFormat24 && meridiens !== null || this.isHourFormat24)) {
        let time = null;
        if (this.computedValue && !isNaN(this.computedValue.valueOf())) {
          time = new Date(this.computedValue);
        } else {
          time = this.timeCreator();
          time.setMilliseconds(0);
        }
        time.setHours(hours);
        time.setMinutes(minutes);
        time.setSeconds(seconds);
        if (!isNaN(time.getTime())) this.computedValue = new Date(time.getTime());
      }
    },
    updateInternalState(value) {
      if (value) {
        this.hoursSelected = value.getHours();
        this.minutesSelected = value.getMinutes();
        this.secondsSelected = value.getSeconds();
        this.meridienSelected = value.getHours() >= 12 ? this.pmString : this.amString;
      } else {
        this.hoursSelected = null;
        this.minutesSelected = null;
        this.secondsSelected = null;
        this.meridienSelected = this.amString;
      }
      this.dateSelected = value;
    },
    isHourDisabled(hour) {
      let disabled = false;
      if (this.minTime) {
        const minHours = this.minTime.getHours();
        const noMinutesAvailable = this.minutes.every((minute) => {
          return this.isMinuteDisabledForHour(hour, minute.value);
        });
        disabled = hour < minHours || noMinutesAvailable;
      }
      if (this.maxTime) {
        if (!disabled) {
          const maxHours = this.maxTime.getHours();
          disabled = hour > maxHours;
        }
      }
      if (this.unselectableTimes) {
        if (!disabled) {
          const unselectable = this.unselectableTimes.filter((time) => {
            if (this.enableSeconds && this.secondsSelected !== null) {
              return time.getHours() === hour && time.getMinutes() === this.minutesSelected && time.getSeconds() === this.secondsSelected;
            } else if (this.minutesSelected !== null) {
              return time.getHours() === hour && time.getMinutes() === this.minutesSelected;
            }
            return false;
          });
          if (unselectable.length > 0) {
            disabled = true;
          } else {
            disabled = this.minutes.every((minute) => {
              return this.unselectableTimes.filter((time) => {
                return time.getHours() === hour && time.getMinutes() === minute.value;
              }).length > 0;
            });
          }
        }
      }
      return disabled;
    },
    isMinuteDisabledForHour(hour, minute) {
      let disabled = false;
      if (this.minTime) {
        const minHours = this.minTime.getHours();
        const minMinutes = this.minTime.getMinutes();
        disabled = hour === minHours && minute < minMinutes;
      }
      if (this.maxTime) {
        if (!disabled) {
          const maxHours = this.maxTime.getHours();
          const maxMinutes = this.maxTime.getMinutes();
          disabled = hour === maxHours && minute > maxMinutes;
        }
      }
      return disabled;
    },
    isMinuteDisabled(minute) {
      let disabled = false;
      if (this.hoursSelected !== null) {
        if (this.isHourDisabled(this.hoursSelected)) {
          disabled = true;
        } else {
          disabled = this.isMinuteDisabledForHour(this.hoursSelected, minute);
        }
        if (this.unselectableTimes) {
          if (!disabled) {
            const unselectable = this.unselectableTimes.filter((time) => {
              if (this.enableSeconds && this.secondsSelected !== null) {
                return time.getHours() === this.hoursSelected && time.getMinutes() === minute && time.getSeconds() === this.secondsSelected;
              } else {
                return time.getHours() === this.hoursSelected && time.getMinutes() === minute;
              }
            });
            disabled = unselectable.length > 0;
          }
        }
      }
      return disabled;
    },
    isSecondDisabled(second) {
      let disabled = false;
      if (this.minutesSelected !== null) {
        if (this.isMinuteDisabled(this.minutesSelected)) {
          disabled = true;
        } else {
          if (this.minTime) {
            const minHours = this.minTime.getHours();
            const minMinutes = this.minTime.getMinutes();
            const minSeconds = this.minTime.getSeconds();
            disabled = this.hoursSelected === minHours && this.minutesSelected === minMinutes && second < minSeconds;
          }
          if (this.maxTime) {
            if (!disabled) {
              const maxHours = this.maxTime.getHours();
              const maxMinutes = this.maxTime.getMinutes();
              const maxSeconds = this.maxTime.getSeconds();
              disabled = this.hoursSelected === maxHours && this.minutesSelected === maxMinutes && second > maxSeconds;
            }
          }
        }
        if (this.unselectableTimes) {
          if (!disabled) {
            const unselectable = this.unselectableTimes.filter((time) => {
              return time.getHours() === this.hoursSelected && time.getMinutes() === this.minutesSelected && time.getSeconds() === second;
            });
            disabled = unselectable.length > 0;
          }
        }
      }
      return disabled;
    },
    /*
     * Parse string into date
     */
    onChange(value) {
      const date = this.timeParser(value, this);
      this.updateInternalState(date);
      if (date && !isNaN(date.valueOf())) {
        this.computedValue = date;
      } else {
        this.computedValue = null;
        this.$refs.input.newValue = this.computedValue;
      }
    },
    /*
     * Toggle timepicker
     */
    toggle(active) {
      if (this.$refs.dropdown) {
        this.$refs.dropdown.isActive = typeof active === "boolean" ? active : !this.$refs.dropdown.isActive;
      }
    },
    /*
     * Close timepicker
     */
    close() {
      this.toggle(false);
    },
    /*
     * Call default onFocus method and show timepicker
     */
    handleOnFocus() {
      this.onFocus();
      if (this.openOnFocus) {
        this.toggle(true);
      }
    },
    /*
     * Format date into string 'HH-MM-SS'
     */
    formatHHMMSS(value) {
      const date = new Date(value);
      if (value && !isNaN(date.valueOf())) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return this.formatNumber(hours, true) + ":" + this.formatNumber(minutes, true) + ":" + this.formatNumber(seconds, true);
      }
      return "";
    },
    /*
     * Parse time from string
     */
    onChangeNativePicker(event) {
      const date = event.target.value;
      if (date) {
        let time = null;
        if (this.computedValue && !isNaN(this.computedValue.valueOf())) {
          time = new Date(this.computedValue);
        } else {
          time = /* @__PURE__ */ new Date();
          time.setMilliseconds(0);
        }
        const t = date.split(":");
        time.setHours(parseInt(t[0], 10));
        time.setMinutes(parseInt(t[1], 10));
        time.setSeconds(t[2] ? parseInt(t[2], 10) : 0);
        this.computedValue = new Date(time.getTime());
      } else {
        this.computedValue = null;
      }
    },
    formatNumber(value, prependZero) {
      return this.isHourFormat24 || prependZero ? this.pad(value) : `${value}`;
    },
    pad(value) {
      return (value < 10 ? "0" : "") + value;
    },
    /*
     * Format date into string
     */
    formatValue(date) {
      if (date && !isNaN(date.valueOf())) {
        return this.timeFormatter(date, this);
      } else {
        return null;
      }
    },
    /*
     * Keypress event that is bound to the document.
     */
    keyPress({ key }) {
      if (this.$refs.dropdown && this.$refs.dropdown.isActive && (key === "Escape" || key === "Esc")) {
        this.toggle(false);
      }
    },
    /*
     * Emit 'blur' event on dropdown is not active (closed)
     */
    onActiveChange(value) {
      if (!value) {
        this.onBlur();
      }
    }
  },
  created() {
    if (typeof window !== "undefined") {
      document.addEventListener("keyup", this.keyPress);
    }
  },
  beforeUnmounted() {
    if (typeof window !== "undefined") {
      document.removeEventListener("keyup", this.keyPress);
    }
  }
});

exports.TimepickerMixin = TimepickerMixin;
