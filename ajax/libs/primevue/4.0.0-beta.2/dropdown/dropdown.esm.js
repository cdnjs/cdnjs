import Select from 'primevue/select';

var script = {
  name: 'Dropdown',
  "extends": Select,
  mounted: function mounted() {
    console.warn('Deprecated since v4. Use Select component instead.');
  }
};

export { script as default };
