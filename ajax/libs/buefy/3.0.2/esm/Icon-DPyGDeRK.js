import { defineComponent, createElementBlock, openBlock, normalizeClass, createBlock, resolveDynamicComponent } from 'vue';
import { c as config } from './config-CKuo-p6e.js';
import { merge } from './helpers.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';

const mdiIcons = {
  sizes: {
    default: "mdi-24px",
    "is-small": null,
    "is-medium": "mdi-36px",
    "is-large": "mdi-48px"
  },
  iconPrefix: "mdi-"
};
const faIcons = () => {
  const faIconPrefix = config && config.defaultIconComponent ? "" : "fa-";
  return {
    sizes: {
      default: null,
      "is-small": null,
      "is-medium": faIconPrefix + "lg",
      "is-large": faIconPrefix + "2x"
    },
    iconPrefix: faIconPrefix,
    internalIcons: {
      information: "info-circle",
      alert: "exclamation-triangle",
      "alert-circle": "exclamation-circle",
      "chevron-right": "angle-right",
      "chevron-left": "angle-left",
      "chevron-down": "angle-down",
      "eye-off": "eye-slash",
      "menu-down": "caret-down",
      "menu-up": "caret-up",
      "close-circle": "times-circle"
    }
  };
};
const getIcons = () => {
  let icons = {
    mdi: mdiIcons,
    fa: faIcons(),
    fas: faIcons(),
    far: faIcons(),
    fad: faIcons(),
    fab: faIcons(),
    fal: faIcons(),
    "fa-solid": faIcons(),
    "fa-regular": faIcons(),
    "fa-light": faIcons(),
    "fa-thin": faIcons(),
    "fa-duotone": faIcons(),
    "fa-brands": faIcons()
  };
  if (config && config.customIconPacks) {
    icons = merge(icons, config.customIconPacks, true);
  }
  return icons;
};

var _sfc_main = defineComponent({
  name: "BIcon",
  props: {
    type: [String, Object],
    component: String,
    pack: String,
    icon: {
      type: String,
      required: true
    },
    size: String,
    customSize: String,
    customClass: String,
    both: Boolean
    // This is used internally to show both MDI and FA icon
  },
  computed: {
    iconConfig() {
      const allIcons = getIcons();
      return allIcons[this.newPack];
    },
    iconPrefix() {
      if (this.iconConfig && this.iconConfig.iconPrefix) {
        return this.iconConfig.iconPrefix;
      }
      return "";
    },
    /*
    * Internal icon name based on the pack.
    * If pack is 'fa', gets the equivalent FA icon name of the MDI,
    * internal icons are always MDI.
    */
    newIcon() {
      return `${this.iconPrefix}${this.getEquivalentIconOf(this.icon)}`;
    },
    newPack() {
      return this.pack || config.defaultIconPack;
    },
    newType() {
      if (!this.type) return;
      let splitType = [];
      if (typeof this.type === "string") {
        splitType = this.type.split("-");
      } else {
        for (const key in this.type) {
          if (this.type[key]) {
            splitType = key.split("-");
            break;
          }
        }
      }
      if (splitType.length <= 1) return;
      const [, ...type] = splitType;
      return `has-text-${type.join("-")}`;
    },
    newCustomSize() {
      return this.customSize || this.customSizeByPack;
    },
    customSizeByPack() {
      if (this.iconConfig && this.iconConfig.sizes) {
        if (this.size && this.iconConfig.sizes[this.size] !== void 0) {
          return this.iconConfig.sizes[this.size];
        } else if (this.iconConfig.sizes.default) {
          return this.iconConfig.sizes.default;
        }
      }
      return null;
    },
    useIconComponent() {
      return this.component || config.defaultIconComponent;
    }
  },
  methods: {
    /*
    * Equivalent icon name of the MDI.
    */
    getEquivalentIconOf(value) {
      if (!this.both) {
        return value;
      }
      if (this.iconConfig == null) {
        return value;
      }
      const maybeInternal = this.iconConfig;
      if (maybeInternal && maybeInternal.internalIcons && maybeInternal.internalIcons[value]) {
        return maybeInternal.internalIcons[value];
      }
      return value;
    }
  }
});

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(
    "span",
    {
      class: normalizeClass(["icon", [_ctx.newType, _ctx.size]])
    },
    [
      !_ctx.useIconComponent ? (openBlock(), createElementBlock(
        "i",
        {
          key: 0,
          class: normalizeClass([_ctx.newPack, _ctx.newIcon, _ctx.newCustomSize, _ctx.customClass])
        },
        null,
        2
        /* CLASS */
      )) : (openBlock(), createBlock(resolveDynamicComponent(_ctx.useIconComponent), {
        key: 1,
        icon: [_ctx.newPack, _ctx.newIcon],
        size: _ctx.newCustomSize,
        class: normalizeClass([_ctx.customClass])
      }, null, 8, ["icon", "size", "class"]))
    ],
    2
    /* CLASS */
  );
}
var BIcon = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { BIcon as B };
