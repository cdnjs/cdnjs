'use strict';

var usestyle = require('primevue/usestyle');
var utils = require('primevue/utils');

var styles = "\n.p-icon {\n    display: inline-block;\n}\n\n.p-icon-spin {\n    -webkit-animation: p-icon-spin 2s infinite linear;\n    animation: p-icon-spin 2s infinite linear;\n}\n\n@-webkit-keyframes p-icon-spin {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(359deg);\n        transform: rotate(359deg);\n    }\n}\n\n@keyframes p-icon-spin {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(359deg);\n        transform: rotate(359deg);\n    }\n}\n";
var _useStyle = usestyle.useStyle(styles, {
    name: 'baseicon',
    manual: true
  }),
  loadStyle = _useStyle.load;
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
    loadStyle(undefined, {
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
