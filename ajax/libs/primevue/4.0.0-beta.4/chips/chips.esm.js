import InputChips from 'primevue/inputchips';

var script = {
  name: 'Chips',
  "extends": InputChips,
  mounted: function mounted() {
    console.warn('Deprecated since v4. Use InputChips component instead.');
  }
};

export { script as default };
