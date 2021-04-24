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
import { rectangle, line, svgNode, ellipse } from './wired-lib';
import { css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
let WiredSearchInput = class WiredSearchInput extends WiredBase {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.placeholder = '';
        this.autocomplete = '';
        this.autocorrect = '';
        this.autofocus = false;
    }
    static get styles() {
        return [
            BaseCSS,
            css `
        :host {
          display: inline-block;
          position: relative;
          padding: 10px 40px 10px 5px;
          font-family: sans-serif;
          width: 180px;
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
        
        input[type=search]::-ms-clear {  display: none; width : 0; height: 0; }
        input[type=search]::-ms-reveal {  display: none; width : 0; height: 0; }
        input[type="search"]::-webkit-search-decoration,
        input[type="search"]::-webkit-search-cancel-button,
        input[type="search"]::-webkit-search-results-button,
        input[type="search"]::-webkit-search-results-decoration {
          display: none;
        }

        .thicker path {
          stroke-width: 1.5;
        }

        button {
          position: absolute;
          top: 0;
          right: 2px;
          width: 32px;
          height: 100%;
          box-sizing: border-box;
          background: none;
          border: none;
          cursor: pointer;
          outline: none;
          opacity: 0;
        }
      `
        ];
    }
    render() {
        return html `
    <input type="search" placeholder="${this.placeholder}" ?disabled="${this.disabled}"
      autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" 
      autocapitalize="${this.autocapitalize}" autocorrect="${this.autocorrect}" 
      @change="${this.refire}" @input="${this.refire}">
    <div id="overlay">
      <svg></svg>
    </div>
    <button @click="${() => this.value = ''}"></button>
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
            }
            this.refreshIconState();
        }
        else {
            this.pendingValue = v;
        }
    }
    wiredRender(force = false) {
        super.wiredRender(force);
        this.refreshIconState();
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
        this.searchIcon = svgNode('g');
        this.searchIcon.classList.add('thicker');
        svg.appendChild(this.searchIcon);
        ellipse(this.searchIcon, size[0] - 30, (size[1] - 30) / 2 + 10, 20, 20, this.seed);
        line(this.searchIcon, size[0] - 10, (size[1] - 30) / 2 + 30, size[0] - 25, (size[1] - 30) / 2 + 15, this.seed);
        this.closeIcon = svgNode('g');
        this.closeIcon.classList.add('thicker');
        svg.appendChild(this.closeIcon);
        line(this.closeIcon, size[0] - 33, (size[1] - 30) / 2 + 2, size[0] - 7, (size[1] - 30) / 2 + 28, this.seed);
        line(this.closeIcon, size[0] - 7, (size[1] - 30) / 2 + 2, size[0] - 33, (size[1] - 30) / 2 + 28, this.seed);
    }
    refreshIconState() {
        if (this.searchIcon && this.closeIcon) {
            this.searchIcon.style.display = this.value.trim() ? 'none' : '';
            this.closeIcon.style.display = this.value.trim() ? '' : 'none';
        }
    }
    refire(event) {
        this.refreshIconState();
        event.stopPropagation();
        this.fire(event.type, { sourceEvent: event });
    }
};
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], WiredSearchInput.prototype, "disabled", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredSearchInput.prototype, "placeholder", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredSearchInput.prototype, "autocomplete", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], WiredSearchInput.prototype, "autocorrect", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], WiredSearchInput.prototype, "autofocus", void 0);
__decorate([
    query('input'),
    __metadata("design:type", HTMLInputElement)
], WiredSearchInput.prototype, "textInput", void 0);
WiredSearchInput = __decorate([
    customElement('wired-search-input')
], WiredSearchInput);
export { WiredSearchInput };
