import Ripple from 'primevue/ripple';
import { DomHandler, ObjectUtils } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import SelectButtonStyle from 'primevue/selectbutton/style';
import { resolveDirective, openBlock, createElementBlock, mergeProps, Fragment, renderList, withDirectives, renderSlot, normalizeClass, createElementVNode, toDisplayString } from 'vue';

var script$1 = {
  name: 'BaseSelectButton',
  "extends": BaseComponent,
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
  style: SelectButtonStyle,
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
      var opts = DomHandler.find(this.$refs.container, '[data-pc-section="button"]');
      var firstHighlight = DomHandler.findSingle(this.$refs.container, '[data-p-highlight="true"]');
      for (var i = 0; i < opts.length; i++) {
        if (DomHandler.getAttribute(opts[i], 'data-p-highlight') === true && ObjectUtils.equals(opts[i], firstHighlight) || firstHighlight === null && i == 0) {
          this.focusedIndex = i;
        }
      }
    },
    getOptionLabel: function getOptionLabel(option) {
      return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : option;
    },
    getOptionValue: function getOptionValue(option) {
      return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : option;
    },
    getOptionRenderKey: function getOptionRenderKey(option) {
      return this.dataKey ? ObjectUtils.resolveFieldData(option, this.dataKey) : this.getOptionLabel(option);
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
      return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : false;
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
          return !ObjectUtils.equals(val, optionValue, _this.equalityKey);
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
              if (ObjectUtils.equals(val, optionValue, this.equalityKey)) {
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
        selected = ObjectUtils.equals(this.modelValue, optionValue, this.equalityKey);
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
        this.focusedIndex = ObjectUtils.findIndexInList(nextEl, this.findAllElements());
        DomHandler.focus(nextEl);
      }
    },
    onArrowLeftKey: function onArrowLeftKey(target) {
      var prevEl = this.findPrevElement(target);
      if (prevEl) {
        this.focusedIndex = ObjectUtils.findIndexInList(prevEl, this.findAllElements());
        DomHandler.focus(prevEl);
      }
    },
    findAllElements: function findAllElements() {
      return DomHandler.find(this.$refs.container, '[data-pc-section="button"]');
    },
    findNextElement: function findNextElement(target) {
      if (target.nextElementSibling) {
        if (DomHandler.getAttribute(target.nextElementSibling, 'data-p-disabled')) {
          return this.findNextElement(target.nextElementSibling);
        }
        return target.nextElementSibling;
      }
      return null;
    },
    findPrevElement: function findPrevElement(target) {
      if (target.previousElementSibling) {
        if (DomHandler.getAttribute(target.previousElementSibling, 'data-p-disabled')) {
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
    ripple: Ripple
  }
};

var _hoisted_1 = ["aria-labelledby"];
var _hoisted_2 = ["tabindex", "aria-label", "role", "aria-checked", "aria-disabled", "onClick", "onKeydown", "onBlur", "data-p-highlight", "data-p-disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("div", mergeProps({
    ref: "container",
    "class": _ctx.cx('root'),
    role: "group",
    "aria-labelledby": _ctx.ariaLabelledby
  }, _ctx.ptmi('root')), [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.options, function (option, i) {
    return withDirectives((openBlock(), createElementBlock("div", mergeProps({
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
    }), [renderSlot(_ctx.$slots, "option", {
      option: option,
      index: i,
      "class": normalizeClass(_ctx.cx('label'))
    }, function () {
      return [createElementVNode("span", mergeProps({
        "class": _ctx.cx('label')
      }, $options.getPTOptions(option, 'label')), toDisplayString($options.getOptionLabel(option)), 17)];
    })], 16, _hoisted_2)), [[_directive_ripple]]);
  }), 128))], 16, _hoisted_1);
}

script.render = render;

export { script as default };
