import BaseIconStyle from 'primevue/baseicon/style';
import { ObjectUtils } from 'primevue/utils';

var script = {
  name: 'BaseIcon',
  props: {
    label: {
      type: String,
      "default": undefined
    },
    spin: {
      type: Boolean,
      "default": false
    }
  },
  beforeMount: function beforeMount() {
    var _this$$config;
    BaseIconStyle.loadStyle({
      nonce: (_this$$config = this.$config) === null || _this$$config === void 0 || (_this$$config = _this$$config.csp) === null || _this$$config === void 0 ? void 0 : _this$$config.nonce
    });
  },
  methods: {
    pti: function pti() {
      var isLabelEmpty = ObjectUtils.isEmpty(this.label);
      return {
        "class": ['p-icon', {
          'p-icon-spin': this.spin
        }],
        role: !isLabelEmpty ? 'img' : undefined,
        'aria-label': !isLabelEmpty ? this.label : undefined,
        'aria-hidden': isLabelEmpty
      };
    }
  },
  computed: {
    $config: function $config() {
      var _this$$primevue;
      return (_this$$primevue = this.$primevue) === null || _this$$primevue === void 0 ? void 0 : _this$$primevue.config;
    }
  }
};

export { script as default };
