import DatePicker from 'primevue/datepicker';

var script = {
  name: 'Calendar',
  "extends": DatePicker,
  mounted: function mounted() {
    console.warn('Deprecated since v4. Use DatePicker component instead.');
  }
};

export { script as default };
