import Drawer from 'primevue/drawer';

var script = {
  name: 'Sidebar',
  "extends": Drawer,
  mounted: function mounted() {
    console.warn('Deprecated since v4. Use Drawer component instead.');
  }
};

export { script as default };
