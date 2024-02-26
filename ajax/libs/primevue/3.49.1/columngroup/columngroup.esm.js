import BaseComponent from 'primevue/basecomponent';
import ColumnGroupStyle from 'primevue/columngroup/style';

var script$1 = {
  name: 'BaseColumnGroup',
  "extends": BaseComponent,
  props: {
    type: {
      type: String,
      "default": null
    }
  },
  style: ColumnGroupStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'ColumnGroup',
  "extends": script$1,
  inheritAttrs: false,
  inject: ['$columnGroups'],
  mounted: function mounted() {
    var _this$$columnGroups;
    (_this$$columnGroups = this.$columnGroups) === null || _this$$columnGroups === void 0 || _this$$columnGroups.add(this.$);
  },
  unmounted: function unmounted() {
    var _this$$columnGroups2;
    (_this$$columnGroups2 = this.$columnGroups) === null || _this$$columnGroups2 === void 0 || _this$$columnGroups2["delete"](this.$);
  },
  render: function render() {
    return null;
  }
};

export { script as default };
