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
import { rectangle, hachureEllipseFill, ellipse, svgNode } from './wired-lib';
import { css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
let WiredToggle = class WiredToggle extends WiredBase {
    constructor() {
        super(...arguments);
        this.checked = false;
        this.disabled = false;
    }
    static get styles() {
        return [
            BaseCSS,
            css `
      :host {
        display: inline-block;
        cursor: pointer;
        position: relative;
        outline: none;
      }
      :host([disabled]) {
        opacity: 0.4 !important;
        cursor: default;
        pointer-events: none;
      }
      :host([disabled]) svg {
        background: rgba(0, 0, 0, 0.07);
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        cursor: pointer;
        opacity: 0;
      }
      .knob {
        transition: transform 0.3s ease;
      }
      .knob path {
        stroke-width: 0.7;
      }
      .knob.checked {
        transform: translateX(48px);
      }
      path.knobfill {
        stroke-width: 3 !important;
        fill: transparent;
      }
      .knob.unchecked path.knobfill {
        stroke: var(--wired-toggle-off-color, gray);
      }
      .knob.checked path.knobfill {
        stroke: var(--wired-toggle-on-color, rgb(63, 81, 181));
      }
      `
        ];
    }
    render() {
        return html `
    <div style="position: relative;">
      <svg></svg>
      <input type="checkbox" .checked="${this.checked}" ?disabled="${this.disabled}"  @change="${this.onChange}">
    </div>
    `;
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
        this.refreshKnob();
    }
    onChange() {
        this.checked = this.input.checked;
        this.refreshKnob();
        this.fire('change', { checked: this.checked });
    }
    canvasSize() {
        return [80, 34];
    }
    draw(svg, size) {
        const rect = rectangle(svg, 16, 8, size[0] - 32, 18, this.seed);
        rect.classList.add('toggle-bar');
        this.knob = svgNode('g');
        this.knob.classList.add('knob');
        svg.appendChild(this.knob);
        const knobFill = hachureEllipseFill(16, 16, 32, 32, this.seed);
        knobFill.classList.add('knobfill');
        this.knob.appendChild(knobFill);
        ellipse(this.knob, 16, 16, 32, 32, this.seed);
    }
    refreshKnob() {
        if (this.knob) {
            const cl = this.knob.classList;
            if (this.checked) {
                cl.remove('unchecked');
                cl.add('checked');
            }
            else {
                cl.remove('checked');
                cl.add('unchecked');
            }
        }
    }
};
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], WiredToggle.prototype, "checked", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], WiredToggle.prototype, "disabled", void 0);
__decorate([
    query('input'),
    __metadata("design:type", HTMLInputElement)
], WiredToggle.prototype, "input", void 0);
WiredToggle = __decorate([
    customElement('wired-toggle')
], WiredToggle);
export { WiredToggle };
