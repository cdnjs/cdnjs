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
import { rectangle, line, svgNode } from './wired-lib';
import { css, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
let WiredCheckbox = class WiredCheckbox extends WiredBase {
    constructor() {
        super(...arguments);
        this.checked = false;
        this.disabled = false;
        this.focused = false;
    }
    static get styles() {
        return [
            BaseCSS,
            css `
      :host {
        display: inline-block;
        font-family: inherit;
      }
      :host([disabled]) {
        opacity: 0.6 !important;
        cursor: default;
        pointer-events: none;
      }
      :host([disabled]) svg {
        background: rgba(0, 0, 0, 0.07);
      }

      #container {
        display: flex;
        flex-direction: row;
        position: relative;
        user-select: none;
        min-height: 24px;
        cursor: pointer;
      }
      span {
        margin-left: 1.5ex;
        line-height: 24px;
      }
      input {
        opacity: 0;
      }
      path {
        stroke: var(--wired-checkbox-icon-color, currentColor);
        stroke-width: var(--wired-checkbox-default-swidth, 0.7);
      }
      g path {
        stroke-width: 2.5;
      }
      #container.focused {
        --wired-checkbox-default-swidth: 1.5;
      }
      `
        ];
    }
    focus() {
        if (this.input) {
            this.input.focus();
        }
        else {
            super.focus();
        }
    }
    wiredRender(force = false) {
        super.wiredRender(force);
        this.refreshCheckVisibility();
    }
    render() {
        return html `
    <label id="container" class="${this.focused ? 'focused' : ''}">
      <input type="checkbox" .checked="${this.checked}" ?disabled="${this.disabled}" 
        @change="${this.onChange}"
        @focus="${() => this.focused = true}"
        @blur="${() => this.focused = false}">
      <span><slot></slot></span>
      <div id="overlay"><svg></svg></div>
    </label>
    `;
    }
    onChange() {
        this.checked = this.input.checked;
        this.refreshCheckVisibility();
        this.fire('change', { checked: this.checked });
    }
    canvasSize() {
        return [24, 24];
    }
    draw(svg, size) {
        rectangle(svg, 0, 0, size[0], size[1], this.seed);
        this.svgCheck = svgNode('g');
        svg.appendChild(this.svgCheck);
        line(this.svgCheck, size[0] * 0.3, size[1] * 0.4, size[0] * 0.5, size[1] * 0.7, this.seed);
        line(this.svgCheck, size[0] * 0.5, size[1] * 0.7, size[0] + 5, -5, this.seed);
    }
    refreshCheckVisibility() {
        if (this.svgCheck) {
            this.svgCheck.style.display = this.checked ? '' : 'none';
        }
    }
};
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], WiredCheckbox.prototype, "checked", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], WiredCheckbox.prototype, "disabled", void 0);
__decorate([
    state(),
    __metadata("design:type", Object)
], WiredCheckbox.prototype, "focused", void 0);
__decorate([
    query('input'),
    __metadata("design:type", HTMLInputElement)
], WiredCheckbox.prototype, "input", void 0);
WiredCheckbox = __decorate([
    customElement('wired-checkbox')
], WiredCheckbox);
export { WiredCheckbox };
