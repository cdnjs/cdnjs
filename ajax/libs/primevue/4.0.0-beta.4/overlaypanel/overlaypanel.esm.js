import Popover from 'primevue/popover';

var script = {
  name: 'OverlayPanel',
  "extends": Popover,
  mounted: function mounted() {
    console.warn('Deprecated since v4. Use Popover component instead.');
  }
};

export { script as default };
