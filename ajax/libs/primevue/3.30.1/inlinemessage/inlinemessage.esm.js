import BaseComponent from 'primevue/basecomponent';
import { useStyle } from 'primevue/usestyle';
import CheckIcon from 'primevue/icons/check';
import ExclamationTriangleIcon from 'primevue/icons/exclamationtriangle';
import InfoCircleIcon from 'primevue/icons/infocircle';
import TimesCircleIcon from 'primevue/icons/timescircle';
import { openBlock, createElementBlock, mergeProps, renderSlot, createBlock, resolveDynamicComponent, createElementVNode, createTextVNode } from 'vue';

var styles = "\n.p-inline-message {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    vertical-align: top;\n}\n\n.p-inline-message-icon-only .p-inline-message-text {\n    visibility: hidden;\n    width: 0;\n}\n\n.p-fluid .p-inline-message {\n    display: flex;\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props,
      instance = _ref.instance;
    return ['p-inline-message p-component p-inline-message-' + props.severity, {
      'p-inline-message-icon-only': !instance.$slots["default"]
    }];
  },
  icon: function icon(_ref2) {
    var props = _ref2.props;
    return ['p-inline-message-icon', props.icon];
  },
  text: 'p-inline-message-text'
};
var _useStyle = useStyle(styles, {
    name: 'inlinemessage',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$1 = {
  name: 'BaseInlineMessage',
  "extends": BaseComponent,
  props: {
    severity: {
      type: String,
      "default": 'error'
    },
    icon: {
      type: String,
      "default": undefined
    }
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
  name: 'InlineMessage',
  "extends": script$1,
  timeout: null,
  data: function data() {
    return {
      visible: true
    };
  },
  mounted: function mounted() {
    var _this = this;
    if (!this.sticky) {
      setTimeout(function () {
        _this.visible = false;
      }, this.life);
    }
  },
  computed: {
    iconComponent: function iconComponent() {
      return {
        info: InfoCircleIcon,
        success: CheckIcon,
        warn: ExclamationTriangleIcon,
        error: TimesCircleIcon
      }[this.severity];
    }
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "aria-live": "polite",
    "class": _ctx.cx('root')
  }, _ctx.ptm('root')), [renderSlot(_ctx.$slots, "icon", {}, function () {
    return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.icon ? 'span' : $options.iconComponent), mergeProps({
      "class": _ctx.cx('icon')
    }, _ctx.ptm('icon')), null, 16, ["class"]))];
  }), createElementVNode("span", mergeProps({
    "class": _ctx.cx('text')
  }, _ctx.ptm('text')), [renderSlot(_ctx.$slots, "default", {}, function () {
    return [createTextVNode(" ")];
  })], 16)], 16);
}

script.render = render;

export { script as default };
