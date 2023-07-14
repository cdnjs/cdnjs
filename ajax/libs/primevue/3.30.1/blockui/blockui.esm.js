import { DomHandler, ZIndexUtils } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import { useStyle } from 'primevue/usestyle';
import { openBlock, createElementBlock, mergeProps, renderSlot } from 'vue';

var styles = "\n.p-blockui-container {\n    position: relative;\n}\n\n.p-blockui {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n}\n\n.p-blockui.p-component-overlay {\n    position: absolute;\n}\n\n.p-blockui-document.p-component-overlay {\n    position: fixed;\n}\n";
var classes = {
  root: 'p-blockui-container'
};
var _useStyle = useStyle(styles, {
    name: 'blockui',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$1 = {
  name: 'BaseBlockUI',
  "extends": BaseComponent,
  props: {
    blocked: {
      type: Boolean,
      "default": false
    },
    fullScreen: {
      type: Boolean,
      "default": false
    },
    baseZIndex: {
      type: Number,
      "default": 0
    },
    autoZIndex: {
      type: Boolean,
      "default": true
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
  name: 'BlockUI',
  "extends": script$1,
  emits: ['block', 'unblock'],
  mask: null,
  data: function data() {
    return {
      isBlocked: false
    };
  },
  watch: {
    blocked: function blocked(newValue) {
      if (newValue === true) this.block();else this.unblock();
    }
  },
  mounted: function mounted() {
    if (this.blocked) {
      this.block();
    }
  },
  methods: {
    block: function block() {
      var styleClass = 'p-blockui p-component-overlay p-component-overlay-enter';
      if (this.fullScreen) {
        styleClass += ' p-blockui-document';
        this.mask = document.createElement('div');
        !this.isUnstyled && this.mask.setAttribute('class', styleClass);
        document.body.appendChild(this.mask);
        DomHandler.addClass(document.body, 'p-overflow-hidden');
        document.activeElement.blur();
      } else {
        this.mask = document.createElement('div');
        !this.isUnstyled && this.mask.setAttribute('class', styleClass);
        this.$refs.container.appendChild(this.mask);
      }
      if (this.autoZIndex) {
        ZIndexUtils.set('modal', this.mask, this.baseZIndex + this.$primevue.config.zIndex.modal);
      }
      this.isBlocked = true;
      this.$emit('block');
    },
    unblock: function unblock() {
      var _this = this;
      !this.isUnstyled && DomHandler.addClass(this.mask, 'p-component-overlay-leave');
      this.mask.addEventListener('animationend', function () {
        _this.removeMask();
      });
    },
    removeMask: function removeMask() {
      ZIndexUtils.clear(this.mask);
      if (this.fullScreen) {
        if (!this.isUnstyled) {
          document.body.removeChild(this.mask);
          DomHandler.removeClass(document.body, 'p-overflow-hidden');
        }
      } else {
        this.$refs.container.removeChild(this.mask);
      }
      this.isBlocked = false;
      this.$emit('unblock');
    }
  }
};

var _hoisted_1 = ["aria-busy"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    ref: "container",
    "class": _ctx.cx('root'),
    "aria-busy": $data.isBlocked
  }, _ctx.ptm('root')), [renderSlot(_ctx.$slots, "default")], 16, _hoisted_1);
}

script.render = render;

export { script as default };
