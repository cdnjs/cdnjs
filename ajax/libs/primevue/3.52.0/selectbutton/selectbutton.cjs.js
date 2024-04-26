'use strict';

var Ripple = require('primevue/ripple');
var utils = require('primevue/utils');
var BaseComponent = require('primevue/basecomponent');
var SelectButtonStyle = require('primevue/selectbutton/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
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
  emits: ['update:modelValue', 'focus', 'blur', 'change'],
  data: function data() {
    return {
      focusedIndex: 0
    };
  },
  mounted: function mounted() {
    this.defaultTabIndexes();
  },
  methods: {
    defaultTabIndexes: function defaultTabIndexes() {
      var opts = utils.DomHandler.find(this.$refs.container, '[data-pc-section="button"]');
      var firstHighlight = utils.DomHandler.findSingle(this.$refs.container, '[data-p-highlight="true"]');
      for (var i = 0; i < opts.length; i++) {
        if (utils.DomHandler.getAttribute(opts[i], 'data-p-highlight') === true && utils.ObjectUtils.equals(opts[i], firstHighlight) || firstHighlight === null && i == 0) {
          this.focusedIndex = i;
        }
      }
    },
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
    },
    onKeydown: function onKeydown(event, option, index) {
      switch (event.code) {
        case 'Space':
          {
            this.onOptionSelect(event, option, index);
            event.preventDefault();
            break;
          }
        case 'ArrowDown':
        case 'ArrowRight':
          {
            this.onArrowRightKey(event.target);
            event.preventDefault();
            break;
          }
        case 'ArrowUp':
        case 'ArrowLeft':
          {
            this.onArrowLeftKey(event.target);
            event.preventDefault();
            break;
          }
      }
    },
    onArrowRightKey: function onArrowRightKey(target) {
      var nextEl = this.findNextElement(target);
      if (nextEl) {
        this.focusedIndex = utils.ObjectUtils.findIndexInList(nextEl, this.findAllElements());
        utils.DomHandler.focus(nextEl);
      }
    },
    onArrowLeftKey: function onArrowLeftKey(target) {
      var prevEl = this.findPrevElement(target);
      if (prevEl) {
        this.focusedIndex = utils.ObjectUtils.findIndexInList(prevEl, this.findAllElements());
        utils.DomHandler.focus(prevEl);
      }
    },
    findAllElements: function findAllElements() {
      return utils.DomHandler.find(this.$refs.container, '[data-pc-section="button"]');
    },
    findNextElement: function findNextElement(target) {
      if (target.nextElementSibling) {
        if (utils.DomHandler.getAttribute(target.nextElementSibling, 'data-p-disabled')) {
          return this.findNextElement(target.nextElementSibling);
        }
        return target.nextElementSibling;
      }
      return null;
    },
    findPrevElement: function findPrevElement(target) {
      if (target.previousElementSibling) {
        if (utils.DomHandler.getAttribute(target.previousElementSibling, 'data-p-disabled')) {
          return this.findPrevElement(target.previousElementSibling);
        }
        return target.previousElementSibling;
      }
      return null;
    },
    onFocus: function onFocus(event) {
      this.$emit('focus', event);
    },
    onBlur: function onBlur(event, option) {
      if (event.target && event.relatedTarget && event.target.parentElement !== event.relatedTarget.parentElement) {
        this.defaultTabIndexes();
      }
      this.$emit('blur', event, option);
    },
    findTabindex: function findTabindex(option, index) {
      return this.disabled || this.isOptionDisabled(option) || index !== this.focusedIndex ? '-1' : '0';
    }
  },
  computed: {
    equalityKey: function equalityKey() {
      return this.optionValue ? null : this.dataKey;
    }
  },
  directives: {
    ripple: Ripple__default["default"]
  }
};

var _hoisted_1 = ["aria-labelledby"];
var _hoisted_2 = ["tabindex", "aria-label", "role", "aria-checked", "aria-disabled", "onClick", "onKeydown", "onBlur", "data-p-highlight", "data-p-disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = vue.resolveDirective("ripple");
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    ref: "container",
    "class": _ctx.cx('root'),
    role: "group",
    "aria-labelledby": _ctx.ariaLabelledby
  }, _ctx.ptmi('root')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.options, function (option, i) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
      key: $options.getOptionRenderKey(option),
      tabindex: $options.findTabindex(option, i),
      "aria-label": $options.getOptionLabel(option),
      role: _ctx.multiple ? 'checkbox' : 'radio',
      "aria-checked": $options.isSelected(option),
      "aria-disabled": $options.isOptionDisabled(option),
      "class": _ctx.cx('button', {
        option: option
      }),
      onClick: function onClick($event) {
        return $options.onOptionSelect($event, option, i);
      },
      onKeydown: function onKeydown($event) {
        return $options.onKeydown($event, option, i);
      },
      onFocus: _cache[0] || (_cache[0] = function ($event) {
        return $options.onFocus($event);
      }),
      onBlur: function onBlur($event) {
        return $options.onBlur($event, option);
      }
    }, $options.getPTOptions(option, 'button'), {
      "data-p-highlight": $options.isSelected(option),
      "data-p-disabled": $options.isOptionDisabled(option)
    }), [vue.renderSlot(_ctx.$slots, "option", {
      option: option,
      index: i,
      "class": vue.normalizeClass(_ctx.cx('label'))
    }, function () {
      return [vue.createElementVNode("span", vue.mergeProps({
        "class": _ctx.cx('label')
      }, $options.getPTOptions(option, 'label')), vue.toDisplayString($options.getOptionLabel(option)), 17)];
    })], 16, _hoisted_2)), [[_directive_ripple]]);
  }), 128))], 16, _hoisted_1);
}

script.render = render;

module.exports = script;
