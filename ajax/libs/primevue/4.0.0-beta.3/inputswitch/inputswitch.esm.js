import ToggleSwitch from 'primevue/toggleswitch';

var script = {
  name: 'InputSwitch',
  "extends": ToggleSwitch,
  mounted: function mounted() {
    console.warn('Deprecated since v4. Use ToggleSwitch component instead.');
  }
};

export { script as default };
