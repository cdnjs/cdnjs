/*! Cropper.js v2.0.0 | (c) 2015-present Chen Fengyuan | MIT */
import { isString, isElement, CROPPER_IMAGE, CROPPER_CANVAS, CROPPER_SELECTION } from '@cropper/utils';
export * from '@cropper/utils';
import { CropperCanvas, CropperCrosshair, CropperGrid, CropperHandle, CropperImage, CropperSelection, CropperShade, CropperViewer } from '@cropper/elements';
export * from '@cropper/elements';

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
CropperCanvas.$define();
CropperCrosshair.$define();
CropperGrid.$define();
CropperHandle.$define();
CropperImage.$define();
CropperSelection.$define();
CropperShade.$define();
CropperViewer.$define();
class Cropper {
    constructor(element, options) {
        this.options = DEFAULT_OPTIONS;
        if (isString(element)) {
            element = document.querySelector(element);
        }
        if (!isElement(element) || !REGEXP_ALLOWED_ELEMENTS.test(element.localName)) {
            throw new Error('The first argument is required and must be an <img> or <canvas> element.');
        }
        this.element = element;
        options = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
        this.options = options;
        const { ownerDocument } = element;
        let { container } = options;
        if (container) {
            if (isString(container)) {
                container = ownerDocument.querySelector(container);
            }
            if (!isElement(container)) {
                throw new Error('The `container` option must be an element or a valid selector.');
            }
        }
        if (!isElement(container)) {
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
        if (template && isString(template)) {
            const templateElement = document.createElement('template');
            const documentFragment = document.createDocumentFragment();
            templateElement.innerHTML = template.replace(REGEXP_BLOCKED_TAGS, '&lt;$1&gt;');
            documentFragment.appendChild(templateElement.content);
            Array.from(documentFragment.querySelectorAll(CROPPER_IMAGE)).forEach((image) => {
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
        return this.container.querySelector(CROPPER_CANVAS);
    }
    getCropperImage() {
        return this.container.querySelector(CROPPER_IMAGE);
    }
    getCropperSelection() {
        return this.container.querySelector(CROPPER_SELECTION);
    }
    getCropperSelections() {
        return this.container.querySelectorAll(CROPPER_SELECTION);
    }
}
Cropper.version = '2.0.0';

export { DEFAULT_TEMPLATE, Cropper as default };
