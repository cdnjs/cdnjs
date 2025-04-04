/*! Cropper.js v2.0.0 | (c) 2015-present Chen Fengyuan | MIT */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Cropper = {}));
})(this, (function (exports) { 'use strict';

    const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
    const WINDOW = IS_BROWSER ? window : {};
    const IS_TOUCH_DEVICE = IS_BROWSER ? 'ontouchstart' in WINDOW.document.documentElement : false;
    const HAS_POINTER_EVENT = IS_BROWSER ? 'PointerEvent' in WINDOW : false;
    const NAMESPACE = 'cropper';
    const CROPPER_CANVAS = `${NAMESPACE}-canvas`;
    const CROPPER_CROSSHAIR = `${NAMESPACE}-crosshair`;
    const CROPPER_GIRD = `${NAMESPACE}-grid`;
    const CROPPER_HANDLE = `${NAMESPACE}-handle`;
    const CROPPER_IMAGE = `${NAMESPACE}-image`;
    const CROPPER_SELECTION = `${NAMESPACE}-selection`;
    const CROPPER_SHADE = `${NAMESPACE}-shade`;
    const CROPPER_VIEWER = `${NAMESPACE}-viewer`;
    // Actions
    const ACTION_SELECT = 'select';
    const ACTION_MOVE = 'move';
    const ACTION_SCALE = 'scale';
    const ACTION_ROTATE = 'rotate';
    const ACTION_TRANSFORM = 'transform';
    const ACTION_NONE = 'none';
    const ACTION_RESIZE_NORTH = 'n-resize';
    const ACTION_RESIZE_EAST = 'e-resize';
    const ACTION_RESIZE_SOUTH = 's-resize';
    const ACTION_RESIZE_WEST = 'w-resize';
    const ACTION_RESIZE_NORTHEAST = 'ne-resize';
    const ACTION_RESIZE_NORTHWEST = 'nw-resize';
    const ACTION_RESIZE_SOUTHEAST = 'se-resize';
    const ACTION_RESIZE_SOUTHWEST = 'sw-resize';
    // Attributes
    const ATTRIBUTE_ACTION = 'action';
    // Native events
    const EVENT_TOUCH_END = IS_TOUCH_DEVICE ? 'touchend touchcancel' : 'mouseup';
    const EVENT_TOUCH_MOVE = IS_TOUCH_DEVICE ? 'touchmove' : 'mousemove';
    const EVENT_TOUCH_START = IS_TOUCH_DEVICE ? 'touchstart' : 'mousedown';
    const EVENT_POINTER_DOWN = HAS_POINTER_EVENT ? 'pointerdown' : EVENT_TOUCH_START;
    const EVENT_POINTER_MOVE = HAS_POINTER_EVENT ? 'pointermove' : EVENT_TOUCH_MOVE;
    const EVENT_POINTER_UP = HAS_POINTER_EVENT ? 'pointerup pointercancel' : EVENT_TOUCH_END;
    const EVENT_ERROR = 'error';
    const EVENT_KEYDOWN = 'keydown';
    const EVENT_LOAD = 'load';
    const EVENT_RESIZE = 'resize';
    const EVENT_WHEEL = 'wheel';
    // Custom events
    const EVENT_ACTION = 'action';
    const EVENT_ACTION_END = 'actionend';
    const EVENT_ACTION_MOVE = 'actionmove';
    const EVENT_ACTION_START = 'actionstart';
    const EVENT_CHANGE = 'change';
    const EVENT_TRANSFORM = 'transform';

    /**
     * Check if the given value is a string.
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the given value is a string, else `false`.
     */
    function isString(value) {
        return typeof value === 'string';
    }
    /**
     * Check if the given value is not a number.
     */
    const isNaN = Number.isNaN || WINDOW.isNaN;
    /**
     * Check if the given value is a number.
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the given value is a number, else `false`.
     */
    function isNumber(value) {
        return typeof value === 'number' && !isNaN(value);
    }
    /**
     * Check if the given value is a positive number.
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the given value is a positive number, else `false`.
     */
    function isPositiveNumber(value) {
        return isNumber(value) && value > 0 && value < Infinity;
    }
    /**
     * Check if the given value is undefined.
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the given value is undefined, else `false`.
     */
    function isUndefined(value) {
        return typeof value === 'undefined';
    }
    /**
     * Check if the given value is an object.
     * @param {*} value - The value to check.
     * @returns {boolean} Returns `true` if the given value is an object, else `false`.
     */
    function isObject(value) {
        return typeof value === 'object' && value !== null;
    }
    const { hasOwnProperty } = Object.prototype;
    /**
     * Check if the given value is a plain object.
     * @param {*} value - The value to check.
     * @returns {boolean} Returns `true` if the given value is a plain object, else `false`.
     */
    function isPlainObject(value) {
        if (!isObject(value)) {
            return false;
        }
        try {
            const { constructor } = value;
            const { prototype } = constructor;
            return constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
        }
        catch (error) {
            return false;
        }
    }
    /**
     * Check if the given value is a function.
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if the given value is a function, else `false`.
     */
    function isFunction(value) {
        return typeof value === 'function';
    }
    /**
     * Check if the given node is an element.
     * @param {*} node The node to check.
     * @returns {boolean} Returns `true` if the given node is an element; otherwise, `false`.
     */
    function isElement(node) {
        return typeof node === 'object' && node !== null && node.nodeType === 1;
    }
    const REGEXP_CAMEL_CASE = /([a-z\d])([A-Z])/g;
    /**
     * Transform the given string from camelCase to kebab-case.
     * @param {string} value The value to transform.
     * @returns {string} Returns the transformed value.
     */
    function toKebabCase(value) {
        return String(value).replace(REGEXP_CAMEL_CASE, '$1-$2').toLowerCase();
    }
    const REGEXP_KEBAB_CASE = /-[A-z\d]/g;
    /**
     * Transform the given string from kebab-case to camelCase.
     * @param {string} value The value to transform.
     * @returns {string} Returns the transformed value.
     */
    function toCamelCase(value) {
        return value.replace(REGEXP_KEBAB_CASE, (substring) => substring.slice(1).toUpperCase());
    }
    const REGEXP_SPACES = /\s\s*/;
    /**
     * Remove event listener from the event target.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener}
     * @param {EventTarget} target The target of the event.
     * @param {string} types The types of the event.
     * @param {EventListenerOrEventListenerObject} listener The listener of the event.
     * @param {EventListenerOptions} [options] The options specify characteristics about the event listener.
     */
    function off(target, types, listener, options) {
        types.trim().split(REGEXP_SPACES).forEach((type) => {
            target.removeEventListener(type, listener, options);
        });
    }
    /**
     * Add event listener to the event target.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener}
     * @param {EventTarget} target The target of the event.
     * @param {string} types The types of the event.
     * @param {EventListenerOrEventListenerObject} listener The listener of the event.
     * @param {AddEventListenerOptions} [options] The options specify characteristics about the event listener.
     */
    function on(target, types, listener, options) {
        types.trim().split(REGEXP_SPACES).forEach((type) => {
            target.addEventListener(type, listener, options);
        });
    }
    /**
     * Add once event listener to the event target.
     * @param {EventTarget} target The target of the event.
     * @param {string} types The types of the event.
     * @param {EventListenerOrEventListenerObject} listener The listener of the event.
     * @param {AddEventListenerOptions} [options] The options specify characteristics about the event listener.
     */
    function once(target, types, listener, options) {
        on(target, types, listener, Object.assign(Object.assign({}, options), { once: true }));
    }
    const defaultEventOptions = {
        bubbles: true,
        cancelable: true,
        composed: true,
    };
    /**
     * Dispatch event on the event target.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent}
     * @param {EventTarget} target The target of the event.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    function emit(target, type, detail, options) {
        return target.dispatchEvent(new CustomEvent(type, Object.assign(Object.assign(Object.assign({}, defaultEventOptions), { detail }), options)));
    }
    const resolvedPromise = Promise.resolve();
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {*} [context] The `this` context.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    function nextTick(context, callback) {
        return callback
            ? resolvedPromise.then(context ? callback.bind(context) : callback)
            : resolvedPromise;
    }
    /**
     * Get the offset base on the document.
     * @param {Element} element The target element.
     * @returns {object} The offset data.
     */
    function getOffset(element) {
        const { documentElement } = element.ownerDocument;
        const box = element.getBoundingClientRect();
        return {
            left: box.left + (WINDOW.pageXOffset - documentElement.clientLeft),
            top: box.top + (WINDOW.pageYOffset - documentElement.clientTop),
        };
    }
    const REGEXP_ANGLE_UNIT = /deg|g?rad|turn$/i;
    /**
     * Convert an angle to a radian number.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/angle}
     * @param {number|string} angle The angle to convert.
     * @returns {number} Returns the radian number.
     */
    function toAngleInRadian(angle) {
        const value = parseFloat(angle) || 0;
        if (value !== 0) {
            const [unit = 'rad'] = String(angle).match(REGEXP_ANGLE_UNIT) || [];
            switch (unit.toLowerCase()) {
                case 'deg':
                    return (value / 360) * (Math.PI * 2);
                case 'grad':
                    return (value / 400) * (Math.PI * 2);
                case 'turn':
                    return value * (Math.PI * 2);
            }
        }
        return value;
    }
    const SIZE_ADJUSTMENT_TYPE_CONTAIN = 'contain';
    const SIZE_ADJUSTMENT_TYPE_COVER = 'cover';
    /**
     * Get the max sizes in a rectangle under the given aspect ratio.
     * @param {object} data The original sizes.
     * @param {string} [type] The adjust type.
     * @returns {object} Returns the result sizes.
     */
    function getAdjustedSizes(data, type = SIZE_ADJUSTMENT_TYPE_CONTAIN) {
        const { aspectRatio } = data;
        let { width, height } = data;
        const isValidWidth = isPositiveNumber(width);
        const isValidHeight = isPositiveNumber(height);
        if (isValidWidth && isValidHeight) {
            const adjustedWidth = height * aspectRatio;
            if ((type === SIZE_ADJUSTMENT_TYPE_CONTAIN && adjustedWidth > width)
                || (type === SIZE_ADJUSTMENT_TYPE_COVER && adjustedWidth < width)) {
                height = width / aspectRatio;
            }
            else {
                width = height * aspectRatio;
            }
        }
        else if (isValidWidth) {
            height = width / aspectRatio;
        }
        else if (isValidHeight) {
            width = height * aspectRatio;
        }
        return {
            width,
            height,
        };
    }
    /**
     * Multiply multiple matrices.
     * @param {Array} matrix The first matrix.
     * @param {Array} args The rest matrices.
     * @returns {Array} Returns the result matrix.
     */
    function multiplyMatrices(matrix, ...args) {
        if (args.length === 0) {
            return matrix;
        }
        const [a1, b1, c1, d1, e1, f1] = matrix;
        const [a2, b2, c2, d2, e2, f2] = args[0];
        // ┌ a1 c1 e1 ┐   ┌ a2 c2 e2 ┐
        // │ b1 d1 f1 │ × │ b2 d2 f2 │
        // └ 0  0  1  ┘   └ 0  0  1  ┘
        matrix = [
            a1 * a2 + c1 * b2 /* + e1 * 0 */,
            b1 * a2 + d1 * b2 /* + f1 * 0 */,
            a1 * c2 + c1 * d2 /* + e1 * 0 */,
            b1 * c2 + d1 * d2 /* + f1 * 0 */,
            a1 * e2 + c1 * f2 + e1 /* * 1 */,
            b1 * e2 + d1 * f2 + f1 /* * 1 */,
        ];
        return multiplyMatrices(matrix, ...args.slice(1));
    }

    var style$8 = `:host([hidden]){display:none!important}`;

    const REGEXP_SUFFIX = /left|top|width|height/i;
    const DEFAULT_SHADOW_ROOT_MODE = 'open';
    const shadowRoots = new WeakMap();
    const styleSheets = new WeakMap();
    const tagNames = new Map();
    const supportsAdoptedStyleSheets = WINDOW.document && Array.isArray(WINDOW.document.adoptedStyleSheets) && 'replaceSync' in WINDOW.CSSStyleSheet.prototype;
    class CropperElement extends HTMLElement {
        get $sharedStyle() {
            return `${this.themeColor ? `:host{--theme-color: ${this.themeColor};}` : ''}${style$8}`;
        }
        constructor() {
            var _a, _b;
            super();
            this.shadowRootMode = DEFAULT_SHADOW_ROOT_MODE;
            this.slottable = true;
            const name = (_b = (_a = Object.getPrototypeOf(this)) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.$name;
            if (name) {
                tagNames.set(name, this.tagName.toLowerCase());
            }
        }
        static get observedAttributes() {
            return [
                'shadow-root-mode',
                'slottable',
                'theme-color',
            ];
        }
        // Convert attribute to property
        attributeChangedCallback(name, oldValue, newValue) {
            if (Object.is(newValue, oldValue)) {
                return;
            }
            const propertyName = toCamelCase(name);
            const oldPropertyValue = this[propertyName];
            let newPropertyValue = newValue;
            switch (typeof oldPropertyValue) {
                case 'boolean':
                    newPropertyValue = newValue !== null && newValue !== 'false';
                    break;
                case 'number':
                    newPropertyValue = Number(newValue);
                    break;
            }
            this[propertyName] = newPropertyValue;
            switch (name) {
                case 'theme-color': {
                    const styleSheet = styleSheets.get(this);
                    const styles = this.$sharedStyle;
                    if (styleSheet && styles) {
                        if (supportsAdoptedStyleSheets) {
                            styleSheet.replaceSync(styles);
                        }
                        else {
                            styleSheet.textContent = styles;
                        }
                    }
                    break;
                }
            }
        }
        // Convert property to attribute
        $propertyChangedCallback(name, oldValue, newValue) {
            if (Object.is(newValue, oldValue)) {
                return;
            }
            name = toKebabCase(name);
            switch (typeof newValue) {
                case 'boolean':
                    if (newValue === true) {
                        if (!this.hasAttribute(name)) {
                            this.setAttribute(name, '');
                        }
                    }
                    else {
                        this.removeAttribute(name);
                    }
                    break;
                case 'number':
                    if (isNaN(newValue)) {
                        newValue = '';
                    }
                    else {
                        newValue = String(newValue);
                    }
                // Fall through
                // case 'string':
                // eslint-disable-next-line no-fallthrough
                default:
                    if (newValue) {
                        if (this.getAttribute(name) !== newValue) {
                            this.setAttribute(name, newValue);
                        }
                    }
                    else {
                        this.removeAttribute(name);
                    }
            }
        }
        connectedCallback() {
            // Observe properties after observed attributes
            Object.getPrototypeOf(this).constructor.observedAttributes.forEach((attribute) => {
                const property = toCamelCase(attribute);
                let value = this[property];
                if (!isUndefined(value)) {
                    this.$propertyChangedCallback(property, undefined, value);
                }
                Object.defineProperty(this, property, {
                    enumerable: true,
                    configurable: true,
                    get() {
                        return value;
                    },
                    set(newValue) {
                        const oldValue = value;
                        value = newValue;
                        this.$propertyChangedCallback(property, oldValue, newValue);
                    },
                });
            });
            const shadow = this.attachShadow({
                mode: this.shadowRootMode || DEFAULT_SHADOW_ROOT_MODE,
            });
            if (!this.shadowRoot) {
                shadowRoots.set(this, shadow);
            }
            styleSheets.set(this, this.$addStyles(this.$sharedStyle));
            if (this.$style) {
                this.$addStyles(this.$style);
            }
            if (this.$template) {
                const template = document.createElement('template');
                template.innerHTML = this.$template;
                shadow.appendChild(template.content);
            }
            if (this.slottable) {
                const slot = document.createElement('slot');
                shadow.appendChild(slot);
            }
        }
        disconnectedCallback() {
            if (styleSheets.has(this)) {
                styleSheets.delete(this);
            }
            if (shadowRoots.has(this)) {
                shadowRoots.delete(this);
            }
        }
        // eslint-disable-next-line class-methods-use-this
        $getTagNameOf(name) {
            var _a;
            return (_a = tagNames.get(name)) !== null && _a !== void 0 ? _a : name;
        }
        $setStyles(properties) {
            Object.keys(properties).forEach((property) => {
                let value = properties[property];
                if (isNumber(value)) {
                    if (value !== 0 && REGEXP_SUFFIX.test(property)) {
                        value = `${value}px`;
                    }
                    else {
                        value = String(value);
                    }
                }
                this.style[property] = value;
            });
            return this;
        }
        /**
         * Outputs the shadow root of the element.
         * @returns {ShadowRoot} Returns the shadow root.
         */
        $getShadowRoot() {
            return this.shadowRoot || shadowRoots.get(this);
        }
        /**
         * Adds styles to the shadow root.
         * @param {string} styles The styles to add.
         * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
         */
        $addStyles(styles) {
            let styleSheet;
            const shadow = this.$getShadowRoot();
            if (supportsAdoptedStyleSheets) {
                styleSheet = new CSSStyleSheet();
                styleSheet.replaceSync(styles);
                shadow.adoptedStyleSheets = shadow.adoptedStyleSheets.concat(styleSheet);
            }
            else {
                styleSheet = document.createElement('style');
                styleSheet.textContent = styles;
                shadow.appendChild(styleSheet);
            }
            return styleSheet;
        }
        /**
         * Dispatches an event at the element.
         * @param {string} type The name of the event.
         * @param {*} [detail] The data passed when initializing the event.
         * @param {CustomEventInit} [options] The other event options.
         * @returns {boolean} Returns the result value.
         */
        $emit(type, detail, options) {
            return emit(this, type, detail, options);
        }
        /**
         * Defers the callback to be executed after the next DOM update cycle.
         * @param {Function} [callback] The callback to execute after the next DOM update cycle.
         * @returns {Promise} A promise that resolves to nothing.
         */
        $nextTick(callback) {
            return nextTick(this, callback);
        }
        /**
         * Defines the constructor as a new custom element.
         * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
         * @param {string|object} [name] The element name.
         * @param {object} [options] The element definition options.
         */
        static $define(name, options) {
            if (isObject(name)) {
                options = name;
                name = '';
            }
            if (!name) {
                name = this.$name || this.name;
            }
            name = toKebabCase(name);
            if (IS_BROWSER && WINDOW.customElements && !WINDOW.customElements.get(name)) {
                customElements.define(name, this, options);
            }
        }
    }
    CropperElement.$version = '2.0.0';

    var style$7 = `:host{display:block;min-height:100px;min-width:200px;overflow:hidden;position:relative;touch-action:none;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}:host([background]){background-color:#fff;background-image:repeating-linear-gradient(45deg,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc),repeating-linear-gradient(45deg,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc);background-image:repeating-conic-gradient(#ccc 0 25%,#fff 0 50%);background-position:0 0,.5rem .5rem;background-size:1rem 1rem}:host([disabled]){pointer-events:none}:host([disabled]):after{bottom:0;content:"";cursor:not-allowed;display:block;left:0;pointer-events:none;position:absolute;right:0;top:0}`;

    class CropperCanvas extends CropperElement {
        constructor() {
            super(...arguments);
            this.$onPointerDown = null;
            this.$onPointerMove = null;
            this.$onPointerUp = null;
            this.$onWheel = null;
            this.$wheeling = false;
            this.$pointers = new Map();
            this.$style = style$7;
            this.$action = ACTION_NONE;
            this.background = false;
            this.disabled = false;
            this.scaleStep = 0.1;
            this.themeColor = '#39f';
        }
        static get observedAttributes() {
            return super.observedAttributes.concat([
                'background',
                'disabled',
                'scale-step',
            ]);
        }
        connectedCallback() {
            super.connectedCallback();
            if (!this.disabled) {
                this.$bind();
            }
        }
        disconnectedCallback() {
            if (!this.disabled) {
                this.$unbind();
            }
            super.disconnectedCallback();
        }
        $propertyChangedCallback(name, oldValue, newValue) {
            if (Object.is(newValue, oldValue)) {
                return;
            }
            super.$propertyChangedCallback(name, oldValue, newValue);
            switch (name) {
                case 'disabled':
                    if (newValue) {
                        this.$unbind();
                    }
                    else {
                        this.$bind();
                    }
                    break;
            }
        }
        $bind() {
            if (!this.$onPointerDown) {
                this.$onPointerDown = this.$handlePointerDown.bind(this);
                on(this, EVENT_POINTER_DOWN, this.$onPointerDown);
            }
            if (!this.$onPointerMove) {
                this.$onPointerMove = this.$handlePointerMove.bind(this);
                on(this.ownerDocument, EVENT_POINTER_MOVE, this.$onPointerMove);
            }
            if (!this.$onPointerUp) {
                this.$onPointerUp = this.$handlePointerUp.bind(this);
                on(this.ownerDocument, EVENT_POINTER_UP, this.$onPointerUp);
            }
            if (!this.$onWheel) {
                this.$onWheel = this.$handleWheel.bind(this);
                on(this, EVENT_WHEEL, this.$onWheel, {
                    passive: false,
                    capture: true,
                });
            }
        }
        $unbind() {
            if (this.$onPointerDown) {
                off(this, EVENT_POINTER_DOWN, this.$onPointerDown);
                this.$onPointerDown = null;
            }
            if (this.$onPointerMove) {
                off(this.ownerDocument, EVENT_POINTER_MOVE, this.$onPointerMove);
                this.$onPointerMove = null;
            }
            if (this.$onPointerUp) {
                off(this.ownerDocument, EVENT_POINTER_UP, this.$onPointerUp);
                this.$onPointerUp = null;
            }
            if (this.$onWheel) {
                off(this, EVENT_WHEEL, this.$onWheel, {
                    capture: true,
                });
                this.$onWheel = null;
            }
        }
        $handlePointerDown(event) {
            const { buttons, button, type } = event;
            if (this.disabled || (
            // Handle pointer or mouse event, and ignore touch event
            ((type === 'pointerdown' && event.pointerType === 'mouse') || type === 'mousedown') && (
            // No primary button (Usually the left button)
            (isNumber(buttons) && buttons !== 1) || (isNumber(button) && button !== 0)
                // Open context menu
                || event.ctrlKey))) {
                return;
            }
            const { $pointers } = this;
            let action = '';
            if (event.changedTouches) {
                Array.from(event.changedTouches).forEach(({ identifier, pageX, pageY, }) => {
                    $pointers.set(identifier, {
                        startX: pageX,
                        startY: pageY,
                        endX: pageX,
                        endY: pageY,
                    });
                });
            }
            else {
                const { pointerId = 0, pageX, pageY } = event;
                $pointers.set(pointerId, {
                    startX: pageX,
                    startY: pageY,
                    endX: pageX,
                    endY: pageY,
                });
            }
            if ($pointers.size > 1) {
                action = ACTION_TRANSFORM;
            }
            else if (isElement(event.target)) {
                action = event.target.action || event.target.getAttribute(ATTRIBUTE_ACTION) || '';
            }
            if (this.$emit(EVENT_ACTION_START, {
                action,
                relatedEvent: event,
            }) === false) {
                return;
            }
            // Prevent page zooming in the browsers for iOS.
            event.preventDefault();
            this.$action = action;
            this.style.willChange = 'transform';
        }
        $handlePointerMove(event) {
            const { $action, $pointers } = this;
            if (this.disabled || $action === ACTION_NONE || $pointers.size === 0) {
                return;
            }
            if (this.$emit(EVENT_ACTION_MOVE, {
                action: $action,
                relatedEvent: event,
            }) === false) {
                return;
            }
            // Prevent page scrolling.
            event.preventDefault();
            if (event.changedTouches) {
                Array.from(event.changedTouches).forEach(({ identifier, pageX, pageY, }) => {
                    const pointer = $pointers.get(identifier);
                    if (pointer) {
                        Object.assign(pointer, {
                            endX: pageX,
                            endY: pageY,
                        });
                    }
                });
            }
            else {
                const { pointerId = 0, pageX, pageY } = event;
                const pointer = $pointers.get(pointerId);
                if (pointer) {
                    Object.assign(pointer, {
                        endX: pageX,
                        endY: pageY,
                    });
                }
            }
            const detail = {
                action: $action,
                relatedEvent: event,
            };
            if ($action === ACTION_TRANSFORM) {
                const pointers2 = new Map($pointers);
                let maxRotateRate = 0;
                let maxScaleRate = 0;
                let rotate = 0;
                let scale = 0;
                let centerX = event.pageX;
                let centerY = event.pageY;
                $pointers.forEach((pointer, pointerId) => {
                    pointers2.delete(pointerId);
                    pointers2.forEach((pointer2) => {
                        let x1 = pointer2.startX - pointer.startX;
                        let y1 = pointer2.startY - pointer.startY;
                        let x2 = pointer2.endX - pointer.endX;
                        let y2 = pointer2.endY - pointer.endY;
                        let z1 = 0;
                        let z2 = 0;
                        let a1 = 0;
                        let a2 = 0;
                        if (x1 === 0) {
                            if (y1 < 0) {
                                a1 = Math.PI * 2;
                            }
                            else if (y1 > 0) {
                                a1 = Math.PI;
                            }
                        }
                        else if (x1 > 0) {
                            a1 = (Math.PI / 2) + Math.atan(y1 / x1);
                        }
                        else if (x1 < 0) {
                            a1 = (Math.PI * 1.5) + Math.atan(y1 / x1);
                        }
                        if (x2 === 0) {
                            if (y2 < 0) {
                                a2 = Math.PI * 2;
                            }
                            else if (y2 > 0) {
                                a2 = Math.PI;
                            }
                        }
                        else if (x2 > 0) {
                            a2 = (Math.PI / 2) + Math.atan(y2 / x2);
                        }
                        else if (x2 < 0) {
                            a2 = (Math.PI * 1.5) + Math.atan(y2 / x2);
                        }
                        if (a2 > 0 || a1 > 0) {
                            const rotateRate = a2 - a1;
                            const absRotateRate = Math.abs(rotateRate);
                            if (absRotateRate > maxRotateRate) {
                                maxRotateRate = absRotateRate;
                                rotate = rotateRate;
                                centerX = (pointer.startX + pointer2.startX) / 2;
                                centerY = (pointer.startY + pointer2.startY) / 2;
                            }
                        }
                        x1 = Math.abs(x1);
                        y1 = Math.abs(y1);
                        x2 = Math.abs(x2);
                        y2 = Math.abs(y2);
                        if (x1 > 0 && y1 > 0) {
                            z1 = Math.sqrt((x1 * x1) + (y1 * y1));
                        }
                        else if (x1 > 0) {
                            z1 = x1;
                        }
                        else if (y1 > 0) {
                            z1 = y1;
                        }
                        if (x2 > 0 && y2 > 0) {
                            z2 = Math.sqrt((x2 * x2) + (y2 * y2));
                        }
                        else if (x2 > 0) {
                            z2 = x2;
                        }
                        else if (y2 > 0) {
                            z2 = y2;
                        }
                        if (z1 > 0 && z2 > 0) {
                            const scaleRate = (z2 - z1) / z1;
                            const absScaleRate = Math.abs(scaleRate);
                            if (absScaleRate > maxScaleRate) {
                                maxScaleRate = absScaleRate;
                                scale = scaleRate;
                                centerX = (pointer.startX + pointer2.startX) / 2;
                                centerY = (pointer.startY + pointer2.startY) / 2;
                            }
                        }
                    });
                });
                const rotatable = maxRotateRate > 0;
                const scalable = maxScaleRate > 0;
                if (rotatable && scalable) {
                    detail.rotate = rotate;
                    detail.scale = scale;
                    detail.centerX = centerX;
                    detail.centerY = centerY;
                }
                else if (rotatable) {
                    detail.action = ACTION_ROTATE;
                    detail.rotate = rotate;
                    detail.centerX = centerX;
                    detail.centerY = centerY;
                }
                else if (scalable) {
                    detail.action = ACTION_SCALE;
                    detail.scale = scale;
                    detail.centerX = centerX;
                    detail.centerY = centerY;
                }
                else {
                    detail.action = ACTION_NONE;
                }
            }
            else {
                const [pointer] = Array.from($pointers.values());
                Object.assign(detail, pointer);
            }
            // Override the starting coordinate
            $pointers.forEach((pointer) => {
                pointer.startX = pointer.endX;
                pointer.startY = pointer.endY;
            });
            if (detail.action !== ACTION_NONE) {
                this.$emit(EVENT_ACTION, detail, {
                    cancelable: false,
                });
            }
        }
        $handlePointerUp(event) {
            const { $action, $pointers } = this;
            if (this.disabled || $action === ACTION_NONE) {
                return;
            }
            if (this.$emit(EVENT_ACTION_END, {
                action: $action,
                relatedEvent: event,
            }) === false) {
                return;
            }
            event.preventDefault();
            if (event.changedTouches) {
                Array.from(event.changedTouches).forEach(({ identifier, }) => {
                    $pointers.delete(identifier);
                });
            }
            else {
                const { pointerId = 0 } = event;
                $pointers.delete(pointerId);
            }
            if ($pointers.size === 0) {
                this.style.willChange = '';
                this.$action = ACTION_NONE;
            }
        }
        $handleWheel(event) {
            if (this.disabled) {
                return;
            }
            event.preventDefault();
            // Limit wheel speed to prevent zoom too fast (#21)
            if (this.$wheeling) {
                return;
            }
            this.$wheeling = true;
            // Debounce by 50ms
            setTimeout(() => {
                this.$wheeling = false;
            }, 50);
            const delta = event.deltaY > 0 ? -1 : 1;
            const scale = delta * this.scaleStep;
            this.$emit(EVENT_ACTION, {
                action: ACTION_SCALE,
                scale,
                relatedEvent: event,
            }, {
                cancelable: false,
            });
        }
        /**
         * Changes the current action to a new one.
         * @param {string} action The new action.
         * @returns {CropperCanvas} Returns `this` for chaining.
         */
        $setAction(action) {
            if (isString(action)) {
                this.$action = action;
            }
            return this;
        }
        /**
         * Generates a real canvas element, with the image draw into if there is one.
         * @param {object} [options] The available options.
         * @param {number} [options.width] The width of the canvas.
         * @param {number} [options.height] The height of the canvas.
         * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
         * @returns {Promise} Returns a promise that resolves to the generated canvas element.
         */
        $toCanvas(options) {
            return new Promise((resolve, reject) => {
                if (!this.isConnected) {
                    reject(new Error('The current element is not connected to the DOM.'));
                    return;
                }
                const canvas = document.createElement('canvas');
                let width = this.offsetWidth;
                let height = this.offsetHeight;
                let scale = 1;
                if (isPlainObject(options)
                    && (isPositiveNumber(options.width) || isPositiveNumber(options.height))) {
                    ({ width, height } = getAdjustedSizes({
                        aspectRatio: width / height,
                        width: options.width,
                        height: options.height,
                    }));
                    scale = width / this.offsetWidth;
                }
                canvas.width = width;
                canvas.height = height;
                const cropperImage = this.querySelector(this.$getTagNameOf(CROPPER_IMAGE));
                if (!cropperImage) {
                    resolve(canvas);
                    return;
                }
                cropperImage.$ready().then((image) => {
                    const context = canvas.getContext('2d');
                    if (context) {
                        const [a, b, c, d, e, f] = cropperImage.$getTransform();
                        let newE = e;
                        let newF = f;
                        let destWidth = image.naturalWidth;
                        let destHeight = image.naturalHeight;
                        if (scale !== 1) {
                            newE *= scale;
                            newF *= scale;
                            destWidth *= scale;
                            destHeight *= scale;
                        }
                        const centerX = destWidth / 2;
                        const centerY = destHeight / 2;
                        context.fillStyle = 'transparent';
                        context.fillRect(0, 0, width, height);
                        if (isPlainObject(options) && isFunction(options.beforeDraw)) {
                            options.beforeDraw.call(this, context, canvas);
                        }
                        context.save();
                        // Move the transform origin to the center of the image.
                        // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
                        context.translate(centerX, centerY);
                        context.transform(a, b, c, d, newE, newF);
                        // Reset the transform origin to the top-left of the image.
                        context.translate(-centerX, -centerY);
                        context.drawImage(image, 0, 0, destWidth, destHeight);
                        context.restore();
                    }
                    resolve(canvas);
                }).catch(reject);
            });
        }
    }
    CropperCanvas.$name = CROPPER_CANVAS;
    CropperCanvas.$version = '2.0.0';

    var style$6 = `:host{display:inline-block}img{display:block;height:100%;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}`;

    const canvasCache$3 = new WeakMap();
    const NATIVE_ATTRIBUTES = [
        'alt',
        'crossorigin',
        'decoding',
        'importance',
        'loading',
        'referrerpolicy',
        'sizes',
        'src',
        'srcset',
    ];
    class CropperImage extends CropperElement {
        constructor() {
            super(...arguments);
            this.$matrix = [1, 0, 0, 1, 0, 0];
            this.$onLoad = null;
            this.$onCanvasAction = null;
            this.$onCanvasActionEnd = null;
            this.$onCanvasActionStart = null;
            this.$actionStartTarget = null;
            this.$style = style$6;
            this.$image = new Image();
            this.initialCenterSize = 'contain';
            this.rotatable = false;
            this.scalable = false;
            this.skewable = false;
            this.slottable = false;
            this.translatable = false;
        }
        set $canvas(element) {
            canvasCache$3.set(this, element);
        }
        get $canvas() {
            return canvasCache$3.get(this);
        }
        static get observedAttributes() {
            return super.observedAttributes.concat(NATIVE_ATTRIBUTES, [
                'initial-center-size',
                'rotatable',
                'scalable',
                'skewable',
                'translatable',
            ]);
        }
        attributeChangedCallback(name, oldValue, newValue) {
            if (Object.is(newValue, oldValue)) {
                return;
            }
            super.attributeChangedCallback(name, oldValue, newValue);
            // Inherits the native attributes
            if (NATIVE_ATTRIBUTES.includes(name)) {
                this.$image.setAttribute(name, newValue);
            }
        }
        $propertyChangedCallback(name, oldValue, newValue) {
            if (Object.is(newValue, oldValue)) {
                return;
            }
            super.$propertyChangedCallback(name, oldValue, newValue);
            switch (name) {
                case 'initialCenterSize':
                    this.$nextTick(() => {
                        this.$center(newValue);
                    });
                    break;
            }
        }
        connectedCallback() {
            super.connectedCallback();
            const { $image } = this;
            const $canvas = this.closest(this.$getTagNameOf(CROPPER_CANVAS));
            if ($canvas) {
                this.$canvas = $canvas;
                this.$setStyles({
                    // Make it a block element to avoid side effects (#1074).
                    display: 'block',
                    position: 'absolute',
                });
                this.$onCanvasActionStart = (event) => {
                    var _a, _b;
                    this.$actionStartTarget = (_b = (_a = event.detail) === null || _a === void 0 ? void 0 : _a.relatedEvent) === null || _b === void 0 ? void 0 : _b.target;
                };
                this.$onCanvasActionEnd = () => {
                    this.$actionStartTarget = null;
                };
                this.$onCanvasAction = this.$handleAction.bind(this);
                on($canvas, EVENT_ACTION_START, this.$onCanvasActionStart);
                on($canvas, EVENT_ACTION_END, this.$onCanvasActionEnd);
                on($canvas, EVENT_ACTION, this.$onCanvasAction);
            }
            this.$onLoad = this.$handleLoad.bind(this);
            on($image, EVENT_LOAD, this.$onLoad);
            this.$getShadowRoot().appendChild($image);
        }
        disconnectedCallback() {
            const { $image, $canvas } = this;
            if ($canvas) {
                if (this.$onCanvasActionStart) {
                    off($canvas, EVENT_ACTION_START, this.$onCanvasActionStart);
                    this.$onCanvasActionStart = null;
                }
                if (this.$onCanvasActionEnd) {
                    off($canvas, EVENT_ACTION_END, this.$onCanvasActionEnd);
                    this.$onCanvasActionEnd = null;
                }
                if (this.$onCanvasAction) {
                    off($canvas, EVENT_ACTION, this.$onCanvasAction);
                    this.$onCanvasAction = null;
                }
            }
            if ($image && this.$onLoad) {
                off($image, EVENT_LOAD, this.$onLoad);
                this.$onLoad = null;
            }
            this.$getShadowRoot().removeChild($image);
            super.disconnectedCallback();
        }
        $handleLoad() {
            const { $image } = this;
            this.$setStyles({
                width: $image.naturalWidth,
                height: $image.naturalHeight,
            });
            if (this.$canvas) {
                this.$center(this.initialCenterSize);
            }
        }
        $handleAction(event) {
            if (this.hidden || !(this.rotatable || this.scalable || this.translatable)) {
                return;
            }
            const { $canvas } = this;
            const { detail } = event;
            if (detail) {
                const { relatedEvent } = detail;
                let { action } = detail;
                if (action === ACTION_TRANSFORM && (!this.rotatable || !this.scalable)) {
                    if (this.rotatable) {
                        action = ACTION_ROTATE;
                    }
                    else if (this.scalable) {
                        action = ACTION_SCALE;
                    }
                    else {
                        action = ACTION_NONE;
                    }
                }
                switch (action) {
                    case ACTION_MOVE:
                        if (this.translatable) {
                            let $selection = null;
                            if (relatedEvent) {
                                $selection = relatedEvent.target.closest(this.$getTagNameOf(CROPPER_SELECTION));
                            }
                            if (!$selection) {
                                $selection = $canvas.querySelector(this.$getTagNameOf(CROPPER_SELECTION));
                            }
                            if ($selection && $selection.multiple && !$selection.active) {
                                $selection = $canvas.querySelector(`${this.$getTagNameOf(CROPPER_SELECTION)}[active]`);
                            }
                            if (!$selection || $selection.hidden || !$selection.movable || $selection.dynamic
                                || !(this.$actionStartTarget && $selection.contains(this.$actionStartTarget))) {
                                this.$move(detail.endX - detail.startX, detail.endY - detail.startY);
                            }
                        }
                        break;
                    case ACTION_ROTATE:
                        if (this.rotatable) {
                            if (relatedEvent) {
                                const { x, y } = this.getBoundingClientRect();
                                this.$rotate(detail.rotate, relatedEvent.clientX - x, relatedEvent.clientY - y);
                            }
                            else {
                                this.$rotate(detail.rotate);
                            }
                        }
                        break;
                    case ACTION_SCALE:
                        if (this.scalable) {
                            if (relatedEvent) {
                                const $selection = relatedEvent.target.closest(this.$getTagNameOf(CROPPER_SELECTION));
                                if (!$selection
                                    || !$selection.zoomable
                                    || ($selection.zoomable && $selection.dynamic)) {
                                    const { x, y } = this.getBoundingClientRect();
                                    this.$zoom(detail.scale, relatedEvent.clientX - x, relatedEvent.clientY - y);
                                }
                            }
                            else {
                                this.$zoom(detail.scale);
                            }
                        }
                        break;
                    case ACTION_TRANSFORM:
                        if (this.rotatable && this.scalable) {
                            const { rotate } = detail;
                            let { scale } = detail;
                            if (scale < 0) {
                                scale = 1 / (1 - scale);
                            }
                            else {
                                scale += 1;
                            }
                            const cos = Math.cos(rotate);
                            const sin = Math.sin(rotate);
                            const [scaleX, skewY, skewX, scaleY] = [
                                cos * scale,
                                sin * scale,
                                -sin * scale,
                                cos * scale,
                            ];
                            if (relatedEvent) {
                                const clientRect = this.getBoundingClientRect();
                                const x = relatedEvent.clientX - clientRect.x;
                                const y = relatedEvent.clientY - clientRect.y;
                                const [a, b, c, d] = this.$matrix;
                                const originX = clientRect.width / 2;
                                const originY = clientRect.height / 2;
                                const moveX = x - originX;
                                const moveY = y - originY;
                                const translateX = ((moveX * d) - (c * moveY)) / ((a * d) - (c * b));
                                const translateY = ((moveY * a) - (b * moveX)) / ((a * d) - (c * b));
                                /**
                                 * Equals to
                                 * this.$rotate(rotate, x, y);
                                 * this.$scale(scale, x, y);
                                 */
                                this.$transform(scaleX, skewY, skewX, scaleY, translateX * (1 - scaleX) + translateY * skewX, translateY * (1 - scaleY) + translateX * skewY);
                            }
                            else {
                                /**
                                 * Equals to
                                 * this.$rotate(rotate);
                                 * this.$scale(scale);
                                 */
                                this.$transform(scaleX, skewY, skewX, scaleY, 0, 0);
                            }
                        }
                        break;
                }
            }
        }
        /**
         * Defers the callback to execute after successfully loading the image.
         * @param {Function} [callback] The callback to execute after successfully loading the image.
         * @returns {Promise} Returns a promise that resolves to the image element.
         */
        $ready(callback) {
            const { $image } = this;
            const promise = new Promise((resolve, reject) => {
                const error = new Error('Failed to load the image source');
                if ($image.complete) {
                    if ($image.naturalWidth > 0 && $image.naturalHeight > 0) {
                        resolve($image);
                    }
                    else {
                        reject(error);
                    }
                }
                else {
                    const onLoad = () => {
                        // eslint-disable-next-line @typescript-eslint/no-use-before-define
                        off($image, EVENT_ERROR, onError);
                        resolve($image);
                    };
                    const onError = () => {
                        off($image, EVENT_LOAD, onLoad);
                        reject(error);
                    };
                    once($image, EVENT_LOAD, onLoad);
                    once($image, EVENT_ERROR, onError);
                }
            });
            if (isFunction(callback)) {
                promise.then((image) => {
                    callback(image);
                    return image;
                });
            }
            return promise;
        }
        /**
         * Aligns the image to the center of its parent element.
         * @param {string} [size] The size of the image.
         * @returns {CropperImage} Returns `this` for chaining.
         */
        $center(size) {
            const { parentElement } = this;
            if (!parentElement) {
                return this;
            }
            const container = parentElement.getBoundingClientRect();
            const containerWidth = container.width;
            const containerHeight = container.height;
            const { x, y, width, height, } = this.getBoundingClientRect();
            const startX = x + (width / 2);
            const startY = y + (height / 2);
            const endX = container.x + (containerWidth / 2);
            const endY = container.y + (containerHeight / 2);
            this.$move(endX - startX, endY - startY);
            if (size && (width !== containerWidth || height !== containerHeight)) {
                const scaleX = containerWidth / width;
                const scaleY = containerHeight / height;
                switch (size) {
                    case 'cover':
                        this.$scale(Math.max(scaleX, scaleY));
                        break;
                    case 'contain':
                        this.$scale(Math.min(scaleX, scaleY));
                        break;
                }
            }
            return this;
        }
        /**
         * Moves the image.
         * @param {number} x The moving distance in the horizontal direction.
         * @param {number} [y] The moving distance in the vertical direction.
         * @returns {CropperImage} Returns `this` for chaining.
         */
        $move(x, y = x) {
            if (this.translatable && isNumber(x) && isNumber(y)) {
                const [a, b, c, d] = this.$matrix;
                const e = ((x * d) - (c * y)) / ((a * d) - (c * b));
                const f = ((y * a) - (b * x)) / ((a * d) - (c * b));
                this.$translate(e, f);
            }
            return this;
        }
        /**
         * Moves the image to a specific position.
         * @param {number} x The new position in the horizontal direction.
         * @param {number} [y] The new position in the vertical direction.
         * @returns {CropperImage} Returns `this` for chaining.
         */
        $moveTo(x, y = x) {
            if (this.translatable && isNumber(x) && isNumber(y)) {
                const [a, b, c, d] = this.$matrix;
                const e = ((x * d) - (c * y)) / ((a * d) - (c * b));
                const f = ((y * a) - (b * x)) / ((a * d) - (c * b));
                this.$setTransform(a, b, c, d, e, f);
            }
            return this;
        }
        /**
         * Rotates the image.
         * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate}
         * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate}
         * @param {number|string} angle The rotation angle (in radians).
         * @param {number} [x] The rotation origin in the horizontal, defaults to the center of the image.
         * @param {number} [y] The rotation origin in the vertical, defaults to the center of the image.
         * @returns {CropperImage} Returns `this` for chaining.
         */
        $rotate(angle, x, y) {
            if (this.rotatable) {
                const radian = toAngleInRadian(angle);
                const cos = Math.cos(radian);
                const sin = Math.sin(radian);
                const [scaleX, skewY, skewX, scaleY] = [cos, sin, -sin, cos];
                if (isNumber(x) && isNumber(y)) {
                    const [a, b, c, d] = this.$matrix;
                    const { width, height } = this.getBoundingClientRect();
                    const originX = width / 2;
                    const originY = height / 2;
                    const moveX = x - originX;
                    const moveY = y - originY;
                    const translateX = ((moveX * d) - (c * moveY)) / ((a * d) - (c * b));
                    const translateY = ((moveY * a) - (b * moveX)) / ((a * d) - (c * b));
                    /**
                     * Equals to
                     * this.$translate(translateX, translateX);
                     * this.$rotate(angle);
                     * this.$translate(-translateX, -translateX);
                     */
                    this.$transform(scaleX, skewY, skewX, scaleY, translateX * (1 - scaleX) - translateY * skewX, translateY * (1 - scaleY) - translateX * skewY);
                }
                else {
                    this.$transform(scaleX, skewY, skewX, scaleY, 0, 0);
                }
            }
            return this;
        }
        /**
         * Zooms the image.
         * @param {number} scale The zoom factor. Positive numbers for zooming in, and negative numbers for zooming out.
         * @param {number} [x] The zoom origin in the horizontal, defaults to the center of the image.
         * @param {number} [y] The zoom origin in the vertical, defaults to the center of the image.
         * @returns {CropperImage} Returns `this` for chaining.
         */
        $zoom(scale, x, y) {
            if (!this.scalable || scale === 0) {
                return this;
            }
            if (scale < 0) {
                scale = 1 / (1 - scale);
            }
            else {
                scale += 1;
            }
            if (isNumber(x) && isNumber(y)) {
                const [a, b, c, d] = this.$matrix;
                const { width, height } = this.getBoundingClientRect();
                const originX = width / 2;
                const originY = height / 2;
                const moveX = x - originX;
                const moveY = y - originY;
                const translateX = ((moveX * d) - (c * moveY)) / ((a * d) - (c * b));
                const translateY = ((moveY * a) - (b * moveX)) / ((a * d) - (c * b));
                /**
                 * Equals to
                 * this.$translate(translateX, translateX);
                 * this.$scale(scale);
                 * this.$translate(-translateX, -translateX);
                 */
                this.$transform(scale, 0, 0, scale, translateX * (1 - scale), translateY * (1 - scale));
            }
            else {
                this.$scale(scale);
            }
            return this;
        }
        /**
         * Scales the image.
         * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale}
         * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale}
         * @param {number} x The scaling factor in the horizontal direction.
         * @param {number} [y] The scaling factor in the vertical direction.
         * @returns {CropperImage} Returns `this` for chaining.
         */
        $scale(x, y = x) {
            if (this.scalable) {
                this.$transform(x, 0, 0, y, 0, 0);
            }
            return this;
        }
        /**
         * Skews the image.
         * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew}
         * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform}
         * @param {number|string} x The skewing angle in the horizontal direction.
         * @param {number|string} [y] The skewing angle in the vertical direction.
         * @returns {CropperImage} Returns `this` for chaining.
         */
        $skew(x, y = 0) {
            if (this.skewable) {
                const radianX = toAngleInRadian(x);
                const radianY = toAngleInRadian(y);
                this.$transform(1, Math.tan(radianY), Math.tan(radianX), 1, 0, 0);
            }
            return this;
        }
        /**
         * Translates the image.
         * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate}
         * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate}
         * @param {number} x The translating distance in the horizontal direction.
         * @param {number} [y] The translating distance in the vertical direction.
         * @returns {CropperImage} Returns `this` for chaining.
         */
        $translate(x, y = x) {
            if (this.translatable && isNumber(x) && isNumber(y)) {
                this.$transform(1, 0, 0, 1, x, y);
            }
            return this;
        }
        /**
         * Transforms the image.
         * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix}
         * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform}
         * @param {number} a The scaling factor in the horizontal direction.
         * @param {number} b The skewing angle in the vertical direction.
         * @param {number} c The skewing angle in the horizontal direction.
         * @param {number} d The scaling factor in the vertical direction.
         * @param {number} e The translating distance in the horizontal direction.
         * @param {number} f The translating distance in the vertical direction.
         * @returns {CropperImage} Returns `this` for chaining.
         */
        $transform(a, b, c, d, e, f) {
            if (isNumber(a)
                && isNumber(b)
                && isNumber(c)
                && isNumber(d)
                && isNumber(e)
                && isNumber(f)) {
                return this.$setTransform(multiplyMatrices(this.$matrix, [a, b, c, d, e, f]));
            }
            return this;
        }
        /**
         * Resets (overrides) the current transform to the specific identity matrix.
         * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform}
         * @param {number|Array} a The scaling factor in the horizontal direction.
         * @param {number} b The skewing angle in the vertical direction.
         * @param {number} c The skewing angle in the horizontal direction.
         * @param {number} d The scaling factor in the vertical direction.
         * @param {number} e The translating distance in the horizontal direction.
         * @param {number} f The translating distance in the vertical direction.
         * @returns {CropperImage} Returns `this` for chaining.
         */
        $setTransform(a, b, c, d, e, f) {
            if (this.rotatable || this.scalable || this.skewable || this.translatable) {
                if (Array.isArray(a)) {
                    [a, b, c, d, e, f] = a;
                }
                if (isNumber(a)
                    && isNumber(b)
                    && isNumber(c)
                    && isNumber(d)
                    && isNumber(e)
                    && isNumber(f)) {
                    const oldMatrix = [...this.$matrix];
                    const newMatrix = [a, b, c, d, e, f];
                    if (this.$emit(EVENT_TRANSFORM, {
                        matrix: newMatrix,
                        oldMatrix,
                    }) === false) {
                        return this;
                    }
                    this.$matrix = newMatrix;
                    this.style.transform = `matrix(${newMatrix.join(', ')})`;
                }
            }
            return this;
        }
        /**
         * Retrieves the current transformation matrix being applied to the element.
         * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getTransform}
         * @returns {Array} Returns the readonly transformation matrix.
         */
        $getTransform() {
            return this.$matrix.slice();
        }
        /**
         * Resets the current transform to the initial identity matrix.
         * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/resetTransform}
         * @returns {CropperImage} Returns `this` for chaining.
         */
        $resetTransform() {
            return this.$setTransform([1, 0, 0, 1, 0, 0]);
        }
    }
    CropperImage.$name = CROPPER_IMAGE;
    CropperImage.$version = '2.0.0';

    var style$5 = `:host{display:block;height:0;left:0;outline:var(--theme-color) solid 1px;position:relative;top:0;width:0}:host([transparent]){outline-color:transparent}`;

    const canvasCache$2 = new WeakMap();
    class CropperShade extends CropperElement {
        constructor() {
            super(...arguments);
            this.$onCanvasChange = null;
            this.$onCanvasActionEnd = null;
            this.$onCanvasActionStart = null;
            this.$style = style$5;
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.slottable = false;
            this.themeColor = 'rgba(0, 0, 0, 0.65)';
        }
        set $canvas(element) {
            canvasCache$2.set(this, element);
        }
        get $canvas() {
            return canvasCache$2.get(this);
        }
        static get observedAttributes() {
            return super.observedAttributes.concat([
                'height',
                'width',
                'x',
                'y',
            ]);
        }
        connectedCallback() {
            super.connectedCallback();
            const $canvas = this.closest(this.$getTagNameOf(CROPPER_CANVAS));
            if ($canvas) {
                this.$canvas = $canvas;
                this.style.position = 'absolute';
                const $selection = $canvas.querySelector(this.$getTagNameOf(CROPPER_SELECTION));
                if ($selection) {
                    this.$onCanvasActionStart = (event) => {
                        if ($selection.hidden && event.detail.action === ACTION_SELECT) {
                            this.hidden = false;
                        }
                    };
                    this.$onCanvasActionEnd = (event) => {
                        if ($selection.hidden && event.detail.action === ACTION_SELECT) {
                            this.hidden = true;
                        }
                    };
                    this.$onCanvasChange = (event) => {
                        const { x, y, width, height, } = event.detail;
                        this.$change(x, y, width, height);
                        if ($selection.hidden || (x === 0 && y === 0 && width === 0 && height === 0)) {
                            this.hidden = true;
                        }
                    };
                    on($canvas, EVENT_ACTION_START, this.$onCanvasActionStart);
                    on($canvas, EVENT_ACTION_END, this.$onCanvasActionEnd);
                    on($canvas, EVENT_CHANGE, this.$onCanvasChange);
                }
            }
            this.$render();
        }
        disconnectedCallback() {
            const { $canvas } = this;
            if ($canvas) {
                if (this.$onCanvasActionStart) {
                    off($canvas, EVENT_ACTION_START, this.$onCanvasActionStart);
                    this.$onCanvasActionStart = null;
                }
                if (this.$onCanvasActionEnd) {
                    off($canvas, EVENT_ACTION_END, this.$onCanvasActionEnd);
                    this.$onCanvasActionEnd = null;
                }
                if (this.$onCanvasChange) {
                    off($canvas, EVENT_CHANGE, this.$onCanvasChange);
                    this.$onCanvasChange = null;
                }
            }
            super.disconnectedCallback();
        }
        /**
         * Changes the position and/or size of the shade.
         * @param {number} x The new position in the horizontal direction.
         * @param {number} y The new position in the vertical direction.
         * @param {number} [width] The new width.
         * @param {number} [height] The new height.
         * @returns {CropperShade} Returns `this` for chaining.
         */
        $change(x, y, width = this.width, height = this.height) {
            if (!isNumber(x)
                || !isNumber(y)
                || !isNumber(width)
                || !isNumber(height)
                || (x === this.x && y === this.y && width === this.width && height === this.height)) {
                return this;
            }
            if (this.hidden) {
                this.hidden = false;
            }
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            return this.$render();
        }
        /**
         * Resets the shade to its initial position and size.
         * @returns {CropperShade} Returns `this` for chaining.
         */
        $reset() {
            return this.$change(0, 0, 0, 0);
        }
        /**
         * Refreshes the position or size of the shade.
         * @returns {CropperShade} Returns `this` for chaining.
         */
        $render() {
            return this.$setStyles({
                transform: `translate(${this.x}px, ${this.y}px)`,
                width: this.width,
                height: this.height,
                outlineWidth: WINDOW.innerWidth,
            });
        }
    }
    CropperShade.$name = CROPPER_SHADE;
    CropperShade.$version = '2.0.0';

    var style$4 = `:host{background-color:var(--theme-color);display:block}:host([action=move]),:host([action=select]){height:100%;left:0;position:absolute;top:0;width:100%}:host([action=move]){cursor:move}:host([action=select]){cursor:crosshair}:host([action$=-resize]){background-color:transparent;height:15px;position:absolute;width:15px}:host([action$=-resize]):after{background-color:var(--theme-color);content:"";display:block;height:5px;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:5px}:host([action=n-resize]),:host([action=s-resize]){cursor:ns-resize;left:50%;transform:translateX(-50%);width:100%}:host([action=n-resize]){top:-8px}:host([action=s-resize]){bottom:-8px}:host([action=e-resize]),:host([action=w-resize]){cursor:ew-resize;height:100%;top:50%;transform:translateY(-50%)}:host([action=e-resize]){right:-8px}:host([action=w-resize]){left:-8px}:host([action=ne-resize]){cursor:nesw-resize;right:-8px;top:-8px}:host([action=nw-resize]){cursor:nwse-resize;left:-8px;top:-8px}:host([action=se-resize]){bottom:-8px;cursor:nwse-resize;right:-8px}:host([action=se-resize]):after{height:15px;width:15px}@media (pointer:coarse){:host([action=se-resize]):after{height:10px;width:10px}}@media (pointer:fine){:host([action=se-resize]):after{height:5px;width:5px}}:host([action=sw-resize]){bottom:-8px;cursor:nesw-resize;left:-8px}:host([plain]){background-color:transparent}`;

    class CropperHandle extends CropperElement {
        constructor() {
            super(...arguments);
            this.$onCanvasCropEnd = null;
            this.$onCanvasCropStart = null;
            this.$style = style$4;
            this.action = ACTION_NONE;
            this.plain = false;
            this.slottable = false;
            this.themeColor = 'rgba(51, 153, 255, 0.5)';
        }
        static get observedAttributes() {
            return super.observedAttributes.concat([
                'action',
                'plain',
            ]);
        }
    }
    CropperHandle.$name = CROPPER_HANDLE;
    CropperHandle.$version = '2.0.0';

    var style$3 = `:host{display:block;left:0;position:relative;right:0}:host([outlined]){outline:1px solid var(--theme-color)}:host([multiple]){outline:1px dashed hsla(0,0%,100%,.5)}:host([multiple]):after{bottom:0;content:"";cursor:pointer;display:block;left:0;position:absolute;right:0;top:0}:host([multiple][active]){outline-color:var(--theme-color);z-index:1}:host([multiple])>*{visibility:hidden}:host([multiple][active])>*{visibility:visible}:host([multiple][active]):after{display:none}`;

    const canvasCache$1 = new WeakMap();
    class CropperSelection extends CropperElement {
        constructor() {
            super(...arguments);
            this.$onCanvasAction = null;
            this.$onCanvasActionStart = null;
            this.$onCanvasActionEnd = null;
            this.$onDocumentKeyDown = null;
            this.$action = '';
            this.$actionStartTarget = null;
            this.$changing = false;
            this.$style = style$3;
            this.$initialSelection = {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            };
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.aspectRatio = NaN;
            this.initialAspectRatio = NaN;
            this.initialCoverage = NaN;
            this.active = false;
            // Deprecated as of v2.0.0-rc.0, use `dynamic` instead.
            this.linked = false;
            this.dynamic = false;
            this.movable = false;
            this.resizable = false;
            this.zoomable = false;
            this.multiple = false;
            this.keyboard = false;
            this.outlined = false;
            this.precise = false;
        }
        set $canvas(element) {
            canvasCache$1.set(this, element);
        }
        get $canvas() {
            return canvasCache$1.get(this);
        }
        static get observedAttributes() {
            return super.observedAttributes.concat([
                'active',
                'aspect-ratio',
                'dynamic',
                'height',
                'initial-aspect-ratio',
                'initial-coverage',
                'keyboard',
                'linked',
                'movable',
                'multiple',
                'outlined',
                'precise',
                'resizable',
                'width',
                'x',
                'y',
                'zoomable',
            ]);
        }
        $propertyChangedCallback(name, oldValue, newValue) {
            if (Object.is(newValue, oldValue)) {
                return;
            }
            super.$propertyChangedCallback(name, oldValue, newValue);
            switch (name) {
                case 'x':
                case 'y':
                case 'width':
                case 'height':
                    if (!this.$changing) {
                        this.$nextTick(() => {
                            this.$change(this.x, this.y, this.width, this.height, this.aspectRatio, true);
                        });
                    }
                    break;
                case 'aspectRatio':
                case 'initialAspectRatio':
                    this.$nextTick(() => {
                        this.$initSelection();
                    });
                    break;
                case 'initialCoverage':
                    this.$nextTick(() => {
                        if (isPositiveNumber(newValue) && newValue <= 1) {
                            this.$initSelection(true, true);
                        }
                    });
                    break;
                case 'keyboard':
                    this.$nextTick(() => {
                        if (this.$canvas) {
                            if (newValue) {
                                if (!this.$onDocumentKeyDown) {
                                    this.$onDocumentKeyDown = this.$handleKeyDown.bind(this);
                                    on(this.ownerDocument, EVENT_KEYDOWN, this.$onDocumentKeyDown);
                                }
                            }
                            else if (this.$onDocumentKeyDown) {
                                off(this.ownerDocument, EVENT_KEYDOWN, this.$onDocumentKeyDown);
                                this.$onDocumentKeyDown = null;
                            }
                        }
                    });
                    break;
                case 'multiple':
                    this.$nextTick(() => {
                        if (this.$canvas) {
                            const selections = this.$getSelections();
                            if (newValue) {
                                selections.forEach((selection) => {
                                    selection.active = false;
                                });
                                this.active = true;
                                this.$emit(EVENT_CHANGE, {
                                    x: this.x,
                                    y: this.y,
                                    width: this.width,
                                    height: this.height,
                                });
                            }
                            else {
                                this.active = false;
                                selections.slice(1).forEach((selection) => {
                                    this.$removeSelection(selection);
                                });
                            }
                        }
                    });
                    break;
                case 'precise':
                    this.$nextTick(() => {
                        this.$change(this.x, this.y);
                    });
                    break;
                // Backwards compatible with 2.0.0-rc
                case 'linked':
                    if (newValue) {
                        this.dynamic = true;
                    }
                    break;
            }
        }
        connectedCallback() {
            super.connectedCallback();
            const $canvas = this.closest(this.$getTagNameOf(CROPPER_CANVAS));
            if ($canvas) {
                this.$canvas = $canvas;
                this.$setStyles({
                    position: 'absolute',
                    transform: `translate(${this.x}px, ${this.y}px)`,
                });
                if (!this.hidden) {
                    this.$render();
                }
                this.$initSelection(true);
                this.$onCanvasActionStart = this.$handleActionStart.bind(this);
                this.$onCanvasActionEnd = this.$handleActionEnd.bind(this);
                this.$onCanvasAction = this.$handleAction.bind(this);
                on($canvas, EVENT_ACTION_START, this.$onCanvasActionStart);
                on($canvas, EVENT_ACTION_END, this.$onCanvasActionEnd);
                on($canvas, EVENT_ACTION, this.$onCanvasAction);
            }
            else {
                this.$render();
            }
        }
        disconnectedCallback() {
            const { $canvas } = this;
            if ($canvas) {
                if (this.$onCanvasActionStart) {
                    off($canvas, EVENT_ACTION_START, this.$onCanvasActionStart);
                    this.$onCanvasActionStart = null;
                }
                if (this.$onCanvasActionEnd) {
                    off($canvas, EVENT_ACTION_END, this.$onCanvasActionEnd);
                    this.$onCanvasActionEnd = null;
                }
                if (this.$onCanvasAction) {
                    off($canvas, EVENT_ACTION, this.$onCanvasAction);
                    this.$onCanvasAction = null;
                }
            }
            super.disconnectedCallback();
        }
        $getSelections() {
            let selections = [];
            if (this.parentElement) {
                selections = Array.from(this.parentElement.querySelectorAll(this.$getTagNameOf(CROPPER_SELECTION)));
            }
            return selections;
        }
        $initSelection(center = false, resize = false) {
            const { initialCoverage, parentElement } = this;
            if (isPositiveNumber(initialCoverage) && parentElement) {
                const aspectRatio = this.aspectRatio || this.initialAspectRatio;
                let width = (resize ? 0 : this.width) || parentElement.offsetWidth * initialCoverage;
                let height = (resize ? 0 : this.height) || parentElement.offsetHeight * initialCoverage;
                if (isPositiveNumber(aspectRatio)) {
                    ({ width, height } = getAdjustedSizes({ aspectRatio, width, height }));
                }
                this.$change(this.x, this.y, width, height);
                if (center) {
                    this.$center();
                }
                // Overrides the initial position and size
                this.$initialSelection = {
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    height: this.height,
                };
            }
        }
        $createSelection() {
            const newSelection = this.cloneNode(true);
            if (this.hasAttribute('id')) {
                newSelection.removeAttribute('id');
            }
            newSelection.initialCoverage = NaN;
            this.active = false;
            if (this.parentElement) {
                this.parentElement.insertBefore(newSelection, this.nextSibling);
            }
            return newSelection;
        }
        $removeSelection(selection = this) {
            if (this.parentElement) {
                const selections = this.$getSelections();
                if (selections.length > 1) {
                    const index = selections.indexOf(selection);
                    const activeSelection = selections[index + 1] || selections[index - 1];
                    if (activeSelection) {
                        selection.active = false;
                        this.parentElement.removeChild(selection);
                        activeSelection.active = true;
                        activeSelection.$emit(EVENT_CHANGE, {
                            x: activeSelection.x,
                            y: activeSelection.y,
                            width: activeSelection.width,
                            height: activeSelection.height,
                        });
                    }
                }
                else {
                    this.$clear();
                }
            }
        }
        $handleActionStart(event) {
            var _a, _b;
            const relatedTarget = (_b = (_a = event.detail) === null || _a === void 0 ? void 0 : _a.relatedEvent) === null || _b === void 0 ? void 0 : _b.target;
            this.$action = '';
            this.$actionStartTarget = relatedTarget;
            if (!this.hidden
                && this.multiple
                && !this.active
                && relatedTarget === this
                && this.parentElement) {
                this.$getSelections().forEach((selection) => {
                    selection.active = false;
                });
                this.active = true;
                this.$emit(EVENT_CHANGE, {
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    height: this.height,
                });
            }
        }
        $handleAction(event) {
            const { currentTarget, detail } = event;
            if (!currentTarget || !detail) {
                return;
            }
            const { relatedEvent } = detail;
            let { action } = detail;
            // Switching to another selection
            if (!action && this.multiple) {
                // Get the `action` property from the focusing in selection
                action = this.$action || (relatedEvent === null || relatedEvent === void 0 ? void 0 : relatedEvent.target.action);
                this.$action = action;
            }
            if (!action
                || (this.hidden && action !== ACTION_SELECT)
                || (this.multiple && !this.active && action !== ACTION_SCALE)) {
                return;
            }
            const moveX = detail.endX - detail.startX;
            const moveY = detail.endY - detail.startY;
            const { width, height } = this;
            let { aspectRatio } = this;
            // Locking aspect ratio by holding shift key
            if (!isPositiveNumber(aspectRatio) && relatedEvent.shiftKey) {
                aspectRatio = isPositiveNumber(width) && isPositiveNumber(height) ? width / height : 1;
            }
            switch (action) {
                case ACTION_SELECT:
                    if (moveX !== 0 && moveY !== 0) {
                        const { $canvas } = this;
                        const offset = getOffset(currentTarget);
                        (this.multiple && !this.hidden ? this.$createSelection() : this).$change(detail.startX - offset.left, detail.startY - offset.top, Math.abs(moveX), Math.abs(moveY), aspectRatio);
                        if (moveX < 0) {
                            if (moveY < 0) {
                                // ↖️
                                action = ACTION_RESIZE_NORTHWEST;
                            }
                            else if (moveY > 0) {
                                // ↙️
                                action = ACTION_RESIZE_SOUTHWEST;
                            }
                        }
                        else if (moveX > 0) {
                            if (moveY < 0) {
                                // ↗️
                                action = ACTION_RESIZE_NORTHEAST;
                            }
                            else if (moveY > 0) {
                                // ↘️
                                action = ACTION_RESIZE_SOUTHEAST;
                            }
                        }
                        if ($canvas) {
                            $canvas.$action = action;
                        }
                    }
                    break;
                case ACTION_MOVE:
                    if (this.movable && (this.dynamic
                        || (this.$actionStartTarget && this.contains(this.$actionStartTarget)))) {
                        this.$move(moveX, moveY);
                    }
                    break;
                case ACTION_SCALE:
                    if (relatedEvent && this.zoomable && (this.dynamic
                        || this.contains(relatedEvent.target))) {
                        const offset = getOffset(currentTarget);
                        this.$zoom(detail.scale, relatedEvent.pageX - offset.left, relatedEvent.pageY - offset.top);
                    }
                    break;
                default:
                    this.$resize(action, moveX, moveY, aspectRatio);
            }
        }
        $handleActionEnd() {
            this.$action = '';
            this.$actionStartTarget = null;
        }
        $handleKeyDown(event) {
            if (this.hidden
                || !this.keyboard
                || (this.multiple && !this.active)
                || event.defaultPrevented) {
                return;
            }
            const { activeElement } = document;
            // Disable keyboard control when input something
            if (activeElement && (['INPUT', 'TEXTAREA'].includes(activeElement.tagName)
                || ['true', 'plaintext-only'].includes(activeElement.contentEditable))) {
                return;
            }
            switch (event.key) {
                case 'Backspace':
                    if (event.metaKey) {
                        event.preventDefault();
                        this.$removeSelection();
                    }
                    break;
                case 'Delete':
                    event.preventDefault();
                    this.$removeSelection();
                    break;
                // Move to the left
                case 'ArrowLeft':
                    event.preventDefault();
                    this.$move(-1, 0);
                    break;
                // Move to the right
                case 'ArrowRight':
                    event.preventDefault();
                    this.$move(1, 0);
                    break;
                // Move to the top
                case 'ArrowUp':
                    event.preventDefault();
                    this.$move(0, -1);
                    break;
                // Move to the bottom
                case 'ArrowDown':
                    event.preventDefault();
                    this.$move(0, 1);
                    break;
                case '+':
                    event.preventDefault();
                    this.$zoom(0.1);
                    break;
                case '-':
                    event.preventDefault();
                    this.$zoom(-0.1);
                    break;
            }
        }
        /**
         * Aligns the selection to the center of its parent element.
         * @returns {CropperSelection} Returns `this` for chaining.
         */
        $center() {
            const { parentElement } = this;
            if (!parentElement) {
                return this;
            }
            const x = (parentElement.offsetWidth - this.width) / 2;
            const y = (parentElement.offsetHeight - this.height) / 2;
            return this.$change(x, y);
        }
        /**
         * Moves the selection.
         * @param {number} x The moving distance in the horizontal direction.
         * @param {number} [y] The moving distance in the vertical direction.
         * @returns {CropperSelection} Returns `this` for chaining.
         */
        $move(x, y = x) {
            return this.$moveTo(this.x + x, this.y + y);
        }
        /**
         * Moves the selection to a specific position.
         * @param {number} x The new position in the horizontal direction.
         * @param {number} [y] The new position in the vertical direction.
         * @returns {CropperSelection} Returns `this` for chaining.
         */
        $moveTo(x, y = x) {
            if (!this.movable) {
                return this;
            }
            return this.$change(x, y);
        }
        /**
         * Adjusts the size the selection on a specific side or corner.
         * @param {string} action Indicates the side or corner to resize.
         * @param {number} [offsetX] The horizontal offset of the specific side or corner.
         * @param {number} [offsetY] The vertical offset of the specific side or corner.
         * @param {number} [aspectRatio] The aspect ratio for computing the new size if it is necessary.
         * @returns {CropperSelection} Returns `this` for chaining.
         */
        $resize(action, offsetX = 0, offsetY = 0, aspectRatio = this.aspectRatio) {
            if (!this.resizable) {
                return this;
            }
            const hasValidAspectRatio = isPositiveNumber(aspectRatio);
            const { $canvas } = this;
            let { x, y, width, height, } = this;
            switch (action) {
                case ACTION_RESIZE_NORTH:
                    y += offsetY;
                    height -= offsetY;
                    if (height < 0) {
                        action = ACTION_RESIZE_SOUTH;
                        height = -height;
                        y -= height;
                    }
                    if (hasValidAspectRatio) {
                        offsetX = offsetY * aspectRatio;
                        x += offsetX / 2;
                        width -= offsetX;
                        if (width < 0) {
                            width = -width;
                            x -= width;
                        }
                    }
                    break;
                case ACTION_RESIZE_EAST:
                    width += offsetX;
                    if (width < 0) {
                        action = ACTION_RESIZE_WEST;
                        width = -width;
                        x -= width;
                    }
                    if (hasValidAspectRatio) {
                        offsetY = offsetX / aspectRatio;
                        y -= offsetY / 2;
                        height += offsetY;
                        if (height < 0) {
                            height = -height;
                            y -= height;
                        }
                    }
                    break;
                case ACTION_RESIZE_SOUTH:
                    height += offsetY;
                    if (height < 0) {
                        action = ACTION_RESIZE_NORTH;
                        height = -height;
                        y -= height;
                    }
                    if (hasValidAspectRatio) {
                        offsetX = offsetY * aspectRatio;
                        x -= offsetX / 2;
                        width += offsetX;
                        if (width < 0) {
                            width = -width;
                            x -= width;
                        }
                    }
                    break;
                case ACTION_RESIZE_WEST:
                    x += offsetX;
                    width -= offsetX;
                    if (width < 0) {
                        action = ACTION_RESIZE_EAST;
                        width = -width;
                        x -= width;
                    }
                    if (hasValidAspectRatio) {
                        offsetY = offsetX / aspectRatio;
                        y += offsetY / 2;
                        height -= offsetY;
                        if (height < 0) {
                            height = -height;
                            y -= height;
                        }
                    }
                    break;
                case ACTION_RESIZE_NORTHEAST:
                    if (hasValidAspectRatio) {
                        offsetY = -offsetX / aspectRatio;
                    }
                    y += offsetY;
                    height -= offsetY;
                    width += offsetX;
                    if (width < 0 && height < 0) {
                        action = ACTION_RESIZE_SOUTHWEST;
                        width = -width;
                        height = -height;
                        x -= width;
                        y -= height;
                    }
                    else if (width < 0) {
                        action = ACTION_RESIZE_NORTHWEST;
                        width = -width;
                        x -= width;
                    }
                    else if (height < 0) {
                        action = ACTION_RESIZE_SOUTHEAST;
                        height = -height;
                        y -= height;
                    }
                    break;
                case ACTION_RESIZE_NORTHWEST:
                    if (hasValidAspectRatio) {
                        offsetY = offsetX / aspectRatio;
                    }
                    x += offsetX;
                    y += offsetY;
                    width -= offsetX;
                    height -= offsetY;
                    if (width < 0 && height < 0) {
                        action = ACTION_RESIZE_SOUTHEAST;
                        width = -width;
                        height = -height;
                        x -= width;
                        y -= height;
                    }
                    else if (width < 0) {
                        action = ACTION_RESIZE_NORTHEAST;
                        width = -width;
                        x -= width;
                    }
                    else if (height < 0) {
                        action = ACTION_RESIZE_SOUTHWEST;
                        height = -height;
                        y -= height;
                    }
                    break;
                case ACTION_RESIZE_SOUTHEAST:
                    if (hasValidAspectRatio) {
                        offsetY = offsetX / aspectRatio;
                    }
                    width += offsetX;
                    height += offsetY;
                    if (width < 0 && height < 0) {
                        action = ACTION_RESIZE_NORTHWEST;
                        width = -width;
                        height = -height;
                        x -= width;
                        y -= height;
                    }
                    else if (width < 0) {
                        action = ACTION_RESIZE_SOUTHWEST;
                        width = -width;
                        x -= width;
                    }
                    else if (height < 0) {
                        action = ACTION_RESIZE_NORTHEAST;
                        height = -height;
                        y -= height;
                    }
                    break;
                case ACTION_RESIZE_SOUTHWEST:
                    if (hasValidAspectRatio) {
                        offsetY = -offsetX / aspectRatio;
                    }
                    x += offsetX;
                    width -= offsetX;
                    height += offsetY;
                    if (width < 0 && height < 0) {
                        action = ACTION_RESIZE_NORTHEAST;
                        width = -width;
                        height = -height;
                        x -= width;
                        y -= height;
                    }
                    else if (width < 0) {
                        action = ACTION_RESIZE_SOUTHEAST;
                        width = -width;
                        x -= width;
                    }
                    else if (height < 0) {
                        action = ACTION_RESIZE_NORTHWEST;
                        height = -height;
                        y -= height;
                    }
                    break;
            }
            if ($canvas) {
                $canvas.$setAction(action);
            }
            return this.$change(x, y, width, height);
        }
        /**
         * Zooms the selection.
         * @param {number} scale The zoom factor. Positive numbers for zooming in, and negative numbers for zooming out.
         * @param {number} [x] The zoom origin in the horizontal, defaults to the center of the selection.
         * @param {number} [y] The zoom origin in the vertical, defaults to the center of the selection.
         * @returns {CropperSelection} Returns `this` for chaining.
         */
        $zoom(scale, x, y) {
            if (!this.zoomable || scale === 0) {
                return this;
            }
            if (scale < 0) {
                scale = 1 / (1 - scale);
            }
            else {
                scale += 1;
            }
            const { width, height } = this;
            const newWidth = width * scale;
            const newHeight = height * scale;
            let newX = this.x;
            let newY = this.y;
            if (isNumber(x) && isNumber(y)) {
                newX -= (newWidth - width) * ((x - this.x) / width);
                newY -= (newHeight - height) * ((y - this.y) / height);
            }
            else {
                // Zoom from the center of the selection
                newX -= (newWidth - width) / 2;
                newY -= (newHeight - height) / 2;
            }
            return this.$change(newX, newY, newWidth, newHeight);
        }
        /**
         * Changes the position and/or size of the selection.
         * @param {number} x The new position in the horizontal direction.
         * @param {number} y The new position in the vertical direction.
         * @param {number} [width] The new width.
         * @param {number} [height] The new height.
         * @param {number} [aspectRatio] The new aspect ratio for this change only.
         * @param {number} [_force] Force change.
         * @returns {CropperSelection} Returns `this` for chaining.
         */
        $change(x, y, width = this.width, height = this.height, aspectRatio = this.aspectRatio, _force = false) {
            if (this.$changing
                || !isNumber(x)
                || !isNumber(y)
                || !isNumber(width)
                || !isNumber(height)
                || width < 0
                || height < 0) {
                return this;
            }
            if (isPositiveNumber(aspectRatio)) {
                ({ width, height } = getAdjustedSizes({ aspectRatio, width, height }, 'cover'));
            }
            if (!this.precise) {
                x = Math.round(x);
                y = Math.round(y);
                width = Math.round(width);
                height = Math.round(height);
            }
            if (x === this.x
                && y === this.y
                && width === this.width
                && height === this.height
                && Object.is(aspectRatio, this.aspectRatio)
                && !_force) {
                return this;
            }
            if (this.hidden) {
                this.hidden = false;
            }
            if (this.$emit(EVENT_CHANGE, {
                x,
                y,
                width,
                height,
            }) === false) {
                return this;
            }
            this.$changing = true;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.$changing = false;
            return this.$render();
        }
        /**
         * Resets the selection to its initial position and size.
         * @returns {CropperSelection} Returns `this` for chaining.
         */
        $reset() {
            const { x, y, width, height, } = this.$initialSelection;
            return this.$change(x, y, width, height);
        }
        /**
         * Clears the selection.
         * @returns {CropperSelection} Returns `this` for chaining.
         */
        $clear() {
            this.$change(0, 0, 0, 0, NaN, true);
            this.hidden = true;
            return this;
        }
        /**
         * Refreshes the position or size of the selection.
         * @returns {CropperSelection} Returns `this` for chaining.
         */
        $render() {
            return this.$setStyles({
                transform: `translate(${this.x}px, ${this.y}px)`,
                width: this.width,
                height: this.height,
            });
        }
        /**
         * Generates a real canvas element, with the image (selected area only) draw into if there is one.
         * @param {object} [options] The available options.
         * @param {number} [options.width] The width of the canvas.
         * @param {number} [options.height] The height of the canvas.
         * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
         * @returns {Promise} Returns a promise that resolves to the generated canvas element.
         */
        $toCanvas(options) {
            return new Promise((resolve, reject) => {
                if (!this.isConnected) {
                    reject(new Error('The current element is not connected to the DOM.'));
                    return;
                }
                const canvas = document.createElement('canvas');
                let { width, height } = this;
                let scale = 1;
                if (isPlainObject(options)
                    && (isPositiveNumber(options.width) || isPositiveNumber(options.height))) {
                    ({ width, height } = getAdjustedSizes({
                        aspectRatio: width / height,
                        width: options.width,
                        height: options.height,
                    }));
                    scale = width / this.width;
                }
                canvas.width = width;
                canvas.height = height;
                if (!this.$canvas) {
                    resolve(canvas);
                    return;
                }
                const cropperImage = this.$canvas.querySelector(this.$getTagNameOf(CROPPER_IMAGE));
                if (!cropperImage) {
                    resolve(canvas);
                    return;
                }
                cropperImage.$ready().then((image) => {
                    const context = canvas.getContext('2d');
                    if (context) {
                        const [a, b, c, d, e, f] = cropperImage.$getTransform();
                        const offsetX = -this.x;
                        const offsetY = -this.y;
                        const translateX = ((offsetX * d) - (c * offsetY)) / ((a * d) - (c * b));
                        const translateY = ((offsetY * a) - (b * offsetX)) / ((a * d) - (c * b));
                        let newE = a * translateX + c * translateY + e;
                        let newF = b * translateX + d * translateY + f;
                        let destWidth = image.naturalWidth;
                        let destHeight = image.naturalHeight;
                        if (scale !== 1) {
                            newE *= scale;
                            newF *= scale;
                            destWidth *= scale;
                            destHeight *= scale;
                        }
                        const centerX = destWidth / 2;
                        const centerY = destHeight / 2;
                        context.fillStyle = 'transparent';
                        context.fillRect(0, 0, width, height);
                        if (isPlainObject(options) && isFunction(options.beforeDraw)) {
                            options.beforeDraw.call(this, context, canvas);
                        }
                        context.save();
                        // Move the transform origin to the center of the image.
                        // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
                        context.translate(centerX, centerY);
                        context.transform(a, b, c, d, newE, newF);
                        // Move the transform origin to the top-left of the image.
                        context.translate(-centerX, -centerY);
                        context.drawImage(image, 0, 0, destWidth, destHeight);
                        context.restore();
                    }
                    resolve(canvas);
                }).catch(reject);
            });
        }
    }
    CropperSelection.$name = CROPPER_SELECTION;
    CropperSelection.$version = '2.0.0';

    var style$2 = `:host{display:flex;flex-direction:column;position:relative;touch-action:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}:host([bordered]){border:1px dashed var(--theme-color)}:host([covered]){bottom:0;left:0;position:absolute;right:0;top:0}:host>span{display:flex;flex:1}:host>span+span{border-top:1px dashed var(--theme-color)}:host>span>span{flex:1}:host>span>span+span{border-left:1px dashed var(--theme-color)}`;

    class CropperGrid extends CropperElement {
        constructor() {
            super(...arguments);
            this.$style = style$2;
            this.bordered = false;
            this.columns = 3;
            this.covered = false;
            this.rows = 3;
            this.slottable = false;
            this.themeColor = 'rgba(238, 238, 238, 0.5)';
        }
        static get observedAttributes() {
            return super.observedAttributes.concat([
                'bordered',
                'columns',
                'covered',
                'rows',
            ]);
        }
        $propertyChangedCallback(name, oldValue, newValue) {
            if (Object.is(newValue, oldValue)) {
                return;
            }
            super.$propertyChangedCallback(name, oldValue, newValue);
            if (name === 'rows' || name === 'columns') {
                this.$nextTick(() => {
                    this.$render();
                });
            }
        }
        connectedCallback() {
            super.connectedCallback();
            this.$render();
        }
        $render() {
            const shadow = this.$getShadowRoot();
            const fragment = document.createDocumentFragment();
            for (let i = 0; i < this.rows; i += 1) {
                const row = document.createElement('span');
                row.setAttribute('role', 'row');
                for (let j = 0; j < this.columns; j += 1) {
                    const column = document.createElement('span');
                    column.setAttribute('role', 'gridcell');
                    row.appendChild(column);
                }
                fragment.appendChild(row);
            }
            if (shadow) {
                shadow.innerHTML = '';
                shadow.appendChild(fragment);
            }
        }
    }
    CropperGrid.$name = CROPPER_GIRD;
    CropperGrid.$version = '2.0.0';

    var style$1 = `:host{display:inline-block;height:1em;position:relative;touch-action:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;vertical-align:middle;width:1em}:host:after,:host:before{background-color:var(--theme-color);content:"";display:block;position:absolute}:host:before{height:1px;left:0;top:50%;transform:translateY(-50%);width:100%}:host:after{height:100%;left:50%;top:0;transform:translateX(-50%);width:1px}:host([centered]){left:50%;position:absolute;top:50%;transform:translate(-50%,-50%)}`;

    class CropperCrosshair extends CropperElement {
        constructor() {
            super(...arguments);
            this.$style = style$1;
            this.centered = false;
            this.slottable = false;
            this.themeColor = 'rgba(238, 238, 238, 0.5)';
        }
        static get observedAttributes() {
            return super.observedAttributes.concat([
                'centered',
            ]);
        }
    }
    CropperCrosshair.$name = CROPPER_CROSSHAIR;
    CropperCrosshair.$version = '2.0.0';

    var style = `:host{display:block;height:100%;overflow:hidden;position:relative;width:100%}`;

    const canvasCache = new WeakMap();
    const imageCache = new WeakMap();
    const selectionCache = new WeakMap();
    const sourceImageCache = new WeakMap();
    const RESIZE_BOTH = 'both';
    const RESIZE_HORIZONTAL = 'horizontal';
    const RESIZE_VERTICAL = 'vertical';
    const RESIZE_NONE = 'none';
    class CropperViewer extends CropperElement {
        constructor() {
            super(...arguments);
            this.$onSelectionChange = null;
            this.$onSourceImageLoad = null;
            this.$onSourceImageTransform = null;
            this.$scale = 1;
            this.$style = style;
            this.resize = RESIZE_VERTICAL;
            this.selection = '';
            this.slottable = false;
        }
        set $image(element) {
            imageCache.set(this, element);
        }
        get $image() {
            return imageCache.get(this);
        }
        set $sourceImage(element) {
            sourceImageCache.set(this, element);
        }
        get $sourceImage() {
            return sourceImageCache.get(this);
        }
        set $canvas(element) {
            canvasCache.set(this, element);
        }
        get $canvas() {
            return canvasCache.get(this);
        }
        set $selection(element) {
            selectionCache.set(this, element);
        }
        get $selection() {
            return selectionCache.get(this);
        }
        static get observedAttributes() {
            return super.observedAttributes.concat([
                'resize',
                'selection',
            ]);
        }
        connectedCallback() {
            super.connectedCallback();
            let $selection = null;
            if (this.selection) {
                $selection = this.ownerDocument.querySelector(this.selection);
            }
            else {
                $selection = this.closest(this.$getTagNameOf(CROPPER_SELECTION));
            }
            if (isElement($selection)) {
                this.$selection = $selection;
                this.$onSelectionChange = this.$handleSelectionChange.bind(this);
                on($selection, EVENT_CHANGE, this.$onSelectionChange);
                const $canvas = $selection.closest(this.$getTagNameOf(CROPPER_CANVAS));
                if ($canvas) {
                    this.$canvas = $canvas;
                    const $sourceImage = $canvas.querySelector(this.$getTagNameOf(CROPPER_IMAGE));
                    if ($sourceImage) {
                        this.$sourceImage = $sourceImage;
                        this.$image = $sourceImage.cloneNode(true);
                        this.$getShadowRoot().appendChild(this.$image);
                        this.$onSourceImageLoad = this.$handleSourceImageLoad.bind(this);
                        this.$onSourceImageTransform = this.$handleSourceImageTransform.bind(this);
                        on($sourceImage.$image, EVENT_LOAD, this.$onSourceImageLoad);
                        on($sourceImage, EVENT_TRANSFORM, this.$onSourceImageTransform);
                    }
                }
                this.$render();
            }
        }
        disconnectedCallback() {
            const { $selection, $sourceImage } = this;
            if ($selection && this.$onSelectionChange) {
                off($selection, EVENT_CHANGE, this.$onSelectionChange);
                this.$onSelectionChange = null;
            }
            if ($sourceImage && this.$onSourceImageLoad) {
                off($sourceImage.$image, EVENT_LOAD, this.$onSourceImageLoad);
                this.$onSourceImageLoad = null;
            }
            if ($sourceImage && this.$onSourceImageTransform) {
                off($sourceImage, EVENT_TRANSFORM, this.$onSourceImageTransform);
                this.$onSourceImageTransform = null;
            }
            super.disconnectedCallback();
        }
        $handleSelectionChange(event) {
            this.$render(event.detail);
        }
        $handleSourceImageLoad() {
            const { $image, $sourceImage } = this;
            const oldSrc = $image.getAttribute('src');
            const newSrc = $sourceImage.getAttribute('src');
            if (newSrc && newSrc !== oldSrc) {
                $image.setAttribute('src', newSrc);
                $image.$ready(() => {
                    setTimeout(() => {
                        this.$render();
                    }, 50);
                });
            }
        }
        $handleSourceImageTransform(event) {
            this.$render(undefined, event.detail.matrix);
        }
        $render(selection, matrix) {
            const { $canvas, $selection } = this;
            if (!selection && !$selection.hidden) {
                selection = $selection;
            }
            if (!selection || (selection.x === 0
                && selection.y === 0
                && selection.width === 0
                && selection.height === 0)) {
                selection = {
                    x: 0,
                    y: 0,
                    width: $canvas.offsetWidth,
                    height: $canvas.offsetHeight,
                };
            }
            const { x, y, width, height, } = selection;
            const styles = {};
            const { clientWidth, clientHeight } = this;
            let newWidth = clientWidth;
            let newHeight = clientHeight;
            let scale = NaN;
            switch (this.resize) {
                case RESIZE_BOTH:
                    scale = 1;
                    newWidth = width;
                    newHeight = height;
                    styles.width = width;
                    styles.height = height;
                    break;
                case RESIZE_HORIZONTAL:
                    scale = height > 0 ? clientHeight / height : 0;
                    newWidth = width * scale;
                    styles.width = newWidth;
                    break;
                case RESIZE_VERTICAL:
                    scale = width > 0 ? clientWidth / width : 0;
                    newHeight = height * scale;
                    styles.height = newHeight;
                    break;
                case RESIZE_NONE:
                default:
                    if (clientWidth > 0) {
                        scale = width > 0 ? clientWidth / width : 0;
                    }
                    else if (clientHeight > 0) {
                        scale = height > 0 ? clientHeight / height : 0;
                    }
            }
            this.$scale = scale;
            this.$setStyles(styles);
            if (this.$sourceImage) {
                this.$transformImageByOffset(matrix !== null && matrix !== void 0 ? matrix : this.$sourceImage.$getTransform(), -x, -y);
            }
        }
        $transformImageByOffset(matrix, x, y) {
            const { $image, $scale, $sourceImage, } = this;
            if ($sourceImage && $image && $scale >= 0) {
                const [a, b, c, d, e, f] = matrix;
                const translateX = ((x * d) - (c * y)) / ((a * d) - (c * b));
                const translateY = ((y * a) - (b * x)) / ((a * d) - (c * b));
                const newE = a * translateX + c * translateY + e;
                const newF = b * translateX + d * translateY + f;
                $image.$ready((image) => {
                    this.$setStyles.call($image, {
                        width: image.naturalWidth * $scale,
                        height: image.naturalHeight * $scale,
                    });
                });
                $image.$setTransform(a, b, c, d, newE * $scale, newF * $scale);
            }
        }
    }
    CropperViewer.$name = CROPPER_VIEWER;
    CropperViewer.$version = '2.0.0';

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

    exports.ACTION_MOVE = ACTION_MOVE;
    exports.ACTION_NONE = ACTION_NONE;
    exports.ACTION_RESIZE_EAST = ACTION_RESIZE_EAST;
    exports.ACTION_RESIZE_NORTH = ACTION_RESIZE_NORTH;
    exports.ACTION_RESIZE_NORTHEAST = ACTION_RESIZE_NORTHEAST;
    exports.ACTION_RESIZE_NORTHWEST = ACTION_RESIZE_NORTHWEST;
    exports.ACTION_RESIZE_SOUTH = ACTION_RESIZE_SOUTH;
    exports.ACTION_RESIZE_SOUTHEAST = ACTION_RESIZE_SOUTHEAST;
    exports.ACTION_RESIZE_SOUTHWEST = ACTION_RESIZE_SOUTHWEST;
    exports.ACTION_RESIZE_WEST = ACTION_RESIZE_WEST;
    exports.ACTION_ROTATE = ACTION_ROTATE;
    exports.ACTION_SCALE = ACTION_SCALE;
    exports.ACTION_SELECT = ACTION_SELECT;
    exports.ACTION_TRANSFORM = ACTION_TRANSFORM;
    exports.ATTRIBUTE_ACTION = ATTRIBUTE_ACTION;
    exports.CROPPER_CANVAS = CROPPER_CANVAS;
    exports.CROPPER_CROSSHAIR = CROPPER_CROSSHAIR;
    exports.CROPPER_GIRD = CROPPER_GIRD;
    exports.CROPPER_HANDLE = CROPPER_HANDLE;
    exports.CROPPER_IMAGE = CROPPER_IMAGE;
    exports.CROPPER_SELECTION = CROPPER_SELECTION;
    exports.CROPPER_SHADE = CROPPER_SHADE;
    exports.CROPPER_VIEWER = CROPPER_VIEWER;
    exports.CropperCanvas = CropperCanvas;
    exports.CropperCrosshair = CropperCrosshair;
    exports.CropperElement = CropperElement;
    exports.CropperGrid = CropperGrid;
    exports.CropperHandle = CropperHandle;
    exports.CropperImage = CropperImage;
    exports.CropperSelection = CropperSelection;
    exports.CropperShade = CropperShade;
    exports.CropperViewer = CropperViewer;
    exports.DEFAULT_TEMPLATE = DEFAULT_TEMPLATE;
    exports.EVENT_ACTION = EVENT_ACTION;
    exports.EVENT_ACTION_END = EVENT_ACTION_END;
    exports.EVENT_ACTION_MOVE = EVENT_ACTION_MOVE;
    exports.EVENT_ACTION_START = EVENT_ACTION_START;
    exports.EVENT_CHANGE = EVENT_CHANGE;
    exports.EVENT_ERROR = EVENT_ERROR;
    exports.EVENT_KEYDOWN = EVENT_KEYDOWN;
    exports.EVENT_LOAD = EVENT_LOAD;
    exports.EVENT_POINTER_DOWN = EVENT_POINTER_DOWN;
    exports.EVENT_POINTER_MOVE = EVENT_POINTER_MOVE;
    exports.EVENT_POINTER_UP = EVENT_POINTER_UP;
    exports.EVENT_RESIZE = EVENT_RESIZE;
    exports.EVENT_TOUCH_END = EVENT_TOUCH_END;
    exports.EVENT_TOUCH_MOVE = EVENT_TOUCH_MOVE;
    exports.EVENT_TOUCH_START = EVENT_TOUCH_START;
    exports.EVENT_TRANSFORM = EVENT_TRANSFORM;
    exports.EVENT_WHEEL = EVENT_WHEEL;
    exports.HAS_POINTER_EVENT = HAS_POINTER_EVENT;
    exports.IS_BROWSER = IS_BROWSER;
    exports.IS_TOUCH_DEVICE = IS_TOUCH_DEVICE;
    exports.NAMESPACE = NAMESPACE;
    exports.WINDOW = WINDOW;
    exports["default"] = Cropper;
    exports.emit = emit;
    exports.getAdjustedSizes = getAdjustedSizes;
    exports.getOffset = getOffset;
    exports.isElement = isElement;
    exports.isFunction = isFunction;
    exports.isNaN = isNaN;
    exports.isNumber = isNumber;
    exports.isObject = isObject;
    exports.isPlainObject = isPlainObject;
    exports.isPositiveNumber = isPositiveNumber;
    exports.isString = isString;
    exports.isUndefined = isUndefined;
    exports.multiplyMatrices = multiplyMatrices;
    exports.nextTick = nextTick;
    exports.off = off;
    exports.on = on;
    exports.once = once;
    exports.toAngleInRadian = toAngleInRadian;
    exports.toCamelCase = toCamelCase;
    exports.toKebabCase = toKebabCase;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
