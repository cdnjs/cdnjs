'use strict';

var vue = require('vue');
var config = require('./config-DR826Ki2.js');

const FormElementMixin = vue.defineComponent({
  props: {
    size: String,
    expanded: Boolean,
    loading: Boolean,
    rounded: Boolean,
    icon: String,
    iconPack: String,
    maxlength: [Number, String],
    useHtml5Validation: {
      type: Boolean,
      default: () => config.config.defaultUseHtml5Validation
    },
    validationMessage: String,
    locale: {
      type: [String, Array],
      default: () => {
        return config.config.defaultLocale;
      }
    },
    statusIcon: {
      type: Boolean,
      default: () => {
        return config.config.defaultStatusIcon;
      }
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    blur: (event) => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    focus: (event) => true
  },
  data() {
    return {
      isValid: true,
      isFocused: false,
      newIconPack: this.iconPack || config.config.defaultIconPack,
      // host component must override this
      _elementRef: ""
    };
  },
  computed: {
    /*
     * Find parent Field, max 3 levels deep.
     */
    parentField() {
      let parent = this.$parent;
      for (let i = 0; i < 3; i++) {
        if (parent && !parent.$data._isField) {
          parent = parent.$parent;
        }
      }
      return parent;
    },
    /*
     * Get the type prop from parent if it's a Field.
     */
    statusType() {
      const { newType } = this.parentField || {};
      if (!newType) return;
      if (typeof newType === "string") {
        return newType;
      } else {
        for (const key in newType) {
          if (newType[key]) {
            return key;
          }
        }
      }
      return void 0;
    },
    /*
     * Get the message prop from parent if it's a Field.
     */
    statusMessage() {
      if (!this.parentField) return;
      return this.parentField.newMessage || this.parentField.$slots.message;
    },
    /*
     * Fix icon size for inputs, large was too big
     */
    iconSize() {
      switch (this.size) {
        case "is-small":
          return this.size;
        case "is-medium":
          return;
        case "is-large":
          return this.newIconPack === "mdi" ? "is-medium" : "";
      }
      return void 0;
    }
  },
  methods: {
    /*
     * Focus method that work dynamically depending on the component.
     */
    focus() {
      const el = this.getElement();
      if (el === void 0) return;
      this.$nextTick(() => {
        if (el) el.focus();
      });
    },
    onBlur($event) {
      this.isFocused = false;
      this.$emit("blur", $event);
      this.checkHtml5Validity();
    },
    onFocus($event) {
      this.isFocused = true;
      this.$emit("focus", $event);
    },
    getElement() {
      let el = this.$refs[this.$data._elementRef];
      while (el != null && typeof el === "object" && "$refs" in el) {
        const form = el;
        el = form.$refs[form.$data._elementRef];
      }
      return el;
    },
    setInvalid() {
      const type = "is-danger";
      const message = this.validationMessage || this.getElement().validationMessage;
      this.setValidity(type, message);
    },
    setValidity(type, message) {
      this.$nextTick(() => {
        if (this.parentField) {
          if (!this.parentField.type) {
            this.parentField.newType = type;
          }
          if (!this.parentField.message) {
            this.parentField.newMessage = message;
          }
        }
      });
    },
    /*
     * Check HTML5 validation, set isValid property.
     * If validation fail, send 'is-danger' type,
     * and error message to parent if it's a Field.
     */
    checkHtml5Validity() {
      if (!this.useHtml5Validation) {
        return false;
      }
      const el = this.getElement();
      if (el == null) {
        return false;
      }
      if (!el.checkValidity()) {
        this.setInvalid();
        this.isValid = false;
      } else {
        this.setValidity(null, null);
        this.isValid = true;
      }
      return this.isValid;
    }
  }
});

exports.FormElementMixin = FormElementMixin;
