import { openBlock, createElementBlock, normalizeClass, renderSlot, resolveComponent, createBlock, withCtx, createElementVNode, withModifiers } from 'vue';

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

var script$1 = {
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

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
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

script$1.render = render$1;
script$1.__file = "src/components/button/BtnGroup.vue";

var INPUT_TYPE_CHECKBOX = 'checkbox';
var INPUT_TYPE_RADIO = 'radio';

var script = {
  components: { BtnGroup: script$1 },
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

var _hoisted_1 = ["href", "target"];
var _hoisted_2 = ["type", "checked", "disabled"];
var _hoisted_3 = ["type", "disabled"];
var _hoisted_4 = ["type", "disabled"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
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
      ], 10 /* CLASS, PROPS */, _hoisted_1))
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
            }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_2),
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
                ], 10 /* CLASS, PROPS */, _hoisted_3)
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
            ], 10 /* CLASS, PROPS */, _hoisted_4))
}

script.render = render;
script.__file = "src/components/button/Btn.vue";

export { script as default };
//# sourceMappingURL=Btn.js.map
