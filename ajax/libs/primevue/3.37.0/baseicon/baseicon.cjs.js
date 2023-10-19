'use strict';

var BaseIconStyle = require('primevue/baseicon/style');
var utils = require('primevue/utils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseIconStyle__default = /*#__PURE__*/_interopDefaultLegacy(BaseIconStyle);

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
    BaseIconStyle__default["default"].loadStyle({
      nonce: (_this$$config = this.$config) === null || _this$$config === void 0 || (_this$$config = _this$$config.csp) === null || _this$$config === void 0 ? void 0 : _this$$config.nonce
    });
  },
  methods: {
    pti: function pti() {
      var isLabelEmpty = utils.ObjectUtils.isEmpty(this.label);
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

module.exports = script;
