var InteractiveLayer = {
  props: {
    interactive: {
      type: Boolean,
      default: true
    },
    bubblingMouseEvents: {
      type: Boolean,
      default: true
    }
  },
  mounted: function mounted () {
    this.interactiveLayerOptions = {
      interactive: this.interactive,
      bubblingMouseEvents: this.bubblingMouseEvents
    };
  }
};

export default InteractiveLayer;
