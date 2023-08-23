'use strict';

var BaseComponent = require('primevue/basecomponent');
var usestyle = require('primevue/usestyle');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var styles = "\n.p-inputtextarea-resizable {\n    overflow: hidden;\n    resize: none;\n}\n\n.p-fluid .p-inputtextarea {\n    width: 100%;\n}\n";
var classes = {
  root: function root(_ref) {
    var instance = _ref.instance,
      props = _ref.props;
    return ['p-inputtextarea p-inputtext p-component', {
      'p-filled': instance.filled,
      'p-inputtextarea-resizable ': props.autoResize
    }];
  }
};
var _useStyle = usestyle.useStyle(styles, {
    name: 'textarea',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$1 = {
  name: 'BaseTextarea',
  "extends": BaseComponent__default["default"],
  props: {
    modelValue: null,
    autoResize: Boolean
  },
  css: {
    classes: classes,
    loadStyle: loadStyle
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Textarea',
  "extends": script$1,
  emits: ['update:modelValue'],
  mounted: function mounted() {
    if (this.$el.offsetParent && this.autoResize) {
      this.resize();
    }
  },
  updated: function updated() {
    if (this.$el.offsetParent && this.autoResize) {
      this.resize();
    }
  },
  methods: {
    resize: function resize() {
      var style = window.getComputedStyle(this.$el);
      this.$el.style.height = 'auto';
      this.$el.style.height = "calc(".concat(style.borderTopWidth, " + ").concat(style.borderBottomWidth, " + ").concat(this.$el.scrollHeight, "px)");
      if (parseFloat(this.$el.style.height) >= parseFloat(this.$el.style.maxHeight)) {
        this.$el.style.overflowY = 'scroll';
        this.$el.style.height = this.$el.style.maxHeight;
      } else {
        this.$el.style.overflow = 'hidden';
      }
    },
    onInput: function onInput(event) {
      if (this.autoResize) {
        this.resize();
      }
      this.$emit('update:modelValue', event.target.value);
    }
  },
  computed: {
    filled: function filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0;
    },
    ptmParams: function ptmParams() {
      return {
        context: {
          disabled: this.$attrs.disabled || this.$attrs.disabled === ''
        }
      };
    }
  }
};

var _hoisted_1 = ["value"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("textarea", vue.mergeProps({
    "class": _ctx.cx('root'),
    value: _ctx.modelValue,
    onInput: _cache[0] || (_cache[0] = function () {
      return $options.onInput && $options.onInput.apply($options, arguments);
    })
  }, _ctx.ptm('root', $options.ptmParams), {
    "data-pc-name": "textarea"
  }), null, 16, _hoisted_1);
}

script.render = render;

module.exports = script;
