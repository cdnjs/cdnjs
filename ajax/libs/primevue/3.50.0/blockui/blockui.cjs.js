'use strict';

var utils = require('primevue/utils');
var BaseComponent = require('primevue/basecomponent');
var BlockUIStyle = require('primevue/blockui/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var BlockUIStyle__default = /*#__PURE__*/_interopDefaultLegacy(BlockUIStyle);

var script$1 = {
  name: 'BaseBlockUI',
  "extends": BaseComponent__default["default"],
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
  style: BlockUIStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'BlockUI',
  "extends": script$1,
  inheritAttrs: false,
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
        this.mask = utils.DomHandler.createElement('div', {
          style: {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%'
          },
          "class": !this.isUnstyled && styleClass,
          'p-bind': this.ptm('mask')
        });
        document.body.appendChild(this.mask);
        utils.DomHandler.blockBodyScroll();
        document.activeElement.blur();
      } else {
        this.mask = utils.DomHandler.createElement('div', {
          style: {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%'
          },
          "class": !this.isUnstyled && styleClass,
          'p-bind': this.ptm('mask')
        });
        this.$refs.container.appendChild(this.mask);
      }
      if (this.autoZIndex) {
        utils.ZIndexUtils.set('modal', this.mask, this.baseZIndex + this.$primevue.config.zIndex.modal);
      }
      this.isBlocked = true;
      this.$emit('block');
    },
    unblock: function unblock() {
      var _this = this;
      !this.isUnstyled && utils.DomHandler.addClass(this.mask, 'p-component-overlay-leave');
      if (utils.DomHandler.hasCSSAnimation(this.mask) > 0) {
        this.mask.addEventListener('animationend', function () {
          _this.removeMask();
        });
      } else {
        this.removeMask();
      }
    },
    removeMask: function removeMask() {
      utils.ZIndexUtils.clear(this.mask);
      if (this.fullScreen) {
        document.body.removeChild(this.mask);
        utils.DomHandler.unblockBodyScroll();
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
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    ref: "container",
    "class": _ctx.cx('root'),
    "aria-busy": $data.isBlocked
  }, _ctx.ptmi('root')), [vue.renderSlot(_ctx.$slots, "default")], 16, _hoisted_1);
}

script.render = render;

module.exports = script;
