import { loadBaseStyle } from 'primevue/base';
import { useStyle } from 'primevue/usestyle';
import { ObjectUtils } from 'primevue/utils';
import { mergeProps } from 'vue';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var inlineStyles = {};
var buttonStyles = "\n.p-button {\n    display: inline-flex;\n    cursor: pointer;\n    user-select: none;\n    align-items: center;\n    vertical-align: bottom;\n    text-align: center;\n    overflow: hidden;\n    position: relative;\n}\n\n.p-button-label {\n    flex: 1 1 auto;\n}\n\n.p-button-icon-right {\n    order: 1;\n}\n\n.p-button:disabled {\n    cursor: default;\n}\n\n.p-button-icon-only {\n    justify-content: center;\n}\n\n.p-button-icon-only .p-button-label {\n    visibility: hidden;\n    width: 0;\n    flex: 0 0 auto;\n}\n\n.p-button-vertical {\n    flex-direction: column;\n}\n\n.p-button-icon-bottom {\n    order: 2;\n}\n\n.p-buttonset .p-button {\n    margin: 0;\n}\n\n.p-buttonset .p-button:not(:last-child) {\n    border-right: 0 none;\n}\n\n.p-buttonset .p-button:not(:first-of-type):not(:last-of-type) {\n    border-radius: 0;\n}\n\n.p-buttonset .p-button:first-of-type {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n}\n\n.p-buttonset .p-button:last-of-type {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n}\n\n.p-buttonset .p-button:focus {\n    position: relative;\n    z-index: 1;\n}\n";
var checkboxStyles = "\n.p-checkbox {\n    display: inline-flex;\n    cursor: pointer;\n    user-select: none;\n    vertical-align: bottom;\n    position: relative;\n}\n\n.p-checkbox.p-checkbox-disabled {\n    cursor: default;\n}\n\n.p-checkbox-box {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n";
var inputTextStyles = "\n.p-fluid .p-inputtext {\n    width: 100%;\n}\n\n/* InputGroup */\n.p-inputgroup {\n    display: flex;\n    align-items: stretch;\n    width: 100%;\n}\n\n.p-inputgroup-addon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.p-inputgroup .p-float-label {\n    display: flex;\n    align-items: stretch;\n    width: 100%;\n}\n\n.p-inputgroup .p-inputtext,\n.p-fluid .p-inputgroup .p-inputtext,\n.p-inputgroup .p-inputwrapper,\n.p-fluid .p-inputgroup .p-input {\n    flex: 1 1 auto;\n    width: 1%;\n}\n\n/* Floating Label */\n.p-float-label {\n    display: block;\n    position: relative;\n}\n\n.p-float-label label {\n    position: absolute;\n    pointer-events: none;\n    top: 50%;\n    margin-top: -.5rem;\n    transition-property: all;\n    transition-timing-function: ease;\n    line-height: 1;\n}\n\n.p-float-label textarea ~ label {\n    top: 1rem;\n}\n\n.p-float-label input:focus ~ label,\n.p-float-label input.p-filled ~ label,\n.p-float-label textarea:focus ~ label,\n.p-float-label textarea.p-filled ~ label,\n.p-float-label .p-inputwrapper-focus ~ label,\n.p-float-label .p-inputwrapper-filled ~ label {\n    top: -.75rem;\n    font-size: 12px;\n}\n\n.p-float-label .input:-webkit-autofill ~ label {\n    top: -20px;\n    font-size: 12px;\n}\n\n.p-float-label .p-placeholder,\n.p-float-label input::placeholder,\n.p-float-label .p-inputtext::placeholder {\n    opacity: 0;\n    transition-property: all;\n    transition-timing-function: ease;\n}\n\n.p-float-label .p-focus .p-placeholder,\n.p-float-label input:focus::placeholder,\n.p-float-label .p-inputtext:focus::placeholder {\n    opacity: 1;\n    transition-property: all;\n    transition-timing-function: ease;\n}\n\n.p-input-icon-left,\n.p-input-icon-right {\n    position: relative;\n    display: inline-block;\n}\n\n.p-input-icon-left > i,\n.p-input-icon-left > svg,\n.p-input-icon-right > i,\n.p-input-icon-right > svg {\n    position: absolute;\n    top: 50%;\n    margin-top: -.5rem;\n}\n\n.p-fluid .p-input-icon-left,\n.p-fluid .p-input-icon-right {\n    display: block;\n    width: 100%;\n}\n";
var radioButtonStyles = "\n.p-radiobutton {\n    position: relative;\n    display: inline-flex;\n    cursor: pointer;\n    user-select: none;\n    vertical-align: bottom;\n}\n\n.p-radiobutton.p-radiobutton-disabled {\n    cursor: default;\n}\n\n.p-radiobutton-box {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.p-radiobutton-icon {\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n    transform: translateZ(0) scale(.1);\n    border-radius: 50%;\n    visibility: hidden;\n}\n\n.p-radiobutton-box.p-highlight .p-radiobutton-icon {\n    transform: translateZ(0) scale(1.0, 1.0);\n    visibility: visible;\n}\n";
var styles = "\n.p-component, .p-component * {\n    box-sizing: border-box;\n}\n\n.p-hidden-space {\n    visibility: hidden;\n}\n\n.p-reset {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    outline: 0;\n    text-decoration: none;\n    font-size: 100%;\n    list-style: none;\n}\n\n.p-disabled, .p-disabled * {\n    cursor: default !important;\n    pointer-events: none;\n    user-select: none;\n}\n\n.p-component-overlay {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n}\n\n.p-unselectable-text {\n    user-select: none;\n}\n\n.p-sr-only {\n    border: 0;\n    clip: rect(1px, 1px, 1px, 1px);\n    clip-path: inset(50%);\n    height: 1px;\n    margin: -1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    width: 1px;\n    word-wrap: normal !important;\n}\n\n.p-link {\n\ttext-align: left;\n\tbackground-color: transparent;\n\tmargin: 0;\n\tpadding: 0;\n\tborder: none;\n    cursor: pointer;\n    user-select: none;\n}\n\n.p-link:disabled {\n\tcursor: default;\n}\n\n/* Non vue overlay animations */\n.p-connected-overlay {\n    opacity: 0;\n    transform: scaleY(0.8);\n    transition: transform .12s cubic-bezier(0, 0, 0.2, 1), opacity .12s cubic-bezier(0, 0, 0.2, 1);\n}\n\n.p-connected-overlay-visible {\n    opacity: 1;\n    transform: scaleY(1);\n}\n\n.p-connected-overlay-hidden {\n    opacity: 0;\n    transform: scaleY(1);\n    transition: opacity .1s linear;\n}\n\n/* Vue based overlay animations */\n.p-connected-overlay-enter-from {\n    opacity: 0;\n    transform: scaleY(0.8);\n}\n\n.p-connected-overlay-leave-to {\n    opacity: 0;\n}\n\n.p-connected-overlay-enter-active {\n    transition: transform .12s cubic-bezier(0, 0, 0.2, 1), opacity .12s cubic-bezier(0, 0, 0.2, 1);\n}\n\n.p-connected-overlay-leave-active {\n    transition: opacity .1s linear;\n}\n\n/* Toggleable Content */\n.p-toggleable-content-enter-from,\n.p-toggleable-content-leave-to {\n    max-height: 0;\n}\n\n.p-toggleable-content-enter-to,\n.p-toggleable-content-leave-from {\n    max-height: 1000px;\n}\n\n.p-toggleable-content-leave-active {\n    overflow: hidden;\n    transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);\n}\n\n.p-toggleable-content-enter-active {\n    overflow: hidden;\n    transition: max-height 1s ease-in-out;\n}\n".concat(buttonStyles, "\n").concat(checkboxStyles, "\n").concat(inputTextStyles, "\n").concat(radioButtonStyles, "\n");
var _useStyle = useStyle(styles, {
    name: 'common',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script = {
  name: 'BaseComponent',
  props: {
    pt: {
      type: Object,
      "default": undefined
    },
    unstyled: {
      type: Boolean,
      "default": undefined
    }
  },
  inject: {
    $parentInstance: {
      "default": undefined
    }
  },
  watch: {
    isUnstyled: {
      immediate: true,
      handler: function handler(newValue) {
        if (!newValue) {
          loadStyle();
          this.$options.css && this.$css.loadStyle();
        }
      }
    }
  },
  beforeCreate: function beforeCreate() {
    var _this$pt, _this$pt$onBeforeCrea, _this$$primevue, _this$$primevue$onBef;
    (_this$pt = this.pt) === null || _this$pt === void 0 || (_this$pt = _this$pt.hooks) === null || _this$pt === void 0 || (_this$pt$onBeforeCrea = _this$pt['onBeforeCreate']) === null || _this$pt$onBeforeCrea === void 0 ? void 0 : _this$pt$onBeforeCrea.call(_this$pt);
    (_this$$primevue = this.$primevue) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.config) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.pt) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue[this.$.type.name]) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.hooks) === null || _this$$primevue === void 0 || (_this$$primevue$onBef = _this$$primevue['onBeforeCreate']) === null || _this$$primevue$onBef === void 0 ? void 0 : _this$$primevue$onBef.call(_this$$primevue);
  },
  created: function created() {
    this._hook('onCreated');
  },
  beforeMount: function beforeMount() {
    loadBaseStyle();
    this._hook('onBeforeMount');
  },
  mounted: function mounted() {
    this._hook('onMounted');
  },
  beforeUpdate: function beforeUpdate() {
    this._hook('onBeforeUpdate');
  },
  updated: function updated() {
    this._hook('onUpdated');
  },
  beforeUnmount: function beforeUnmount() {
    this._hook('onBeforeUnmount');
  },
  unmounted: function unmounted() {
    this._hook('onUnmounted');
  },
  methods: {
    _hook: function _hook(hookName) {
      var selfHook = this._getOptionValue(this.pt, "hooks.".concat(hookName));
      var globalHook = this._getOptionValue(this.globalPT, "hooks.".concat(hookName));
      selfHook === null || selfHook === void 0 ? void 0 : selfHook();
      globalHook === null || globalHook === void 0 ? void 0 : globalHook();
    },
    _getHostInstance: function _getHostInstance(instance) {
      return instance ? this.$options.hostName ? instance.$.type.name === this.$options.hostName ? instance : this._getHostInstance(instance.$parentInstance) : instance.$parentInstance : undefined;
    },
    _getOptionValue: function _getOptionValue(options) {
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var fKeys = ObjectUtils.toFlatCase(key).split('.');
      var fKey = fKeys.shift();
      return fKey ? ObjectUtils.isObject(options) ? this._getOptionValue(ObjectUtils.getItemValue(options[Object.keys(options).find(function (k) {
        return ObjectUtils.toFlatCase(k) === fKey;
      }) || ''], params), fKeys.join('.'), params) : undefined : ObjectUtils.getItemValue(options, params);
    },
    _getPTValue: function _getPTValue() {
      var _this = this;
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var searchInDefaultPT = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var getValue = function getValue() {
        var value = _this._getOptionValue.apply(_this, arguments);
        return ObjectUtils.isString(value) || ObjectUtils.isArray(value) ? {
          "class": value
        } : value;
      };
      var datasetPrefix = 'data-pc-';
      var self = getValue(obj, key, params);
      var globalPT = searchInDefaultPT ? /./g.test(key) && !!params[key.split('.')[0]] ? getValue(this.globalPT, key, params) : getValue(this.defaultPT, key, params) : undefined;
      var merged = mergeProps(self, globalPT, _objectSpread(_objectSpread({}, key === 'root' && _defineProperty({}, "".concat(datasetPrefix, "name"), ObjectUtils.toFlatCase(this.$.type.name))), {}, _defineProperty({}, "".concat(datasetPrefix, "section"), ObjectUtils.toFlatCase(key))));
      return merged;
      /*
       * @todo: The 'class' option in self can always be more powerful to style the component easily.
       *
       * return self && self['class'] ? { ...merged, ...{ class: self['class'] } } : merged;
       */
    },
    ptm: function ptm() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this._getPTValue(this.pt, key, _objectSpread({
        instance: this,
        props: this.$props,
        state: this.$data
      }, params));
    },
    ptmo: function ptmo() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this._getPTValue(obj, key, _objectSpread({
        instance: this
      }, params), false);
    },
    cx: function cx() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return !this.isUnstyled ? this._getOptionValue(this.$css.classes, key, _objectSpread({
        instance: this,
        props: this.$props,
        state: this.$data,
        parentInstance: this.$parentInstance
      }, params)) : undefined;
    },
    sx: function sx() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var when = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (when) {
        var self = this._getOptionValue(this.$css.inlineStyles, key, _objectSpread({
          instance: this,
          props: this.$props,
          state: this.$data,
          parentInstance: this.$parentInstance
        }, params));
        var base = this._getOptionValue(inlineStyles, key, _objectSpread({
          instance: this,
          props: this.$props,
          state: this.$data,
          parentInstance: this.$parentInstance
        }, params));
        return [base, self];
      }
      return undefined;
    }
  },
  computed: {
    globalPT: function globalPT() {
      return ObjectUtils.getItemValue(this.$primevue.config.pt, {
        instance: this
      });
    },
    defaultPT: function defaultPT() {
      return this._getOptionValue(this.$primevue.config.pt, this.$options.hostName || this.$.type.name, {
        instance: this
      }) || this.globalPT;
    },
    isUnstyled: function isUnstyled() {
      return this.unstyled !== undefined ? this.unstyled : this.$primevue.config.unstyled;
    },
    $css: function $css() {
      return _objectSpread(_objectSpread({
        classes: undefined,
        inlineStyles: undefined,
        loadStyle: function loadStyle() {}
      }, (this._getHostInstance(this) || {}).$css), this.$options.css);
    }
  }
};

export { script as default };
