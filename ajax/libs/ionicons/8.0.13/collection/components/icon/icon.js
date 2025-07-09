import { Build, Host, h } from "@stencil/core";
import { getSvgContent, ioniconContent } from "./request";
import { getName, getUrl, inheritAttributes, isRTL } from "./utils";
export class Icon {
    constructor() {
        this.iconName = null;
        this.inheritedAttributes = {};
        this.didLoadIcon = false;
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
    }
    componentWillLoad() {
        this.inheritedAttributes = inheritAttributes(this.el, ['aria-label']);
    }
    connectedCallback() {
        /**
         * purposely do not return the promise here because loading
         * the svg file should not hold up loading the app
         * only load the svg if it's visible
         */
        this.waitUntilVisible(this.el, '50px', () => {
            this.isVisible = true;
            this.loadIcon();
        });
    }
    /**
     * Loads the icon after the component has finished rendering.
     */
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
    /**
     * Disconnect the IntersectionObserver.
     */
    disconnectedCallback() {
        if (this.io) {
            this.io.disconnect();
            this.io = undefined;
        }
    }
    /**
     * Wait until the icon is visible in the viewport.
     * @param el - The element to observe.
     * @param rootMargin - The root margin of the observer.
     * @param cb - The callback to call when the element is visible.
     */
    waitUntilVisible(el, rootMargin, cb) {
        /**
         * IntersectionObserver is a browser API that allows you to observe
         * the visibility of an element relative to a root element. It is
         * supported in all modern browsers, except IE and when server-side
         * rendering.
         */
        const hasIntersectionObserverSupport = Boolean(Build.isBrowser && this.lazy && typeof window !== 'undefined' && window.IntersectionObserver);
        /**
         * browser doesn't support IntersectionObserver
         * so just fallback to always show it
         */
        if (!hasIntersectionObserverSupport) {
            return cb();
        }
        const io = (this.io = new window.IntersectionObserver((data) => {
            if (data[0].isIntersecting) {
                io.disconnect();
                this.io = undefined;
                cb();
            }
        }, { rootMargin }));
        io.observe(el);
    }
    /**
     * Watch for changes to the icon name, src, icon, ios, or md properties.
     * When a change is detected, the icon will be loaded.
     */
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
        /**
         * we have designated that arrows & chevrons should automatically flip (unless flip-rtl
         * is set to false) because "back" is left in ltr and right in rtl, and "forward" is the opposite
         */
        const shouldAutoFlip = iconName
            ? (iconName.includes('arrow') || iconName.includes('chevron')) && flipRtl !== false
            : false;
        /**
         * if shouldBeFlippable is true, the icon should change direction when `dir` changes
         */
        const shouldBeFlippable = flipRtl || shouldAutoFlip;
        return (h(Host, Object.assign({ key: '0578c899781ca145dd8205acd9670af39b57cf2e', role: "img", class: Object.assign(Object.assign({ [mode]: true }, createColorClasses(this.color)), { [`icon-${this.size}`]: !!this.size, 'flip-rtl': shouldBeFlippable, 'icon-rtl': shouldBeFlippable && isRTL(el) }) }, inheritedAttributes), Build.isBrowser && this.svgContent ? (h("div", { class: "icon-inner", innerHTML: this.svgContent })) : (h("div", { class: "icon-inner" }))));
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
                "attribute": "mode",
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
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "getIonMode()"
            },
            "color": {
                "type": "string",
                "attribute": "color",
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
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "ios": {
                "type": "string",
                "attribute": "ios",
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
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "md": {
                "type": "string",
                "attribute": "md",
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
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "flipRtl": {
                "type": "boolean",
                "attribute": "flip-rtl",
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
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "name": {
                "type": "string",
                "attribute": "name",
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
                "getter": false,
                "setter": false,
                "reflect": true
            },
            "src": {
                "type": "string",
                "attribute": "src",
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
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "icon": {
                "type": "any",
                "attribute": "icon",
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
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "size": {
                "type": "string",
                "attribute": "size",
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
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "lazy": {
                "type": "boolean",
                "attribute": "lazy",
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
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "sanitize": {
                "type": "boolean",
                "attribute": "sanitize",
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
                "getter": false,
                "setter": false,
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
/**
 * Get the mode of the document.
 * @returns The mode of the document.
 */
const getIonMode = () => (Build.isBrowser && typeof document !== 'undefined' && document.documentElement.getAttribute('mode')) || 'md';
/**
 * Create color classes for the icon.
 * @param color - The color of the icon.
 * @returns The color classes for the icon.
 */
const createColorClasses = (color) => {
    return color
        ? {
            'ion-color': true,
            [`ion-color-${color}`]: true,
        }
        : null;
};
