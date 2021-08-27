'use strict';

var helpers = require('./helpers.js');

var SlotComponent = {
  name: 'BSlotComponent',
  props: {
    component: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      default: 'default'
    },
    scoped: {
      type: Boolean
    },
    props: {
      type: Object
    },
    tag: {
      type: String,
      default: 'div'
    },
    event: {
      type: String,
      default: 'hook:updated'
    }
  },
  methods: {
    refresh: function refresh() {
      this.$forceUpdate();
    }
  },
  created: function created() {
    if (helpers.isVueComponent(this.component)) {
      this.component.$on(this.event, this.refresh);
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (helpers.isVueComponent(this.component)) {
      this.component.$off(this.event, this.refresh);
    }
  },
  render: function render(createElement) {
    if (helpers.isVueComponent(this.component)) {
      return createElement(this.tag, {}, this.scoped ? this.component.$scopedSlots[this.name](this.props) : this.component.$slots[this.name]);
    }
  }
};

exports.SlotComponent = SlotComponent;
