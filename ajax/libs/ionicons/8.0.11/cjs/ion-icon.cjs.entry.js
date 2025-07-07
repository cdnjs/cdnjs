'use strict';

var index$1 = require('./index-DF4TSUuX.js');
var index = require('./index-CKzfGCYy.js');

const validateContent = (svgContent) => {
    const div = document.createElement('div');
    div.innerHTML = svgContent;
    // setup this way to ensure it works on our buddy IE
    for (let i = div.childNodes.length - 1; i >= 0; i--) {
        if (div.childNodes[i].nodeName.toLowerCase() !== 'svg') {
            div.removeChild(div.childNodes[i]);
        }
    }
    // must only have 1 root element
    const svgElm = div.firstElementChild;
    if (svgElm && svgElm.nodeName.toLowerCase() === 'svg') {
        const svgClass = svgElm.getAttribute('class') || '';
        svgElm.setAttribute('class', (svgClass + ' s-ion-icon').trim());
        // root element must be an svg
        // lets double check we've got valid elements
        // do not allow scripts
        if (isValid(svgElm)) {
            return div.innerHTML;
        }
    }
    return '';
};
const isValid = (elm) => {
    if (elm.nodeType === 1) {
        if (elm.nodeName.toLowerCase() === 'script') {
            return false;
        }
        for (let i = 0; i < elm.attributes.length; i++) {
            const name = elm.attributes[i].name;
            if (index.isStr(name) && name.toLowerCase().indexOf('on') === 0) {
                return false;
            }
        }
        for (let i = 0; i < elm.childNodes.length; i++) {
            if (!isValid(elm.childNodes[i])) {
                return false;
            }
        }
    }
    return true;
};
const isSvgDataUrl = (url) => url.startsWith('data:image/svg+xml');
const isEncodedDataUrl = (url) => url.indexOf(';utf8,') !== -1;

const ioniconContent = new Map();
const requests = new Map();
let parser;
/**
 * Safely fallback to an empty svg
 */
function safeFallback(url) {
    const svg = '';
    ioniconContent.set(url, svg);
    return svg;
}
const getSvgContent = (url, sanitize) => {
    /**
     * See if we already have a request for this url
     */
    const req = requests.get(url);
    if (req) {
        return req;
    }
    if (typeof fetch !== 'undefined' && typeof document !== 'undefined') {
        /**
         * If the url is a data url of an svg, then try to parse it
         * with the DOMParser. This works with content security policies enabled.
         */
        if (isSvgDataUrl(url) && isEncodedDataUrl(url)) {
            return Promise.resolve(getSvgByUrl(url));
        }
        return fetchSvg(url, sanitize);
    }
    return Promise.resolve(safeFallback(url));
};
function getSvgByUrl(url) {
    if (!parser) {
        /**
         * Create an instance of the DOM parser. This creates a single
         * parser instance for the entire app, which is more efficient.
         */
        parser = new DOMParser();
    }
    const doc = parser.parseFromString(url, 'text/html');
    const svg = doc.querySelector('svg');
    if (svg) {
        ioniconContent.set(url, svg.outerHTML);
        return svg.outerHTML;
    }
    throw new Error(`Could not parse svg from ${url}`);
}
function fetchSvg(url, sanitize) {
    /**
     * We don't already have a request
     */
    const req = fetch(url)
        .then((rsp) => {
        /**
         * When fetching from a file:// URL, some browsers return
         * a 0 status code even when the request succeeds so don't
         * rely on rsp.ok as the only signal of success.
         */
        return rsp
            .text()
            .then((svgContent) => {
            if (svgContent && sanitize !== false) {
                svgContent = validateContent(svgContent);
            }
            const svg = svgContent || '';
            ioniconContent.set(url, svg);
            return svg;
        })
            .catch(() => safeFallback(url));
    })
        .catch(() => safeFallback(url));
    /**
     * Cache for the same requests
     */
    requests.set(url, req);
    return req;
}

const iconCss = ":host{display:inline-block;width:1em;height:1em;contain:strict;fill:currentColor;box-sizing:content-box !important}:host .ionicon{stroke:currentColor}.ionicon-fill-none{fill:none}.ionicon-stroke-width{stroke-width:var(--ionicon-stroke-width, 32px)}.icon-inner,.ionicon,svg{display:block;height:100%;width:100%}@supports (background: -webkit-named-image(i)){:host(.icon-rtl) .icon-inner{transform:scaleX(-1)}}@supports not selector(:dir(rtl)) and selector(:host-context([dir='rtl'])){:host(.icon-rtl) .icon-inner{transform:scaleX(-1)}}:host(.flip-rtl):host-context([dir='rtl']) .icon-inner{transform:scaleX(-1)}@supports selector(:dir(rtl)){:host(.flip-rtl:dir(rtl)) .icon-inner{transform:scaleX(-1)}:host(.flip-rtl:dir(ltr)) .icon-inner{transform:scaleX(1)}}:host(.icon-small){font-size:1.125rem !important}:host(.icon-large){font-size:2rem !important}:host(.ion-color){color:var(--ion-color-base) !important}:host(.ion-color-primary){--ion-color-base:var(--ion-color-primary, #3880ff)}:host(.ion-color-secondary){--ion-color-base:var(--ion-color-secondary, #0cd1e8)}:host(.ion-color-tertiary){--ion-color-base:var(--ion-color-tertiary, #f4a942)}:host(.ion-color-success){--ion-color-base:var(--ion-color-success, #10dc60)}:host(.ion-color-warning){--ion-color-base:var(--ion-color-warning, #ffce00)}:host(.ion-color-danger){--ion-color-base:var(--ion-color-danger, #f14141)}:host(.ion-color-light){--ion-color-base:var(--ion-color-light, #f4f5f8)}:host(.ion-color-medium){--ion-color-base:var(--ion-color-medium, #989aa2)}:host(.ion-color-dark){--ion-color-base:var(--ion-color-dark, #222428)}";

const Icon = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
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
        this.inheritedAttributes = index.inheritAttributes(this.el, ['aria-label']);
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
        const hasIntersectionObserverSupport = Boolean(this.lazy && typeof window !== 'undefined' && window.IntersectionObserver);
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
        if (this.isVisible) {
            const url = index.getUrl(this);
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
        this.iconName = index.getName(this.name, this.icon, this.mode, this.ios, this.md);
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
        return (index$1.h(index$1.Host, Object.assign({ key: '0578c899781ca145dd8205acd9670af39b57cf2e', role: "img", class: Object.assign(Object.assign({ [mode]: true }, createColorClasses(this.color)), { [`icon-${this.size}`]: !!this.size, 'flip-rtl': shouldBeFlippable, 'icon-rtl': shouldBeFlippable && index.isRTL(el) }) }, inheritedAttributes), this.svgContent ? (index$1.h("div", { class: "icon-inner", innerHTML: this.svgContent })) : (index$1.h("div", { class: "icon-inner" }))));
    }
    static get assetsDirs() { return ["svg"]; }
    get el() { return index$1.getElement(this); }
    static get watchers() { return {
        "name": ["loadIcon"],
        "src": ["loadIcon"],
        "icon": ["loadIcon"],
        "ios": ["loadIcon"],
        "md": ["loadIcon"]
    }; }
};
/**
 * Get the mode of the document.
 * @returns The mode of the document.
 */
const getIonMode = () => (typeof document !== 'undefined' && document.documentElement.getAttribute('mode')) || 'md';
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
Icon.style = iconCss;

exports.ion_icon = Icon;
