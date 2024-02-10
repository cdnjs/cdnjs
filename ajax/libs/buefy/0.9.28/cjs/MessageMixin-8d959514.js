'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-8b2e54ad.js');
var Icon = require('./Icon-78961800.js');

var MessageMixin = {
  components: _rollupPluginBabelHelpers._defineProperty({}, Icon.Icon.name, Icon.Icon),
  // deprecated, to replace with default 'value' in the next breaking change
  model: {
    prop: 'active',
    event: 'update:active'
  },
  props: {
    active: {
      type: Boolean,
      default: true
    },
    title: String,
    closable: {
      type: Boolean,
      default: true
    },
    message: String,
    type: String,
    hasIcon: Boolean,
    size: String,
    icon: String,
    iconPack: String,
    iconSize: String,
    autoClose: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 2000
    },
    progressBar: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      isActive: this.active,
      remainingTime: this.duration / 1000,
      // in seconds
      newIconSize: this.iconSize || this.size || 'is-large'
    };
  },
  watch: {
    active: function active(value) {
      this.isActive = value;
    },
    isActive: function isActive(value) {
      if (value) {
        this.setAutoClose();
        this.setDurationProgress();
      } else {
        if (this.timer) {
          clearTimeout(this.timer);
        }
      }
    }
  },
  computed: {
    /**
     * Icon name (MDI) based on type.
     */
    computedIcon: function computedIcon() {
      if (this.icon) {
        return this.icon;
      }
      switch (this.type) {
        case 'is-info':
          return 'information';
        case 'is-success':
          return 'check-circle';
        case 'is-warning':
          return 'alert';
        case 'is-danger':
          return 'alert-circle';
        default:
          return null;
      }
    }
  },
  methods: {
    /**
     * Close the Message and emit events.
     */
    close: function close() {
      this.isActive = false;
      this.resetDurationProgress();
      this.$emit('close');
      this.$emit('update:active', false);
    },
    click: function click() {
      this.$emit('click');
    },
    /**
     * Set timer to auto close message
     */
    setAutoClose: function setAutoClose() {
      var _this = this;
      if (this.autoClose) {
        this.timer = setTimeout(function () {
          if (_this.isActive) {
            _this.close();
          }
        }, this.duration);
      }
    },
    setDurationProgress: function setDurationProgress() {
      var _this2 = this;
      if (this.progressBar) {
        /**
         * Runs every one second to set the duration passed before
         * the alert will auto close to show it in the progress bar (Remaining Time)
         */
        this.$buefy.globalNoticeInterval = setInterval(function () {
          if (_this2.remainingTime !== 0) {
            _this2.remainingTime -= 1;
          } else {
            _this2.resetDurationProgress();
          }
        }, 1000);
      }
    },
    resetDurationProgress: function resetDurationProgress() {
      var _this3 = this;
      /**
       * Wait until the component get closed and then reset
       **/
      setTimeout(function () {
        _this3.remainingTime = _this3.duration / 1000;
        clearInterval(_this3.$buefy.globalNoticeInterval);
      }, 100);
    }
  },
  mounted: function mounted() {
    this.setAutoClose();
  }
};

exports.MessageMixin = MessageMixin;
