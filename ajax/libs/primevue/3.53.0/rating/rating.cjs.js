'use strict';

var BanIcon = require('primevue/icons/ban');
var StarIcon = require('primevue/icons/star');
var StarFillIcon = require('primevue/icons/starfill');
var utils = require('primevue/utils');
var BaseComponent = require('primevue/basecomponent');
var RatingStyle = require('primevue/rating/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BanIcon__default = /*#__PURE__*/_interopDefaultLegacy(BanIcon);
var StarIcon__default = /*#__PURE__*/_interopDefaultLegacy(StarIcon);
var StarFillIcon__default = /*#__PURE__*/_interopDefaultLegacy(StarFillIcon);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var RatingStyle__default = /*#__PURE__*/_interopDefaultLegacy(RatingStyle);

var script$1 = {
  name: 'BaseRating',
  "extends": BaseComponent__default["default"],
  props: {
    modelValue: {
      type: Number,
      "default": null
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    readonly: {
      type: Boolean,
      "default": false
    },
    stars: {
      type: Number,
      "default": 5
    },
    cancel: {
      type: Boolean,
      "default": true
    },
    onIcon: {
      type: String,
      "default": undefined
    },
    offIcon: {
      type: String,
      "default": undefined
    },
    cancelIcon: {
      type: String,
      "default": undefined
    }
  },
  style: RatingStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Rating',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:modelValue', 'change', 'focus', 'blur'],
  data: function data() {
    return {
      name: this.$attrs.name,
      focusedOptionIndex: -1,
      isFocusVisibleItem: true
    };
  },
  watch: {
    '$attrs.name': function $attrsName(newValue) {
      this.name = newValue || utils.UniqueComponentId();
    }
  },
  mounted: function mounted() {
    this.name = this.name || utils.UniqueComponentId();
  },
  methods: {
    getPTOptions: function getPTOptions(key, value) {
      return this.ptm(key, {
        context: {
          active: value <= this.modelValue,
          focused: value === this.focusedOptionIndex
        }
      });
    },
    onOptionClick: function onOptionClick(event, value) {
      if (!this.readonly && !this.disabled) {
        this.onOptionSelect(event, value);
        this.isFocusVisibleItem = false;
        var firstFocusableEl = utils.DomHandler.getFirstFocusableElement(event.currentTarget);
        firstFocusableEl && utils.DomHandler.focus(firstFocusableEl);
      }
    },
    onFocus: function onFocus(event, value) {
      this.focusedOptionIndex = value;
      this.$emit('focus', event);
    },
    onBlur: function onBlur(event) {
      this.focusedOptionIndex = -1;
      this.$emit('blur', event);
    },
    onChange: function onChange(event, value) {
      this.onOptionSelect(event, value);
      this.isFocusVisibleItem = true;
    },
    onOptionSelect: function onOptionSelect(event, value) {
      this.focusedOptionIndex = value;
      this.updateModel(event, value || null);
    },
    updateModel: function updateModel(event, value) {
      this.$emit('update:modelValue', value);
      this.$emit('change', {
        originalEvent: event,
        value: value
      });
    },
    cancelAriaLabel: function cancelAriaLabel() {
      return this.$primevue.config.locale.clear;
    },
    starAriaLabel: function starAriaLabel(value) {
      return value === 1 ? this.$primevue.config.locale.aria.star : this.$primevue.config.locale.aria.stars.replace(/{star}/g, value);
    }
  },
  components: {
    StarFillIcon: StarFillIcon__default["default"],
    StarIcon: StarIcon__default["default"],
    BanIcon: BanIcon__default["default"]
  }
};

var _hoisted_1 = ["data-p-focused"];
var _hoisted_2 = ["name", "checked", "disabled", "readonly", "aria-label"];
var _hoisted_3 = ["onClick", "data-p-active", "data-p-focused"];
var _hoisted_4 = ["value", "name", "checked", "disabled", "readonly", "aria-label", "onFocus", "onChange"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [_ctx.cancel ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    key: 0,
    "class": _ctx.cx('cancelItem'),
    onClick: _cache[3] || (_cache[3] = function ($event) {
      return $options.onOptionClick($event, 0);
    })
  }, $options.getPTOptions('cancelItem', 0), {
    "data-p-focused": $data.focusedOptionIndex === 0
  }), [vue.createElementVNode("span", vue.mergeProps({
    "class": "p-hidden-accessible"
  }, _ctx.ptm('hiddenCancelInputWrapper'), {
    "data-p-hidden-accessible": true
  }), [vue.createElementVNode("input", vue.mergeProps({
    type: "radio",
    value: "0",
    name: $data.name,
    checked: _ctx.modelValue === 0,
    disabled: _ctx.disabled,
    readonly: _ctx.readonly,
    "aria-label": $options.cancelAriaLabel(),
    onFocus: _cache[0] || (_cache[0] = function ($event) {
      return $options.onFocus($event, 0);
    }),
    onBlur: _cache[1] || (_cache[1] = function () {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    }),
    onChange: _cache[2] || (_cache[2] = function ($event) {
      return $options.onChange($event, 0);
    })
  }, _ctx.ptm('hiddenCancelInput')), null, 16, _hoisted_2)], 16), vue.renderSlot(_ctx.$slots, "cancelicon", {
    "class": vue.normalizeClass(_ctx.cx('cancelIcon'))
  }, function () {
    return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.cancelIcon ? 'span' : 'BanIcon'), vue.mergeProps({
      "class": [_ctx.cx('cancelIcon'), _ctx.cancelIcon]
    }, _ctx.ptm('cancelIcon')), null, 16, ["class"]))];
  })], 16, _hoisted_1)) : vue.createCommentVNode("", true), (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.stars, function (value) {
    return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
      key: value,
      "class": _ctx.cx('item', {
        value: value
      }),
      onClick: function onClick($event) {
        return $options.onOptionClick($event, value);
      }
    }, $options.getPTOptions('item', value), {
      "data-p-active": value <= _ctx.modelValue,
      "data-p-focused": value === $data.focusedOptionIndex
    }), [vue.createElementVNode("span", vue.mergeProps({
      "class": "p-hidden-accessible"
    }, _ctx.ptm('hiddenItemInputWrapper'), {
      "data-p-hidden-accessible": true
    }), [vue.createElementVNode("input", vue.mergeProps({
      type: "radio",
      value: value,
      name: $data.name,
      checked: _ctx.modelValue === value,
      disabled: _ctx.disabled,
      readonly: _ctx.readonly,
      "aria-label": $options.starAriaLabel(value),
      onFocus: function onFocus($event) {
        return $options.onFocus($event, value);
      },
      onBlur: _cache[4] || (_cache[4] = function () {
        return $options.onBlur && $options.onBlur.apply($options, arguments);
      }),
      onChange: function onChange($event) {
        return $options.onChange($event, value);
      }
    }, _ctx.ptm('hiddenItemInput')), null, 16, _hoisted_4)], 16), value <= _ctx.modelValue ? vue.renderSlot(_ctx.$slots, "onicon", {
      key: 0,
      value: value,
      "class": vue.normalizeClass(_ctx.cx('onIcon'))
    }, function () {
      return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.onIcon ? 'span' : 'StarFillIcon'), vue.mergeProps({
        "class": [_ctx.cx('onIcon'), _ctx.onIcon]
      }, _ctx.ptm('onIcon')), null, 16, ["class"]))];
    }) : vue.renderSlot(_ctx.$slots, "officon", {
      key: 1,
      value: value,
      "class": vue.normalizeClass(_ctx.cx('offIcon'))
    }, function () {
      return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.offIcon ? 'span' : 'StarIcon'), vue.mergeProps({
        "class": [_ctx.cx('offIcon'), _ctx.offIcon]
      }, _ctx.ptm('offIcon')), null, 16, ["class"]))];
    })], 16, _hoisted_3);
  }), 128))], 16);
}

script.render = render;

module.exports = script;
