/*! Cropper.js v2.0.0 | (c) 2015-present Chen Fengyuan | MIT */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@cropper/utils'), require('@cropper/elements')) :
    typeof define === 'function' && define.amd ? define(['exports', '@cropper/utils', '@cropper/elements'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Cropper = {}, global.CropperUtils, global.CropperElements));
})(this, (function (exports, utils, elements) { 'use strict';

    var DEFAULT_TEMPLATE = ('<cropper-canvas background>'
        + '<cropper-image rotatable scalable skewable translatable></cropper-image>'
        + '<cropper-shade hidden></cropper-shade>'
        + '<cropper-handle action="select" plain></cropper-handle>'
        + '<cropper-selection initial-coverage="0.5" movable resizable>'
        + '<cropper-grid role="grid" bordered covered></cropper-grid>'
        + '<cropper-crosshair centered></cropper-crosshair>'
        + '<cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)"></cropper-handle>'
        + '<cropper-handle action="n-resize"></cropper-handle>'
        + '<cropper-handle action="e-resize"></cropper-handle>'
        + '<cropper-handle action="s-resize"></cropper-handle>'
        + '<cropper-handle action="w-resize"></cropper-handle>'
        + '<cropper-handle action="ne-resize"></cropper-handle>'
        + '<cropper-handle action="nw-resize"></cropper-handle>'
        + '<cropper-handle action="se-resize"></cropper-handle>'
        + '<cropper-handle action="sw-resize"></cropper-handle>'
        + '</cropper-selection>'
        + '</cropper-canvas>');

    const REGEXP_ALLOWED_ELEMENTS = /^img|canvas$/;
    const REGEXP_BLOCKED_TAGS = /<(\/?(?:script|style)[^>]*)>/gi;
    const DEFAULT_OPTIONS = {
        template: DEFAULT_TEMPLATE,
    };
    elements.CropperCanvas.$define();
    elements.CropperCrosshair.$define();
    elements.CropperGrid.$define();
    elements.CropperHandle.$define();
    elements.CropperImage.$define();
    elements.CropperSelection.$define();
    elements.CropperShade.$define();
    elements.CropperViewer.$define();
    class Cropper {
        constructor(element, options) {
            this.options = DEFAULT_OPTIONS;
            if (utils.isString(element)) {
                element = document.querySelector(element);
            }
            if (!utils.isElement(element) || !REGEXP_ALLOWED_ELEMENTS.test(element.localName)) {
                throw new Error('The first argument is required and must be an <img> or <canvas> element.');
            }
            this.element = element;
            options = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
            this.options = options;
            const { ownerDocument } = element;
            let { container } = options;
            if (container) {
                if (utils.isString(container)) {
                    container = ownerDocument.querySelector(container);
                }
                if (!utils.isElement(container)) {
                    throw new Error('The `container` option must be an element or a valid selector.');
                }
            }
            if (!utils.isElement(container)) {
                if (element.parentElement) {
                    container = element.parentElement;
                }
                else {
                    container = ownerDocument.body;
                }
            }
            this.container = container;
            const tagName = element.localName;
            let src = '';
            if (tagName === 'img') {
                ({ src } = element);
            }
            else if (tagName === 'canvas' && window.HTMLCanvasElement) {
                src = element.toDataURL();
            }
            const { template } = options;
            if (template && utils.isString(template)) {
                const templateElement = document.createElement('template');
                const documentFragment = document.createDocumentFragment();
                templateElement.innerHTML = template.replace(REGEXP_BLOCKED_TAGS, '&lt;$1&gt;');
                documentFragment.appendChild(templateElement.content);
                Array.from(documentFragment.querySelectorAll(utils.CROPPER_IMAGE)).forEach((image) => {
                    image.setAttribute('src', src);
                    image.setAttribute('alt', element.alt || 'The image to crop');
                });
                if (element.parentElement) {
                    element.style.display = 'none';
                    container.insertBefore(documentFragment, element.nextSibling);
                }
                else {
                    container.appendChild(documentFragment);
                }
            }
        }
        getCropperCanvas() {
            return this.container.querySelector(utils.CROPPER_CANVAS);
        }
        getCropperImage() {
            return this.container.querySelector(utils.CROPPER_IMAGE);
        }
        getCropperSelection() {
            return this.container.querySelector(utils.CROPPER_SELECTION);
        }
        getCropperSelections() {
            return this.container.querySelectorAll(utils.CROPPER_SELECTION);
        }
    }
    Cropper.version = '2.0.0';

    exports.DEFAULT_TEMPLATE = DEFAULT_TEMPLATE;
    exports["default"] = Cropper;
    Object.keys(utils).forEach(function (k) {
        if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
            enumerable: true,
            get: function () { return utils[k]; }
        });
    });
    Object.keys(elements).forEach(function (k) {
        if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
            enumerable: true,
            get: function () { return elements[k]; }
        });
    });

    Object.defineProperty(exports, '__esModule', { value: true });

}));
