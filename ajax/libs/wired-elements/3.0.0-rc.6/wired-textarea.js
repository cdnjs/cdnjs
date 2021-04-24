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
let WiredTextarea = class WiredTextarea extends WiredBase {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.rows = 2;
        this.maxrows = 0;
        this.autocomplete = '';
        this.autofocus = false;
        this.inputmode = '';
        this.placeholder = '';
        this.required = false;
        this.readonly = false;
    }
    static get styles() {
        return [
            BaseCSS,
            css `
        :host {
          display: inline-block;
          position: relative;
          font-family: sans-serif;
          width: 400px;
          outline: none;
          padding: 4px;
        }
        :host([disabled]) {
          opacity: 0.6 !important;
          cursor: default;
          pointer-events: none;
        }
        :host([disabled]) svg {
          background: rgba(0, 0, 0, 0.07);
        }
        textarea {
          position: relative;
          outline: none;
          border: none;
          resize: none;
          background: inherit;
          color: inherit;
          width: 100%;
          font-size: inherit;
          font-family: inherit;
          line-height: inherit;
          text-align: inherit;
          padding: 10px;
          box-sizing: border-box;
        }
      `
        ];
    }
    render() {
        return html `
    <textarea id="textarea" autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" inputmode="${this.inputmode}"
      placeholder="${this.placeholder}" ?readonly="${this.readonly}" ?required="${this.required}" ?disabled="${this.disabled}"
      rows="${this.rows}" minlength="${this.minlength}" maxlength="${this.maxlength}"
      @change="${this.refire}" @input="${this.refire}"></textarea>
    <div id="overlay">
      <svg></svg>
    </div>
    `;
    }
    get textarea() {
        return this.textareaInput;
    }
    get value() {
        const input = this.textarea;
        return (input && input.value) || '';
    }
    set value(v) {
        if (this.shadowRoot) {
            const input = this.textarea;
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
        rectangle(svg, 4, 4, size[0] - 4, size[1] - 4, this.seed);
    }
    refire(event) {
        event.stopPropagation();
        this.fire(event.type, { sourceEvent: event });
    }
};
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], WiredTextarea.prototype, "disabled", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], WiredTextarea.prototype, "rows", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], WiredTextarea.prototype, "maxrows", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredTextarea.prototype, "autocomplete", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], WiredTextarea.prototype, "autofocus", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredTextarea.prototype, "inputmode", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredTextarea.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], WiredTextarea.prototype, "required", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], WiredTextarea.prototype, "readonly", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Number)
], WiredTextarea.prototype, "minlength", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Number)
], WiredTextarea.prototype, "maxlength", void 0);
__decorate([
    query('textarea'),
    __metadata("design:type", HTMLTextAreaElement)
], WiredTextarea.prototype, "textareaInput", void 0);
WiredTextarea = __decorate([
    customElement('wired-textarea')
], WiredTextarea);
export { WiredTextarea };
