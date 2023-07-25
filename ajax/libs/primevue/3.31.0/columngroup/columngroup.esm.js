import BaseComponent from 'primevue/basecomponent';

var script$1 = {
  name: 'BaseColumnGroup',
  "extends": BaseComponent,
  props: {
    type: {
      type: String,
      "default": null
    }
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'ColumnGroup',
  "extends": script$1,
  render: function render() {
    return null;
  }
};

export { script as default };
