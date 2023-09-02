import BaseComponent from 'primevue/basecomponent';
import { useStyle } from 'primevue/usestyle';
import { openBlock, createElementBlock, mergeProps } from 'vue';

var styles = "\n.p-skeleton {\n    overflow: hidden;\n}\n\n.p-skeleton::after {\n    content: '';\n    animation: p-skeleton-animation 1.2s infinite;\n    height: 100%;\n    left: 0;\n    position: absolute;\n    right: 0;\n    top: 0;\n    transform: translateX(-100%);\n    z-index: 1;\n}\n\n.p-skeleton.p-skeleton-circle {\n    border-radius: 50%;\n}\n\n.p-skeleton-none::after {\n    animation: none;\n}\n\n@keyframes p-skeleton-animation {\n    from {\n        transform: translateX(-100%);\n    }\n    to {\n        transform: translateX(100%);\n    }\n}\n";
var inlineStyles = {
  root: {
    position: 'relative'
  }
};
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return ['p-skeleton p-component', {
      'p-skeleton-circle': props.shape === 'circle',
      'p-skeleton-none': props.animation === 'none'
    }];
  }
};
var _useStyle = useStyle(styles, {
    name: 'skeleton',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$1 = {
  name: 'BaseSkeleton',
  "extends": BaseComponent,
  props: {
    shape: {
      type: String,
      "default": 'rectangle'
    },
    size: {
      type: String,
      "default": null
    },
    width: {
      type: String,
      "default": '100%'
    },
    height: {
      type: String,
      "default": '1rem'
    },
    borderRadius: {
      type: String,
      "default": null
    },
    animation: {
      type: String,
      "default": 'wave'
    }
  },
  css: {
    classes: classes,
    inlineStyles: inlineStyles,
    loadStyle: loadStyle
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Skeleton',
  "extends": script$1,
  computed: {
    containerStyle: function containerStyle() {
      if (this.size) return {
        width: this.size,
        height: this.size,
        borderRadius: this.borderRadius
      };else return {
        width: this.width,
        height: this.height,
        borderRadius: this.borderRadius
      };
    }
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root'),
    style: [_ctx.sx('root'), $options.containerStyle],
    "aria-hidden": "true"
  }, _ctx.ptm('root'), {
    "data-pc-name": "skeleton"
  }), null, 16);
}

script.render = render;

export { script as default };
