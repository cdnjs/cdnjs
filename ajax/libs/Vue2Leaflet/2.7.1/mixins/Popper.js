var Popper = {
  props: {
    content: {
      type: String,
      default: null,
      custom: true
    }
  },
  mounted: function mounted () {
    this.popperOptions = {};
  },
  methods: {
    setContent: function setContent (newVal) {
      if (this.mapObject && newVal !== null && newVal !== undefined) {
        this.mapObject.setContent(newVal);
      }
    }
  },
  render: function render (h) {
    if (this.$slots.default) {
      return h('div', this.$slots.default);
    }
    return null;
  }
};

export default Popper;
