'use strict';

var utils = require('primevue/utils');
var vue = require('vue');

var script = {
  name: 'Portal',
  props: {
    appendTo: {
      type: String,
      "default": 'body'
    },
    disabled: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      mounted: false
    };
  },
  mounted: function mounted() {
    this.mounted = utils.DomHandler.isClient();
  },
  computed: {
    inline: function inline() {
      return this.disabled || this.appendTo === 'self';
    }
  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return $options.inline ? vue.renderSlot(_ctx.$slots, "default", {
    key: 0
  }) : $data.mounted ? (vue.openBlock(), vue.createBlock(vue.Teleport, {
    key: 1,
    to: $props.appendTo
  }, [vue.renderSlot(_ctx.$slots, "default")], 8, ["to"])) : vue.createCommentVNode("", true);
}

script.render = render;

module.exports = script;
