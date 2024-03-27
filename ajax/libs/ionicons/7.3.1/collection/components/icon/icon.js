import { Build, Host, h } from "@stencil/core";
import { getSvgContent, ioniconContent } from "./request";
import { getName, getUrl, inheritAttributes, isRTL } from "./utils";
export class Icon {
  constructor() {
    this.iconName = null;
    this.inheritedAttributes = {};
    this.didLoadIcon = false;
    this.svgContent = undefined;
    this.isVisible = false;
    this.mode = getIonMode();
    this.color = undefined;
    this.ios = undefined;
    this.md = undefined;
    this.flipRtl = undefined;
    this.name = undefined;
    this.src = undefined;
    this.icon = undefined;
    this.size = undefined;
    this.lazy = false;
    this.sanitize = true;
  }
  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label']);
  }
  connectedCallback() {
    // purposely do not return the promise here because loading
    // the svg file should not hold up loading the app
    // only load the svg if it's visible
    this.waitUntilVisible(this.el, '50px', () => {
      this.isVisible = true;
      this.loadIcon();
    });
  }
  componentDidLoad() {
    /**
     * Addresses an Angular issue where property values are assigned after the 'connectedCallback' but prior to the registration of watchers.
     * This enhancement ensures the loading of an icon when the component has finished rendering and the icon has yet to apply the SVG data.
     * This modification pertains to the usage of Angular's binding syntax:
     * `<ion-icon [name]="myIconName"></ion-icon>`
     */
    if (!this.didLoadIcon) {
      this.loadIcon();
    }
  }
  disconnectedCallback() {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
    }
  }
  waitUntilVisible(el, rootMargin, cb) {
    if (Build.isBrowser && this.lazy && typeof window !== 'undefined' && window.IntersectionObserver) {
      const io = (this.io = new window.IntersectionObserver((data) => {
        if (data[0].isIntersecting) {
          io.disconnect();
          this.io = undefined;
          cb();
        }
      }, { rootMargin }));
      io.observe(el);
    }
    else {
      // browser doesn't support IntersectionObserver
      // so just fallback to always show it
      cb();
    }
  }
  loadIcon() {
    if (Build.isBrowser && this.isVisible) {
      const url = getUrl(this);
      if (url) {
        if (ioniconContent.has(url)) {
          // sync if it's already loaded
          this.svgContent = ioniconContent.get(url);
        }
        else {
          // async if it hasn't been loaded
          getSvgContent(url, this.sanitize).then(() => (this.svgContent = ioniconContent.get(url)));
        }
        this.didLoadIcon = true;
      }
    }
    this.iconName = getName(this.name, this.icon, this.mode, this.ios, this.md);
  }
  render() {
    const { flipRtl, iconName, inheritedAttributes, el } = this;
    const mode = this.mode || 'md';
    // we have designated that arrows & chevrons should automatically flip (unless flip-rtl is set to false) because "back" is left in ltr and right in rtl, and "forward" is the opposite
    const shouldAutoFlip = iconName
      ? (iconName.includes('arrow') || iconName.includes('chevron')) && flipRtl !== false
      : false;
    // if shouldBeFlippable is true, the icon should change direction when `dir` changes
    const shouldBeFlippable = flipRtl || shouldAutoFlip;
    return (h(Host, Object.assign({ role: "img", class: Object.assign(Object.assign({ [mode]: true }, createColorClasses(this.color)), { [`icon-${this.size}`]: !!this.size, 'flip-rtl': shouldBeFlippable, 'icon-rtl': shouldBeFlippable && isRTL(el) }) }, inheritedAttributes), Build.isBrowser && this.svgContent ? (h("div", { class: "icon-inner", innerHTML: this.svgContent })) : (h("div", { class: "icon-inner" }))));
  }
  static get is() { return "ion-icon"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["icon.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["icon.css"]
    };
  }
  static get assetsDirs() { return ["svg"]; }
  static get properties() {
    return {
      "mode": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "The mode determines which platform styles to use."
        },
        "attribute": "mode",
        "reflect": false,
        "defaultValue": "getIonMode()"
      },
      "color": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "The color to use for the background of the item."
        },
        "attribute": "color",
        "reflect": false
      },
      "ios": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Specifies which icon to use on `ios` mode."
        },
        "attribute": "ios",
        "reflect": false
      },
      "md": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Specifies which icon to use on `md` mode."
        },
        "attribute": "md",
        "reflect": false
      },
      "flipRtl": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Specifies whether the icon should horizontally flip when `dir` is `\"rtl\"`."
        },
        "attribute": "flip-rtl",
        "reflect": false
      },
      "name": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Specifies which icon to use from the built-in set of icons."
        },
        "attribute": "name",
        "reflect": true
      },
      "src": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Specifies the exact `src` of an SVG file to use."
        },
        "attribute": "src",
        "reflect": false
      },
      "icon": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "A combination of both `name` and `src`. If a `src` url is detected\nit will set the `src` property. Otherwise it assumes it's a built-in named\nSVG and set the `name` property."
        },
        "attribute": "icon",
        "reflect": false
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "The size of the icon.\nAvailable options are: `\"small\"` and `\"large\"`."
        },
        "attribute": "size",
        "reflect": false
      },
      "lazy": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If enabled, ion-icon will be loaded lazily when it's visible in the viewport.\nDefault, `false`."
        },
        "attribute": "lazy",
        "reflect": false,
        "defaultValue": "false"
      },
      "sanitize": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "default",
              "text": "true"
            }],
          "text": "When set to `false`, SVG content that is HTTP fetched will not be checked\nif the response SVG content has any `<script>` elements, or any attributes\nthat start with `on`, such as `onclick`."
        },
        "attribute": "sanitize",
        "reflect": false,
        "defaultValue": "true"
      }
    };
  }
  static get states() {
    return {
      "svgContent": {},
      "isVisible": {}
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "name",
        "methodName": "loadIcon"
      }, {
        "propName": "src",
        "methodName": "loadIcon"
      }, {
        "propName": "icon",
        "methodName": "loadIcon"
      }, {
        "propName": "ios",
        "methodName": "loadIcon"
      }, {
        "propName": "md",
        "methodName": "loadIcon"
      }];
  }
}
const getIonMode = () => (Build.isBrowser && typeof document !== 'undefined' && document.documentElement.getAttribute('mode')) || 'md';
const createColorClasses = (color) => {
  return color
    ? {
      'ion-color': true,
      [`ion-color-${color}`]: true,
    }
    : null;
};
