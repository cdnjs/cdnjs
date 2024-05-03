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
    onIcon: {
      type: String,
      "default": undefined
    },
    offIcon: {
      type: String,
      "default": undefined
    }
  },
  style: RatingStyle__default["default"],
  provide: function provide() {
    return {
      $pcRating: this,
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
      if (this.focusedOptionIndex === value || this.modelValue === value) {
        this.focusedOptionIndex = -1;
        this.updateModel(event, null);
      } else {
        this.focusedOptionIndex = value;
        this.updateModel(event, value || null);
      }
    },
    updateModel: function updateModel(event, value) {
      this.$emit('update:modelValue', value);
      this.$emit('change', {
        originalEvent: event,
        value: value
      });
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

var _hoisted_1 = ["onClick", "data-p-active", "data-p-focused"];
var _hoisted_2 = ["value", "name", "checked", "disabled", "readonly", "aria-label", "onFocus", "onChange"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.stars, function (value) {
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
      onBlur: _cache[0] || (_cache[0] = function () {
        return $options.onBlur && $options.onBlur.apply($options, arguments);
      }),
      onChange: function onChange($event) {
        return $options.onChange($event, value);
      }
    }, _ctx.ptm('hiddenItemInput')), null, 16, _hoisted_2)], 16), value <= _ctx.modelValue ? vue.renderSlot(_ctx.$slots, "onicon", {
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
    })], 16, _hoisted_1);
  }), 128))], 16);
}

script.render = render;

module.exports = script;
