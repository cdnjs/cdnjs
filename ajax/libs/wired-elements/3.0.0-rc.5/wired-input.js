var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { WiredBase, BaseCSS } from './wired-base';
import { rectangle } from './wired-lib';
import { css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
let WiredInput = class WiredInput extends WiredBase {
    constructor() {
        super();
        this.disabled = false;
        this.placeholder = '';
        this.type = 'text';
        this.autocomplete = '';
        this.autocapitalize = '';
        this.autocorrect = '';
        this.required = false;
        this.autofocus = false;
        this.readonly = false;
        this.roAttached = false;
        if (window.ResizeObserver) {
            this.resizeObserver = new window.ResizeObserver(() => {
                if (this.svg) {
                    this.wiredRender(true);
                }
            });
        }
    }
    static get styles() {
        return [
            BaseCSS,
            css `
        :host {
          display: inline-block;
          position: relative;
          padding: 5px;
          font-family: sans-serif;
          width: 150px;
          outline: none;
        }
        :host([disabled]) {
          opacity: 0.6 !important;
          cursor: default;
          pointer-events: none;
        }
        :host([disabled]) svg {
          background: rgba(0, 0, 0, 0.07);
        }
        input {
          display: block;
          width: 100%;
          box-sizing: border-box;
          outline: none;
          border: none;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          color: inherit;
          padding: 6px;
        }
        input:focus + div path {
          stroke-width: 1.5;
        }
      `
        ];
    }
    render() {
        return html `
    <input name="${this.name}" type="${this.type}" placeholder="${this.placeholder}" ?disabled="${this.disabled}"
      ?required="${this.required}" autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" minlength="${this.minlength}"
      maxlength="${this.maxlength}" min="${this.min}" max="${this.max}" step="${this.step}" ?readonly="${this.readonly}"
      size="${this.size}" autocapitalize="${this.autocapitalize}" autocorrect="${this.autocorrect}" 
      @change="${this.refire}" @input="${this.refire}">
    <div id="overlay">
      <svg></svg>
    </div>
    `;
    }
    get input() {
        return this.textInput;
    }
    get value() {
        const input = this.input;
        return (input && input.value) || '';
    }
    set value(v) {
        if (this.shadowRoot) {
            const input = this.input;
            if (input) {
                input.value = v;
                return;
            }
        }
        this.pendingValue = v;
    }
    firstUpdated() {
        this.value = this.pendingValue || this.value || this.getAttribute('value') || '';
        delete this.pendingValue;
    }
    canvasSize() {
        const s = this.getBoundingClientRect();
        return [s.width, s.height];
    }
    draw(svg, size) {
        rectangle(svg, 2, 2, size[0] - 2, size[1] - 2, this.seed);
    }
    refire(event) {
        event.stopPropagation();
        this.fire(event.type, { sourceEvent: event });
    }
    focus() {
        if (this.textInput) {
            this.textInput.focus();
        }
        else {
            super.focus();
        }
    }
    updated() {
        super.updated();
        this.attachResizeListener();
    }
    disconnectedCallback() {
        this.detachResizeListener();
    }
    attachResizeListener() {
        if (!this.roAttached) {
            if (this.textInput && this.resizeObserver) {
                this.resizeObserver.observe(this.textInput);
            }
            this.roAttached = true;
        }
    }
    detachResizeListener() {
        if (this.textInput && this.resizeObserver) {
            this.resizeObserver.unobserve(this.textInput);
        }
        this.roAttached = false;
    }
};
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], WiredInput.prototype, "disabled", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredInput.prototype, "placeholder", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], WiredInput.prototype, "name", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], WiredInput.prototype, "min", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], WiredInput.prototype, "max", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], WiredInput.prototype, "step", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredInput.prototype, "type", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredInput.prototype, "autocomplete", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredInput.prototype, "autocapitalize", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredInput.prototype, "autocorrect", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], WiredInput.prototype, "required", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], WiredInput.prototype, "autofocus", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], WiredInput.prototype, "readonly", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Number)
], WiredInput.prototype, "minlength", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Number)
], WiredInput.prototype, "maxlength", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Number)
], WiredInput.prototype, "size", void 0);
__decorate([
    query('input'),
    __metadata("design:type", HTMLInputElement)
], WiredInput.prototype, "textInput", void 0);
WiredInput = __decorate([
    customElement('wired-input'),
    __metadata("design:paramtypes", [])
], WiredInput);
export { WiredInput };
