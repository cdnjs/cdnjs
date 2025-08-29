import { defineComponent, Fragment, h, Comment, Text, resolveComponent, createElementBlock, openBlock, normalizeClass, createBlock, renderSlot, createCommentVNode, createTextVNode, toDisplayString, withCtx, createVNode, renderList } from 'vue';
import { c as config } from './config-CKuo-p6e.js';
import { isTag } from './helpers.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';

var _sfc_main = defineComponent({
  name: "BFieldBody",
  inject: {
    parent: {
      from: "BField",
      default: null
    }
  },
  props: {
    message: {
      type: [String, Array]
    },
    type: {
      type: [String, Object]
    }
  },
  render() {
    let first = true;
    let children = typeof this.$slots.default === "function" ? this.$slots.default() : this.$slots.default;
    if (children != null && children.length === 1 && children[0].type === Fragment) {
      children = children[0].children;
    }
    return h(
      "div",
      { class: "field-body" },
      {
        default: () => {
          return children != null && children.map((element) => {
            if (element.type === Comment || element.type === Text) {
              return element;
            }
            let message;
            if (first) {
              message = this.message;
              first = false;
            }
            const parentField = this.parent;
            return h(
              // parentField.$.type is supposed to be BField
              // it falls back to `resolveComponent('b-field')`
              // but won't work unless `BField` is globally registered
              // should not be a problem as long as `BFieldBody` is properly used
              parentField ? parentField.$.type : resolveComponent("b-field"),
              {
                type: this.type,
                message
              },
              () => element
            );
          });
        }
      }
    );
  }
});

const Field$1 = defineComponent({
  name: "BField",
  components: { BFieldBody: _sfc_main },
  provide() {
    return {
      BField: this
    };
  },
  inject: {
    parent: {
      from: "BField",
      default: false
    }
  },
  // Used internally only when using Field in Field
  props: {
    type: {
      type: [String, Object],
      default: void 0
    },
    label: String,
    labelFor: String,
    message: {
      type: [String, Array, Object],
      default: void 0
    },
    grouped: Boolean,
    groupMultiline: Boolean,
    position: String,
    expanded: Boolean,
    horizontal: Boolean,
    addons: {
      type: Boolean,
      default: true
    },
    customClass: String,
    labelPosition: {
      type: String,
      default: () => {
        return config.defaultFieldLabelPosition;
      }
    }
  },
  data() {
    return {
      newType: this.type,
      newMessage: this.message,
      fieldLabelSize: null,
      numberInputClasses: [],
      _isField: true
      // Used internally by Input and Select
    };
  },
  computed: {
    rootClasses() {
      return [
        {
          "is-expanded": this.expanded,
          "is-horizontal": this.horizontal,
          "is-floating-in-label": this.hasLabel && !this.horizontal && this.labelPosition === "inside",
          "is-floating-label": this.hasLabel && !this.horizontal && this.labelPosition === "on-border"
        },
        this.numberInputClasses
      ];
    },
    innerFieldClasses() {
      return [
        this.fieldType(),
        this.newPosition,
        {
          "is-grouped-multiline": this.groupMultiline
        }
      ];
    },
    hasInnerField() {
      return this.grouped || this.groupMultiline || this.hasAddons();
    },
    /*
    * Correct Bulma class for the side of the addon or group.
    *
    * This is not kept like the others (is-small, etc.),
    * because since 'has-addons' is set automatically it
    * doesn't make sense to teach users what addons are exactly.
    */
    newPosition() {
      if (this.position === void 0) return;
      const position = this.position.split("-");
      if (position.length < 1) return;
      const prefix = this.grouped ? "is-grouped-" : "has-addons-";
      if (this.position) return prefix + position[1];
      return void 0;
    },
    /*
    * Formatted message in case it's an array
    * (each element is separated by <br> tag)
    */
    formattedMessage() {
      const parentField = this.parent;
      if (parentField && parentField.hasInnerField) {
        return "";
      }
      if (typeof this.newMessage === "string") {
        return [this.newMessage];
      }
      const messages = [];
      if (Array.isArray(this.newMessage)) {
        this.newMessage.forEach((message) => {
          if (typeof message === "string") {
            messages.push(message);
          } else {
            for (const key in message) {
              if (message[key]) {
                messages.push(key);
              }
            }
          }
        });
      } else {
        for (const key in this.newMessage) {
          if (this.newMessage[key]) {
            messages.push(key);
          }
        }
      }
      return messages.filter((m) => !!m);
    },
    hasLabel() {
      return this.label || this.$slots.label;
    },
    hasMessage() {
      const parentField = this.parent;
      return (!parentField || !parentField.hasInnerField) && this.newMessage || this.$slots.message;
    }
  },
  watch: {
    /*
    * Set internal type when prop change.
    */
    type(value) {
      this.newType = value;
    },
    /*
    * Set internal message when prop change.
    */
    message(value) {
      if (JSON.stringify(value) !== JSON.stringify(this.newMessage)) {
        this.newMessage = value;
      }
    },
    /*
    * Set parent message if we use Field in Field.
    */
    newMessage(value) {
      const parentField = this.parent;
      if (parentField && parentField.hasInnerField) {
        if (!parentField.type) {
          parentField.newType = this.newType;
        }
        if (!parentField.message) {
          parentField.newMessage = value;
        }
      }
    }
  },
  methods: {
    /*
    * Field has addons if there are more than one slot
    * (element / component) in the Field.
    * Or is grouped when prop is set.
    * Is a method to be called when component re-render.
    */
    fieldType() {
      if (this.grouped) return "is-grouped";
      if (this.hasAddons()) return "has-addons";
    },
    hasAddons() {
      let renderedNode = 0;
      if (this.$slots.default) {
        renderedNode = this.$slots.default().reduce((i, node) => isTag(node) ? i + 1 : i, 0);
      }
      return renderedNode > 1 && this.addons && !this.horizontal;
    },
    // called by a number input if it is a direct child.
    wrapNumberinput({ controlsPosition, size }) {
      const classes = ["has-numberinput"];
      if (controlsPosition) {
        classes.push(`has-numberinput-${controlsPosition}`);
      }
      if (size) {
        classes.push(`has-numberinput-${size}`);
      }
      this.numberInputClasses = classes;
    }
  },
  mounted() {
    if (this.horizontal) {
      const elements = this.$el.querySelectorAll(".input, .select, .button, .textarea, .b-slider");
      if (elements.length > 0) {
        this.fieldLabelSize = "is-normal";
      }
    }
  }
});

const _hoisted_1 = ["for"];
const _hoisted_2 = ["for"];
const _hoisted_3 = {
  key: 3,
  class: "field-body"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_field_body = resolveComponent("b-field-body");
  const _component_b_field = resolveComponent("b-field");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["field", _ctx.rootClasses])
    },
    [
      _ctx.horizontal ? (openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          class: normalizeClass(["field-label", [_ctx.customClass, _ctx.fieldLabelSize]])
        },
        [
          _ctx.hasLabel ? (openBlock(), createElementBlock("label", {
            key: 0,
            for: _ctx.labelFor,
            class: normalizeClass([_ctx.customClass, "label"])
          }, [
            _ctx.$slots.label ? renderSlot(_ctx.$slots, "label", { key: 0 }) : (openBlock(), createElementBlock(
              Fragment,
              { key: 1 },
              [
                createTextVNode(
                  toDisplayString(_ctx.label),
                  1
                  /* TEXT */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ], 10, _hoisted_1)) : createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      )) : (openBlock(), createElementBlock(
        Fragment,
        { key: 1 },
        [
          _ctx.hasLabel ? (openBlock(), createElementBlock("label", {
            key: 0,
            for: _ctx.labelFor,
            class: normalizeClass([_ctx.customClass, "label"])
          }, [
            _ctx.$slots.label ? renderSlot(_ctx.$slots, "label", { key: 0 }) : (openBlock(), createElementBlock(
              Fragment,
              { key: 1 },
              [
                createTextVNode(
                  toDisplayString(_ctx.label),
                  1
                  /* TEXT */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ], 10, _hoisted_2)) : createCommentVNode("v-if", true)
        ],
        64
        /* STABLE_FRAGMENT */
      )),
      _ctx.horizontal ? (openBlock(), createBlock(_component_b_field_body, {
        key: 2,
        message: _ctx.newMessage ? _ctx.formattedMessage : "",
        type: _ctx.newType
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["message", "type"])) : _ctx.hasInnerField ? (openBlock(), createElementBlock("div", _hoisted_3, [
        createVNode(_component_b_field, {
          addons: false,
          type: _ctx.type,
          class: normalizeClass(_ctx.innerFieldClasses)
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["type", "class"])
      ])) : renderSlot(_ctx.$slots, "default", { key: 4 }),
      _ctx.hasMessage && !_ctx.horizontal ? (openBlock(), createElementBlock(
        "p",
        {
          key: 5,
          class: normalizeClass(["help", _ctx.newType])
        },
        [
          _ctx.$slots.message ? renderSlot(_ctx.$slots, "message", {
            key: 0,
            messages: _ctx.formattedMessage
          }) : (openBlock(true), createElementBlock(
            Fragment,
            { key: 1 },
            renderList(_ctx.formattedMessage, (mess, i) => {
              return openBlock(), createElementBlock(
                Fragment,
                null,
                [
                  createTextVNode(
                    toDisplayString(mess) + " ",
                    1
                    /* TEXT */
                  ),
                  i + 1 < _ctx.formattedMessage.length ? (openBlock(), createElementBlock("br", { key: i })) : createCommentVNode("v-if", true)
                ],
                64
                /* STABLE_FRAGMENT */
              );
            }),
            256
            /* UNKEYED_FRAGMENT */
          ))
        ],
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true)
    ],
    2
    /* CLASS */
  );
}
var Field = /* @__PURE__ */ _export_sfc(Field$1, [["render", _sfc_render]]);

export { Field as F };
