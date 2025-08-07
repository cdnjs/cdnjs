import { defineComponent } from 'vue';

var CheckRadioMixin = defineComponent({
  props: {
    modelValue: [String, Number, Boolean, Function, Object, Array],
    nativeValue: [String, Number, Boolean, Function, Object, Array],
    type: String,
    disabled: Boolean,
    required: Boolean,
    name: String,
    size: String
  },
  emits: {
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    "update:modelValue": (value) => true
  },
  data() {
    return {
      newValue: this.modelValue
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.newValue;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(value) {
        this.newValue = value;
        this.$emit("update:modelValue", value);
      }
    },
    disabledOrUndefined() {
      return this.disabled || void 0;
    },
    requiredOrUndefined() {
      return this.required || void 0;
    }
  },
  watch: {
    /*
    * When v-model change, set internal value.
    */
    modelValue(value) {
      this.newValue = value;
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    }
  }
});

export { CheckRadioMixin as C };
