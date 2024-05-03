import BanIcon from 'primevue/icons/ban';
import StarIcon from 'primevue/icons/star';
import StarFillIcon from 'primevue/icons/starfill';
import { UniqueComponentId, DomHandler } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import RatingStyle from 'primevue/rating/style';
import { openBlock, createElementBlock, mergeProps, Fragment, renderList, createElementVNode, renderSlot, normalizeClass, createBlock, resolveDynamicComponent } from 'vue';

var script$1 = {
  name: 'BaseRating',
  "extends": BaseComponent,
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
  style: RatingStyle,
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
      this.name = newValue || UniqueComponentId();
    }
  },
  mounted: function mounted() {
    this.name = this.name || UniqueComponentId();
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
        var firstFocusableEl = DomHandler.getFirstFocusableElement(event.currentTarget);
        firstFocusableEl && DomHandler.focus(firstFocusableEl);
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
    StarFillIcon: StarFillIcon,
    StarIcon: StarIcon,
    BanIcon: BanIcon
  }
};

var _hoisted_1 = ["onClick", "data-p-active", "data-p-focused"];
var _hoisted_2 = ["value", "name", "checked", "disabled", "readonly", "aria-label", "onFocus", "onChange"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.stars, function (value) {
    return openBlock(), createElementBlock("div", mergeProps({
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
    }), [createElementVNode("span", mergeProps({
      "class": "p-hidden-accessible"
    }, _ctx.ptm('hiddenItemInputWrapper'), {
      "data-p-hidden-accessible": true
    }), [createElementVNode("input", mergeProps({
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
    }, _ctx.ptm('hiddenItemInput')), null, 16, _hoisted_2)], 16), value <= _ctx.modelValue ? renderSlot(_ctx.$slots, "onicon", {
      key: 0,
      value: value,
      "class": normalizeClass(_ctx.cx('onIcon'))
    }, function () {
      return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.onIcon ? 'span' : 'StarFillIcon'), mergeProps({
        "class": [_ctx.cx('onIcon'), _ctx.onIcon]
      }, _ctx.ptm('onIcon')), null, 16, ["class"]))];
    }) : renderSlot(_ctx.$slots, "officon", {
      key: 1,
      value: value,
      "class": normalizeClass(_ctx.cx('offIcon'))
    }, function () {
      return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.offIcon ? 'span' : 'StarIcon'), mergeProps({
        "class": [_ctx.cx('offIcon'), _ctx.offIcon]
      }, _ctx.ptm('offIcon')), null, 16, ["class"]))];
    })], 16, _hoisted_1);
  }), 128))], 16);
}

script.render = render;

export { script as default };
