import { Build, Host, h } from '@stencil/core';
import { getSvgContent, ioniconContent } from './request';
import { getName, getUrl, inheritAttributes, isRTL } from './utils';
let parser;
export class Icon {
  constructor() {
    this.iconName = null;
    this.inheritedAttributes = {};
    this.isVisible = false;
    /**
     * The mode determines which platform styles to use.
     */
    this.mode = getIonMode();
    /**
     * If enabled, ion-icon will be loaded lazily when it's visible in the viewport.
     * Default, `false`.
     */
    this.lazy = false;
    /**
     * When set to `false`, SVG content that is HTTP fetched will not be checked
     * if the response SVG content has any `<script>` elements, or any attributes
     * that start with `on`, such as `onclick`.
     * @default true
     */
    this.sanitize = true;
    this.hasAriaHidden = () => {
      const { el } = this;
      return el.hasAttribute('aria-hidden') && el.getAttribute('aria-hidden') === 'true';
    };
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
      if (!parser) {
        /**
         * Create an instance of the DOM parser. This creates a single
         * parser instance for the entire app, which is more efficient.
         */
        parser = new DOMParser();
      }
      const url = getUrl(this);
      if (url) {
        if (ioniconContent.has(url)) {
          // sync if it's already loaded
          this.svgContent = ioniconContent.get(url);
        }
        else if (url.startsWith('data:')) {
          const doc = parser.parseFromString(url, 'text/html');
          const svgEl = doc.body.querySelector('svg');
          if (svgEl !== null) {
            this.svgContent = svgEl.outerHTML;
          }
          else {
            this.svgContent = '';
          }
        }
        else {
          // async if it hasn't been loaded
          getSvgContent(url, this.sanitize).then(() => (this.svgContent = ioniconContent.get(url)));
        }
      }
    }
    const label = this.iconName = getName(this.name, this.icon, this.mode, this.ios, this.md);
    /**
     * Come up with a default label
     * in case user does not provide their own.
     */
    if (label) {
      this.ariaLabel = label.replace(/\-/g, ' ');
    }
  }
  render() {
    const { iconName, ariaLabel, el, inheritedAttributes } = this;
    const mode = this.mode || 'md';
    const flipRtl = this.flipRtl ||
      (iconName &&
        (iconName.indexOf('arrow') > -1 || iconName.indexOf('chevron') > -1) &&
        this.flipRtl !== false);
    /**
     * Only set the aria-label if a) we have generated
     * one for the icon and if aria-hidden is not set to "true".
     * If developer wants to set their own aria-label, then
     * inheritedAttributes down below will override whatever
     * default label we have set.
     */
    return (h(Host, Object.assign({ "aria-label": ariaLabel !== undefined && !this.hasAriaHidden() ? ariaLabel : null, role: "img", class: Object.assign(Object.assign({ [mode]: true }, createColorClasses(this.color)), { [`icon-${this.size}`]: !!this.size, 'flip-rtl': !!flipRtl && isRTL(el) }) }, inheritedAttributes), Build.isBrowser && this.svgContent ? (h("div", { class: "icon-inner", innerHTML: this.svgContent })) : (h("div", { class: "icon-inner" }))));
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
      "isVisible": {},
      "ariaLabel": {}
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
